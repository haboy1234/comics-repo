import { promises as fs } from 'fs'
import type { NEW } from '../../types'

const db: string = process.cwd() + '/db/news.json'

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url)
	const slugParam: string | null = searchParams.get('slug')
	if (slugParam === null) {
		return Response.json({})
	}
	const file = await fs.readFile(db, 'utf8')
	try {
		const res = await JSON.parse(file)
		const news: NEW[] = res.filter((n: NEW) => {
			return n.url === slugParam
		})
		return Response.json(news[0])
	} catch (e) {
		return Response.json({})
	}
}
