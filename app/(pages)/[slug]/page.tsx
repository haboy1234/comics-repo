import ComicDetail from '@/app/components/ComicDetail'
import { type COMIC } from '@/app/types'
import { type Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const url: string = `https://leercomicsonline.com/api/comic?slug=${params.slug}`
	const response = await fetch(url)
	const comic = (await response.json()) as COMIC
	return {
		title: `${comic?.title} - Leer Comics Online`,
		description: comic?.title,
		openGraph: {
			title: `${comic?.title} - Leer Comics Online`,
			description: comic?.title,
			type: 'article',
			url: new URL(`https://leercomicsonline.com/categorias/${comic?.url}`)
		},
		twitter: {
			title: `${comic?.title} - Leer Comics Online`,
			description: comic?.title,
			images: [comic?.image]
		}
	}
}

function Comic({ params }: { params: { slug: string } }): React.JSX.Element {
	return <ComicDetail slug={params.slug} />
}

export default Comic
