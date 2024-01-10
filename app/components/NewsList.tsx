'use client'

import { notFound } from 'next/navigation'
import useNews from '../hooks/useNews'
import { type NEW } from '../types'
import Image from 'next/image'
import Button from './Button'

function NewsList({ page }: { page: number }): React.JSX.Element {
	const news: NEW[] = useNews(page)
	if (news === null) {
		notFound()
	}

	return (
		<div className=' mx-auto lg:max-w-7xl mt-3 '>
			<div className='max-w-7xl mx-auto px-5 mb-3'>
				<div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
					{news?.map((n, i) => {
						return (
							<div
								key={i}
								className='max-w-xl rounded-lg border bg-[rgb(var(--dark-green))] border-[rgb(var(--green))]'>
								<a href={`/blog/${n.url}`} className='block overflow-hidden h-56'>
									<Image
										className='rounded-t-lg pb-2 min-h-56'
										src={`/images/${n.image}`}
										width={400}
										height={300}
										alt={n.title}
									/>
								</a>
								<div className='p-5'>
									<a href={`/blog/${n.url}`}>
										<h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{n.title}</h2>
									</a>
									<div className='text-xs font-bold uppercase text-teal-700 mt-1 mb-2'>{`${new Date(
										n.date
									).toLocaleDateString('es-es', {
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})}`}</div>

									<p className='mb-3 font-normal text-gray-400'>{`${n.content
										.filter(c => c.trim().length > 0)
										.at(0)
										?.slice(0, 200)}...`}</p>
									<div className='inline-block'>
										<Button href={`/blog/${n.url}`} rel={''}>
											Ver más
											<svg
												className='ml-2 -mr-1 w-4 h-4 inline'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'>
												<path
													fillRule='evenodd'
													d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
													clipRule='evenodd'></path>
											</svg>
										</Button>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				{page > 1 && (
					<div className='py-3 inline-block'>
						<Button href={`/blog/${page - 1}`} rel='prev'>
							Anterior
						</Button>
					</div>
				)}
				<div className='float-right py-3 inline-block'>
					<Button href={`/blog/${page + 1}`} rel='next'>
						Siguiente
					</Button>
				</div>
			</div>
		</div>
	)
}

export default NewsList
