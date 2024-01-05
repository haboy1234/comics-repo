'use client'

import { getComicBySlug } from '@/app/services/comics'
import { type SERIE, type COMIC } from '@/app/types'
import { useEffect, useState } from 'react'

const useComic = (slug: string): [SERIE | null, COMIC | null] => {
	const defaultComic: COMIC = {} as any as COMIC
	const [comic, setComic] = useState<COMIC | null>(defaultComic)
	const [serie, setSerie] = useState<SERIE | null>(defaultComic)

	useEffect(() => {
		const fetchComic = async (): Promise<void> => {
			const [ serieData, comicDetail ]: [ SERIE, COMIC ] = await getComicBySlug(slug)
			setComic(Object.keys(comicDetail).length > 0 ? comicDetail : null)
			setSerie(Object.keys(comicDetail).length > 0 ? serieData : null)
		}
		fetchComic().catch(() => {})
	}, [slug])

	return [serie, comic]
}

export default useComic
