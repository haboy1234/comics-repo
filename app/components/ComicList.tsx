'use client'

import useComics from '@/app/hooks/useComics'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type SERIE, type COMIC } from '@/app/types'
import ListImage from '@/app/components/ListImage'

function ComicList({ slug }: { slug: string }): React.JSX.Element {
	const [serie, comics]: [SERIE, COMIC[] | null] = useComics(slug)

	let altImage: string | undefined = ''
	if (comics?.length === 0) {
		return <></>
	} else if (comics === null) {
		notFound()
	} else {
		try {
			altImage = comics[0].pages?.at(0)
		} catch (e) {
			altImage = '/images/notfound.webp'
		}
	}

	return (
		<div className='comic-list grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
			<div
				className='relative col-span-1 row-span-3 flex flex-col items-center justify-center gap-4 overflow-hidden lg:rounded-br-lg px-6 lg:pb-16  text-center sm:col-span-2 lg:col-span-1 lg:row-span-1 lg:pt-0 lg:min-h-[491px]'
				style={{ backgroundColor: 'rgb(var(--green))' }}>
				<div className='lg:absolute inset-0 flex items-center justify-center z-0'>
					<span className='flex lg:max-h-full max-w-full items-center justify-center'>
						<Image
							src='/images/comicpage.svg'
							alt='Fondo de página de comic'
							width={500}
							height={791}
							className='hidden lg:block'
						/>
					</span>
				</div>
				<h1 className='relative mt-0 lg:mt-8 mb-4 font-bold uppercase tracking-widest text-2xl lg:text-4xl text-border-green pl-16 pr-0'>
					{serie.title}
				</h1>
			</div>
			{comics?.map((comic, i) => {
				return (
					<Link
						key={i}
						href={`/${comic.url}`}
						className='mosaic__item group after:content group relative after:pointer-events-none after:absolute after:inset-0 lg:rounded-lg after:shadow-highlight overflow-hidden'>
						<ListImage src={`/images/${comic.image}`} altSrc={altImage} title={comic.title} />
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

export default ComicList
