import type { NEW } from '../types'

export async function getNews(page: number): Promise<NEW[]> {
	const url: string = `/api/news?page=${page}`
	const response = await fetch(url)
	const data = await response.json()
	return data as NEW[]
}

export async function getNewBySlug(slug: string): Promise<NEW> {
	const url: string = `/api/new?slug=${slug}`
	const response = await fetch(url)
	const data = await response.json()
	return data as NEW
}
