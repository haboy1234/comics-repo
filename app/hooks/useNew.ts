'use client'

import { getNewBySlug } from '@/app/services/news'
import { type NEW } from '@/app/types'
import { useEffect, useState } from 'react'

const useNew = (slug: string): NEW => {
	const defaultNew: NEW = {} as any as NEW
	const [newData, setNewData] = useState<NEW>(defaultNew)

	useEffect(() => {
		const fetchNew = async (): Promise<void> => {
			const newItem = await getNewBySlug(slug)
			setNewData(newItem)
		}
		fetchNew().catch(() => {})
	}, [slug])

	return newData
}

export default useNew
