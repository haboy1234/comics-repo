'use client'

import Button from '@/app/components/Button'
import useComic from '@/app/hooks/useComic'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

function Comic({ params }: { params: { slug: string } }): React.JSX.Element {
	const [ serie, comic ] = useComic(params.slug)

	if (comic === null) {
		notFound()
	}

	return (
		<section>
			<div className='flex sticky top-0 min-h-[60px] bg-[rgb(var(--green))] text-center'>
				{comic.prevUrl !== undefined ? <Button href={comic.prevUrl} rel='prev'>Anterior</Button> : <div className='flex-[0_0_200px]'></div>}
				<div className='flex-1 text-lg pb-1'>
					<Link href={serie?.url !== null ? `/categorias/${serie?.url}` :  ''} rel='category' className='text-sm underline underline-offset-4 hover:no-underline opacity-70'>
						{serie?.title}
					</Link>
					<h1 className='text-border-green'>{comic.title}</h1>
				</div>
				{comic.nextUrl !== undefined ? <Button href={comic.nextUrl} rel='next'>Siguiente</Button> : <div className='flex-[0_0_200px]'></div>}
			</div>
			{/* comic.pages?.map((page, i) => {
				return(
					<Image key={i} src={page} alt={`Página ${i+1} del comic ${comic.title}`} />
				)
			}) */}
			<iframe src={comic.embed} width="640" height="390" title={comic.title}
				allowFullScreen={true} allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				className='w-full h-[200vh] aspect-video' />
			
		</section>
	)
}

export default Comic
