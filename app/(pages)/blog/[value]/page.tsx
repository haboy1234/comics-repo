import NewDetail from '@/app/components/NewDetail'
import NewsList from '@/app/components/NewsList'
import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }: { params: { value: string } }): Promise<Metadata> {
	if (isNaN(parseInt(params.value))) {
		const name = params.value.replace(/-/g, ' ').charAt(0).toUpperCase() + params.value.replace(/-/g, ' ').slice(1)
		return {
			title: name,
			description: name,
			openGraph: {
				title: name,
				description: name,
				type: 'article',
				url: new URL(`https://leercomicsonline.com/blog/${params.value}/`)
			},
			twitter: {
				title: name,
				description: name,
				images: [params.value]
			}
		}
	} else {
		return {
			openGraph: {
				url: new URL(`https://leercomicsonline.com/blog/${params.value}/`)
			}
		}
	}
}

function Blog({ params }: { params: { value: string } }): React.JSX.Element {
	let page: number | null = null
	let slug: string | null = null
	if (isNaN(parseInt(params.value))) {
		slug = params.value
	} else {
		page = parseInt(params.value)
		if (page === 1) {
			redirect('/')
		}
	}
	return (
		<>
			{page !== null && <NewsList page={page} />}
			{slug !== null && <NewDetail slug={slug} />}
		</>
	)
}

export default Blog
