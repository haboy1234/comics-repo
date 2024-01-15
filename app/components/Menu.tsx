'use client'

import Link from 'next/link'
import useSeries from '../hooks/useSeries'
import { useRef, useState } from 'react'

function Menu(): React.JSX.Element {
	const [series, filter, setFilter] = useSeries()
	const [seriesToShow, setSeriesToShow] = useState<number>(50)
	const search = useRef<HTMLInputElement>(null)
	const list = useRef<HTMLUListElement>(null)

	const updateSeries = (): void => {
		setFilter(series)
		setFilter(currentFiltered => {
			return currentFiltered.filter(s => s.title.toLowerCase().includes(search.current!.value.toLowerCase()))
		})
	}

	const detectScroll = (): void => {
		if (list.current === null) return
		if (list.current.scrollTop + list.current.clientHeight >= list.current.scrollHeight - 100) {
			setSeriesToShow(1000)
		}
	}

	return (
		<>
			<input
				ref={search}
				type='text'
				onChange={() => {
					updateSeries()
				}}
				placeholder='Buscar comics'
				className='inline-block w-full outline-none py-2 px-4 font-bold text-black border-green'
			/>
			<nav className='main-menu'>
				<ul
					ref={list}
					onScroll={() => {
						detectScroll()
					}}
					className='w-full overflow-y-auto overflow-x-clip max-w-64 pt-3 border-b-2 absolute top-[103px] bottom-[33px]'
					style={{ backgroundColor: 'rgb(var(--black))', borderBottomColor: 'rgb(var(--dark-green))' }}>
					{filter?.map((serie, index) => {
						return (
							<li key={index} className={index < seriesToShow ? '' : 'hidden'}>
								<Link
									href={`/categorias/${serie.url}`}
									className='block pl-4 pb-1 hover:bg-[rgb(var(--green))] text-border-green'>
									{serie.title}
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
		</>
	)
}

export default Menu
