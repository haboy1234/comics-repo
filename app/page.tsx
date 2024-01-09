'use client'

import { notFound } from 'next/navigation'
import useNews from './hooks/useNews'
import NewsList from './components/NewsList'

function Home(): React.JSX.Element {
	return (
		<>
			<NewsList page={1} />
		</>
	)
}

export default Home
