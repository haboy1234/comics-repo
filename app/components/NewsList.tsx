'use client'

import { notFound } from 'next/navigation'
import useNews from '../hooks/useNews'
import { type NEW } from '../types'

function NewsList({ page }: { page: number }): React.JSX.Element {
	const news: NEW[] = useNews(page)
	if (news === null) {
		notFound()
	}

	return (
		<>
			{news?.map((n, i) => {
				return (
					<a key={i} href={`/blog/${n.url}`}>
						{n.title}
					</a>
				)
			})}
		</>
	)
}

export default NewsList
