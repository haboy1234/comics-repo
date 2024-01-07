'use client'

import { getComics } from '@/app/services/comics'
import { type SERIE, type COMIC } from '@/app/types'
import { useEffect, useState } from 'react'

const useComics = (slug: string): [SERIE, COMIC[] | null] => {
	const defaultSerie: SERIE = {} as any as SERIE
	const [comics, setComics] = useState<COMIC[] | null>([])
	const [serie, setSerie] = useState<SERIE>(defaultSerie)

	useEffect(() => {
		const fetchComics = async (): Promise<void> => {
			const [serie, comicsList]: [SERIE, COMIC[]] = await getComics(slug)
			setComics(comicsList.length > 0 ? comicsList : null)
			setSerie(serie)
		}
		fetchComics().catch(() => {})
	}, [slug])

	return [serie, comics]
}

export default useComics
