'use client'

import useComics from '@/app/hooks/useComics'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type SERIE, type COMIC } from '@/app/types'

function Categories({ params }: { params: { slug: string } }): React.JSX.Element {
	const [serie, comics]: [SERIE, COMIC[] | null] = useComics(params.slug)

	if (comics?.length === 0) {
		return <></>
	} else if (comics === null) {
		notFound()
	}

	return (
		<div className='comic-list grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
			<div
				className='relative col-span-1 row-span-3 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-br-lg px-6 pb-16 pt-64 text-center sm:col-span-2 lg:col-span-1 lg:row-span-1 lg:pt-0 min-h-[491px]'
				style={{ backgroundColor: 'rgb(var(--green))' }}>
				<div className='absolute inset-0 flex items-center justify-center z-0'>
					<span className='flex max-h-full max-w-full items-center justify-center'>
						<Image src='/images/comicpage.svg' alt='Fondo de página de comic' width={500} height={791} />
					</span>
				</div>
				<h1 className='relative mt-8 mb-4 font-bold uppercase tracking-widest text-4xl text-border-green'>{serie.title}</h1>
			</div>
			{comics?.map((comic, i) => {
				return (
					<Link
						key={i}
						href={`/${comic.url}`}
						className='mosaic__item group after:content group relative after:pointer-events-none after:absolute after:inset-0 rounded-lg after:shadow-highlight overflow-hidden'>
						<Image
							src={`/images/${comic.image}`}
							width={300}
							height={491}
							alt={comic.title}
							className='w-full opacity-85 group-hover:opacity-45'
						/>
						<h2
							className='bottom-0 w-full absolute z-10 text-border-green text-2xl text-center py-2'
							style={{ backgroundColor: 'rgb(var(--dark-green), 0.6)' }}>
							{comic.title}
						</h2>
					</Link>
				)
			})}
		</div>
	)
}

export default Categories
