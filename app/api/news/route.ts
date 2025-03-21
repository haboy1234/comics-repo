import { promises as fs } from 'fs'
import type { NEW } from '../../types'

const db: string = process.cwd() + '/db/news.json'

const orderByDate = (a: NEW, b: NEW): number => {
	return new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1
}

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url)
	const pageParam: string | null = searchParams.get('page')
	const page: number = pageParam === null ? 1 : parseInt(pageParam)
	const file = await fs.readFile(db, 'utf8')
	const newsPerPage: number = 12
	const from = (page - 1) * newsPerPage
	const to = from + newsPerPage
	try {
		const res = await JSON.parse(file)
		const allNewsOrdered: NEW[] = res.sort(orderByDate).reverse()
		const news: NEW[] = allNewsOrdered.filter(n => new Date(n.date).getTime() <= new Date().getTime()).slice(from, to)
		return Response.json(news)
	} catch (e) {
		return Response.json([{}])
	}
}
