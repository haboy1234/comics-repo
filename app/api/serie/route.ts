import { promises as fs } from 'fs'
import type { SERIE } from '../../types'

const db: string = process.cwd() + '/db/series.json'

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url)
	const paramUrl: string | null = searchParams.get('url')
	const paramId: string | null = searchParams.get('id')
	if (paramUrl === null && paramId === null) {
		return Response.json({})
	}
	const file = await fs.readFile(db, 'utf8')
	try {
		const res = await JSON.parse(file)
		let serie = []
		if (paramUrl !== null) {
			serie = res.series.filter((s: SERIE) => {
				return s.url === paramUrl
			})
		} else if (paramId !== null) {
			serie = res.series.filter((s: SERIE) => {
				return s.id === parseInt(paramId)
			})
		}
		return Response.json(serie[0])
	} catch (e) {
		return Response.json({})
	}
}
