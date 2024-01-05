'use client'

import { getAllSeries } from '@/app/services/comics'
import { type SERIE } from '@/app/types'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

const useSeries = (): [SERIE[], SERIE[], Dispatch<SetStateAction<SERIE[]>>] => {
	const [series, setSeries] = useState<SERIE[]>([])
	const [filter, setFilter] = useState<SERIE[]>([])

	useEffect(() => {
		const fetchComics = async (): Promise<void> => {
			const seriesList: SERIE[] = await getAllSeries()
			setSeries(seriesList)
			setFilter(seriesList)
		}
		fetchComics().catch(() => {})
	}, [])

	return [series, filter, setFilter]
}

export default useSeries
