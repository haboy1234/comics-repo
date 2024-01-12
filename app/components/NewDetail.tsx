'use client'

import { notFound } from 'next/navigation'
import useNew from '../hooks/useNew'
import { type NEW } from '../types'
import Image from 'next/image'
import Ad from './Ad'

function NewDetail({ slug }: { slug: string }): React.JSX.Element {
	const n: NEW = useNew(slug)
	if (n === null) {
		notFound()
	} else if (Object.keys(n).length === 0) {
		return <></>
	}

	return (
		<article className='w-full max-w-2xl mx-auto pb-8 bg-[rgb(var(--black))]'>
			<Image
				src={`/images/${n?.image}`}
				width={window.innerWidth < 500 ? window.innerWidth : 500}
				height={500}
				alt={n?.title}
				className='relative w-full h-auto'
			/>
			<time className='text-border-green text-xl lg:text-3xl bg-[rgb(var(--green))] inline-block -mt-14 z-10 relative p-4 float-right rounded-tl-lg'>
				{`${new Date(n.date).toLocaleDateString('es-es', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				})}`}
			</time>
			<h1 className='block sm:text-3xl lg:text-5xl font-bold uppercase py-5 px-6 lg:px-8 mb-8 text-border-green bg-[rgb(var(--green))] sm:leading-[4rem]'>
				{n.title}
			</h1>
			{n?.content?.map((c, i) => {
				return (
					<p className='my-5 px-6 lg:px-8' key={i}>
						{c}
						{i % 5 === 0 ? <Ad /> : <></>}
					</p>
				)
			})}
		</article>
	)
}

export default NewDetail
