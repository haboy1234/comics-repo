import type { COMIC, SERIE } from '../types'

// SERIES

async function getSerieIdByURL(slug: string): Promise<SERIE> {
	slug = encodeURIComponent(slug)
	const url: string = `/api/serie?url=${slug}`
	const response = await fetch(url)
	const data = await response.json()
	return data as SERIE
}

async function getSerieById(serieId: number): Promise<SERIE> {
	const url: string = `/api/serie?id=${serieId}`
	const response = await fetch(url)
	const data = await response.json()
	return data as SERIE
}

export async function getAllSeries(): Promise<SERIE[]> {
	const url: string = `/api/series`
	const response = await fetch(url)
	const data = await response.json()
	return data as SERIE[]
}

// COMICS

export async function getComics(serieSlug: string): Promise<[SERIE, COMIC[]]> {
	const serie: SERIE = await getSerieIdByURL(serieSlug)
	if (Object.keys(serie).length === 0) {
		return [serie, []]
	}
	const url: string = `/api/comics?serieId=${serie.id}`
	const response = await fetch(url)
	const data = (await response.json()) as COMIC[]
	// GET PAGES IMAGES OF THE FIRST COMIC TO USE IF THE SERIE IMAGE FAILS
	const pages: string[] = await getPages(data[0].id, serie.title)
	data[0].pages = pages
	return [serie, data]
}

export async function getComicBySlug(slug: string): Promise<[SERIE, COMIC]> {
	slug = encodeURIComponent(slug)
	const url: string = `/api/comic?slug=${slug}`
	const response = await fetch(url)
	const data = (await response.json()) as COMIC
	if (Object.keys(data).length === 0) {
		return [{} as any as SERIE, data]
	}
	// GET SERIE OBJECT OF THE COMIC
	const serie: SERIE = await getSerieById(data.serieId)
	// GET PREV AND NEXT URL FROM COMIC OBJECT
	if (typeof data.prev === 'number') {
		const prevComic = await getComicById(data.prev)
		data.prevUrl = prevComic!.url
	}
	if (typeof data.next === 'number') {
		const nextComic = await getComicById(data.next)
		data.nextUrl = nextComic!.url
	}
	// GET PAGES
	const pages: string[] = await getPages(data.id, serie.title)
	data.pages = pages

	return [serie, data]
}

async function getComicById(id: number): Promise<COMIC | null> {
	const url: string = `/api/comic?id=${id}`
	const response = await fetch(url)
	const data = (await response.json()) as COMIC
	if (Object.keys(data).length === 0) {
		return null
	}
	return data
}

// PAGES

async function getPages(id: number, title: string): Promise<string[]> {
	const letter = title.charAt(0).toLowerCase()
	const url: string = `/api/pages?id=${id}&letter=${letter}`
	const response = await fetch(url)
	const data = (await response.json()) as string[]
	return data
}
