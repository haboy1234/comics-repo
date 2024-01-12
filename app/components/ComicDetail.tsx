'use client'

import Button from '@/app/components/Button'
import useComic from '@/app/hooks/useComic'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Ad from '@/app/components/Ad'
import { useCallback, useEffect, useState } from 'react'

function ComicDetail({ slug }: { slug: string }): React.JSX.Element {
	const [serie, comic] = useComic(slug)
	const [pagesToShow, setPagesToShow] = useState<number>(2)

	if (comic === null) {
		notFound()
	}

	const onScroll = useCallback(() => {
		const { scrollY } = window
		const currentHeight = document.querySelector('main')!.clientHeight
		if (scrollY >= currentHeight - 2000) {
			setPagesToShow(currentPages => currentPages + 1)
			window.adsbygoogle.push({})
		}
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])

	return (
		<section>
			<div className='flex sticky top-0 min-h-[62px] bg-[rgb(var(--green))] text-center z-10 border-b-2 border-[rgb(var(--dark-green))]'>
				<div className='lg:hidden flex-[60px_0_0]'></div>
				{comic.prevUrl !== undefined ? (
					<Button href={comic.prevUrl} rel='prev'>
						Anterior
					</Button>
				) : (
					<div className='flex-1 lg:flex-[0_0_200px]'></div>
				)}
				<div className='flex-1 text-lg pb-1 hidden lg:block'>
					<Link
						href={serie?.url !== null ? `/categorias/${serie?.url}` : ''}
						rel='category'
						className='text-sm underline underline-offset-4 hover:no-underline opacity-70'>
						{serie?.title}
					</Link>
					<h1 className='text-border-green'>{comic.title}</h1>
				</div>
				{comic.nextUrl !== undefined ? (
					<Button href={comic.nextUrl} rel='next'>
						Siguiente
					</Button>
				) : (
					<div className='flex-1 lg:flex-[0_0_200px]'></div>
				)}
			</div>
			<div className='flex flex-col text-lg pb-2 bg-[rgb(var(--green))] text-center lg:hidden relative border-b-2 border-[rgb(var(--dark-green))] min-h-[74px]'>
				<Link
					href={serie?.url !== null ? `/categorias/${serie?.url}` : ''}
					rel='category'
					className='text-sm underline underline-offset-4 py-2 hover:no-underline opacity-70'>
					{serie?.title}
				</Link>
				<h1 className='text-border-green'>{comic.title}</h1>
			</div>
			<div className='max-w-5xl mx-auto mb-[50vh]'>
				<Ad />
				{comic.pages !== undefined &&
					Object.keys(comic.pages).length > 0 &&
					comic.pages?.slice(0, pagesToShow).map((page: string, i: number) => {
						return (
							<div key={i}>
								<img
									src={page}
									alt={`Página ${i + 1} del comic ${comic.title}`}
									width={window.innerWidth < 1024 ? window.innerWidth : 1024}
									height={1572}
									className='w-full h-auto block'
								/>
								{i % 5 === 0 ? <Ad /> : <></>}
							</div>
						)
					})}
			</div>
		</section>
	)
}

export default ComicDetail
