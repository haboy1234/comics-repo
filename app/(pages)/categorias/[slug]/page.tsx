import ComicList from '@/app/components/ComicList'
import { type Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const url: string = `https://leercomicsonline.com/api/serie?url=${params.slug}`
	const response = await fetch(url)
	const serie = await response.json()
	return {
		title: `${serie?.title} - Leer Comics Online`,
		description: serie?.title,
		openGraph: {
			title: `${serie?.title} - Leer Comics Online`,
			description: serie?.title,
			url: new URL(`https://leercomicsonline.com/categorias/${serie.url}`)
		},
		twitter: {
			title: `${serie?.title} - Leer Comics Online`,
			description: serie?.title,
			images: [serie?.image]
		}
	}
}

function Categories({ params }: { params: { slug: string } }): React.JSX.Element {
	return <ComicList slug={params.slug} />
}

export default Categories
