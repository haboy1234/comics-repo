import { promises as fs } from 'fs'
import { notFound } from 'next/navigation'
import type { COMIC } from '../../types'

const db: string = process.cwd() + '/db/comics.json'

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url)
	const paramSlug: string | null = searchParams.get('slug')
	const paramId: string | null = searchParams.get('id')
	if (paramSlug === null && paramId === null) {
		return Response.json({})
	}
	const file = await fs.readFile(db, 'utf8')
	try {
		const res = await JSON.parse(file)
		let comic = []
		if (paramSlug !== null) {
			comic = res.comics.filter((c: COMIC) => {
				return c.url === paramSlug
			})
		} else if (paramId !== null) { 
			comic = res.comics.filter((c: COMIC) => {
				return c.id === parseInt(paramId)
			})
		}
		if (comic.length !== 1) {
			return notFound()
		}
		return Response.json(comic[0])
	} catch (e) {
		return Response.json({})
	}
}
