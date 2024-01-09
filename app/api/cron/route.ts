import { promises as fs, createWriteStream } from 'fs'
import { type NEW } from '../../types'
import axios, { type AxiosResponse } from 'axios'
import Translate from 'translate'

const db: string = process.cwd() + '/db/news.json'

const textToUrl = (text: string): string => {
	return text
		.toLowerCase() // Convertir a minúsculas
		.replace(/\s+/g, '-') // Reemplazar espacios con guiones
		.replace(/[^a-z0-9-]/g, '')
}

const cleanTitle = (title: string): string => {
	const newTitle = title.split('-')[0].split('|')[0].split('•')[0].trim()
	return newTitle
}

const cleanContent = (content: string): string[] => {
	const newContent = [...content.matchAll(/<p.*?>(.*?)<\/p>/g)].map(value => {
		return !value[1].toLowerCase().includes('cookies') &&
			!value[1].toLowerCase().includes('copyright') &&
			!value[1].toLowerCase().includes('all rights reserved') &&
			!value[1].toLowerCase().includes('exclusive interviews') &&
			!value[1].toLowerCase().includes('trademark') &&
			!value[1].toLowerCase().includes('subscribe') &&
			value[1].length !== 0
			? value[1].replace(/(<([^>]+)>)/gi, '').trim()
			: ''
	})
	return newContent
}

const downloadImage = async (url: string, title: string): Promise<string> => {
	try {
		const name = `${textToUrl(title)}.jpg`
		const response: AxiosResponse = await axios({
			method: 'GET',
			url,
			responseType: 'stream'
		})
		const writer = createWriteStream(`public/images/${name}`)
		response.data.pipe(writer)
		await new Promise((resolve, reject) => {
			writer.on('finish', resolve)
			writer.on('error', reject)
		})
		return name
	} catch (error) {
		console.error('Error al descargar la imagen:', error)
		return ''
	}
}

const getImage = async (content: string, title: string): Promise<string> => {
	const url: string = /og:image.*?content="(.*?)"/.exec(content)![1]
	// DOWNLOAD
	const imageName = await downloadImage(url, title)
	return imageName
}

const getContent = async (url: string, title: string): Promise<[string[], string]> => {
	const res = await fetch(url)
	const googlePage = await res.text()
	const redirectUrl = [...googlePage.matchAll(/href="(.*?)"/g)]
	const res2 = await fetch(redirectUrl[redirectUrl.length - 1][1])
	const content = await res2.text()
	const image = await getImage(content, title)
	return [cleanContent(content), image]
}

const getNews = async (): Promise<RegExpMatchArray[]> => {
	const url: string = 'https://news.google.com/rss/search?q=marvel&hl=en-US&gl=US&ceid=US:en'
	const res = await fetch(url)
	const newsString = await res.text()
	const regex: RegExp = /<item>.*?<\/item>/g
	const newsIterable: IterableIterator<RegExpMatchArray> = newsString.matchAll(regex)

	return [...newsIterable]
}

const getAttrFromNewXml = async (xmlNew: string): Promise<NEW> => {
	const title: string = await Translate(cleanTitle(/<title>(.*?)<\/title>/.exec(xmlNew)![1]), 'es')
	const url: string = textToUrl(title)
	const [_content, image] = await getContent(/<link>(.*?)<\/link>/.exec(xmlNew)![1], title)
	let content: string[] = await Promise.all(
		_content.map(async c => {
			await new Promise(resolve => setTimeout(resolve, 2000))
			try {
				return await Translate(c, 'es')
			} catch (e) {
				return ''
			}
		})
	)
	content = content.filter(c => c.length > 0)
	const date = new Date()
	date.setDate(date.getDate() - 1)
	const returnNew: NEW = {
		title,
		url,
		content,
		image,
		date
	}
	return returnNew
}

const generateNews = async (): Promise<NEW[]> => {
	const xmlNews = await getNews()
	const max1: number = Math.floor(Math.random() * Math.floor(xmlNews.length / 2))
	const max2: number = Math.floor(
		Math.random() * (xmlNews.length - 1 - Math.ceil(xmlNews.length / 2)) + Math.ceil(xmlNews.length / 2)
	)
	const new1 = await getAttrFromNewXml(xmlNews[max1].join())
	const new2 = await getAttrFromNewXml(xmlNews[max2].join())
	return [new1, new2]
}

export async function GET(): Promise<Response> {
	// GET NEWS
	const file = await fs.readFile(db, 'utf8')
	const res = await JSON.parse(file)
	// GENERATE 1 OR 2 NEWS
	const news: NEW[] = await generateNews()
	news.forEach(n => {
		res.news.push(n)
	})
	// SAVE ALL
	await fs.writeFile(db, JSON.stringify(res))
	return Response.json({ result: 'News updated' })
}
