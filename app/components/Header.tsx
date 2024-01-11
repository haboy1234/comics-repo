'use client'

import { useState } from 'react'
import Menu from './Menu'
import WebTitle from './WebTitle'

function Header(): React.JSX.Element {
	const [responsiveMenuExpanded, setResponsiveMenuExpanded] = useState<boolean>(false)

	const toogleResponsiveMenu = (): void => {
		document.body.style.overflow = responsiveMenuExpanded ? 'auto' : 'hidden'
		setResponsiveMenuExpanded(currentMenuState => !currentMenuState)
	}

	return (
		<header
			className={`flex flex-col mt-0 mx-auto w-64 transition-[left] ${
				responsiveMenuExpanded ? 'left-0' : '-left-64'
			} lg:left-0 lg:w-auto flex-[0_0_16rem] h-screen fixed lg:sticky top-0 z-30 border-r-2 lg:border-r-0 border-[rgb(var(--dark-green))]`}
			style={{ backgroundColor: 'rgb(var(--green))' }}>
			<button
				className='inline'
				onClick={() => {
					toogleResponsiveMenu()
				}}>
				<svg
					className='fill-current h-[3.85rem] w-[4rem] absolute -right-16 bg-[rgb(var(--green))] lg:hidden p-5 border-b-2 border-r-2 border-[rgb(var(--dark-green))]'
					viewBox='0 0 20 20'>
					<line
						x1='0'
						y1='0'
						x2='20'
						y2='20'
						className={`${responsiveMenuExpanded ? '' : 'hidden'}`}
						style={{ stroke: '#fff', strokeWidth: 3 }}
					/>
					<line
						x1='20'
						y1='0'
						x2='0'
						y2='20'
						className={`${responsiveMenuExpanded ? '' : 'hidden'}`}
						style={{ stroke: '#fff', strokeWidth: 3 }}
					/>
					<path
						className={`${responsiveMenuExpanded ? 'hidden' : ''}`}
						d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'
					/>
				</svg>
			</button>

			<WebTitle />
			<Menu />
			<div className='text-xs text-[0.66rem] p-2 text-center text-border-green absolute bottom-0 w-full'>
				{new Date().getFullYear()} © LeerComicsOnline.com
			</div>
		</header>
	)
}

export default Header
