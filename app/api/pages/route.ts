import { promises as fs } from 'fs'

const db: string = process.cwd() + '/db/pages'

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url)
	const paramId: string | null = searchParams.get('id')
	const paramLetter: string | null = searchParams.get('letter')
	if (paramId === null || paramLetter === null) {
		return Response.json({})
	}
	const file = await fs.readFile(`${db}-${paramLetter}.json`, 'utf8')
	try {
		const res = await JSON.parse(file)
		const	pages = res.pages.filter((p: {id: number, pages: []}) => {
				return p.id === parseInt(paramId)
		})
		return Response.json(pages[0].pages)
	} catch (e) {
		return Response.json({})
	}
}
