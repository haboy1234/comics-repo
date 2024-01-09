'use client'

import { getNews } from '@/app/services/news'
import { type NEW } from '@/app/types'
import { useEffect, useState } from 'react'

const useNews = (page: number): NEW[] => {
	const [news, setNews] = useState<NEW[]>([])

	useEffect(() => {
		const fetchNews = async (): Promise<void> => {
			const newsList = await getNews(page)
			setNews(newsList)
		}
		fetchNews().catch(() => {})
	}, [page])

	return news
}

export default useNews
