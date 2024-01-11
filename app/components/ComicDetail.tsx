'use client'

import Button from '@/app/components/Button'
import useComic from '@/app/hooks/useComic'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Ad from '@/app/components/Ad'

function ComicDetail({ slug }: { slug: string }): React.JSX.Element {
	const [serie, comic] = useComic(slug)

	if (comic === null) {
		notFound()
	}

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
					comic.pages?.map((page: string, i: number) => {
						return (
							<div key={i}>
								<Image
									src={page}
									alt={`Página ${i + 1} del comic ${comic.title}`}
									width={window.innerWidth < 1024 ? window.innerWidth : 1024}
									height={1572}
									placeholder='blur'
									blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwRAAABtbnRyUkdCIFhZWiAH6AABAAcAEgAtADhhY3NwTVNGVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAQw//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9oADAMBAAIAAwAAABCf/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPxB//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPxB//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxB//9k='
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
