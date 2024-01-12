export async function GET(): Promise<Response> {
	return Response.json({ result: 'News updated' })
}
