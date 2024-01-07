import Menu from './Menu'
import WebTitle from './WebTitle'

function Header(): React.JSX.Element {
	return (
		<header
			className='flex flex-col mt-0 mx-auto w-screen lg:w-auto lg:flex-[0_0_16rem] h-screen lg:sticky top-0'
			style={{ backgroundColor: 'rgb(var(--green))' }}>
			<WebTitle />
			<Menu />
			<div className='text-xs text-[0.66rem] p-2 text-center text-border-green absolute bottom-0 w-full'>
				{new Date().getFullYear()} © LeerComicsOnline.com
			</div>
		</header>
	)
}

export default Header
