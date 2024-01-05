import { promises as fs } from 'fs'
import type { COMIC } from '../../types'

const db: string = process.cwd() + '/db/comics.json'

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url)
	const serieIdParam: string | null = searchParams.get('serieId')
	if (serieIdParam === null) {
		return Response.json({})
	}
	const serieId: number = parseInt(serieIdParam)
	const file = await fs.readFile(db, 'utf8')
	try {
		const res = await JSON.parse(file)
		const comic = res.comics.filter((c: COMIC) => {
			return c.serieId === serieId
		})
		return Response.json(comic)
	} catch (e) {
		return Response.json({})
	}
}
