import NewDetail from '@/app/components/NewDetail'
import NewsList from '@/app/components/NewsList'
import { redirect } from 'next/navigation'

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
