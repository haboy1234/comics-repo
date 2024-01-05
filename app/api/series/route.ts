import { promises as fs } from 'fs'

const db: string = process.cwd() + '/db/series.json'

export async function GET(): Promise<Response> {
	const file = await fs.readFile(db, 'utf8')
	const res = await JSON.parse(file)
	const series = res.series
	return Response.json(series)
}
