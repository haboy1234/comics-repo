import Link from 'next/link'

function Button({ children, href, rel }: { children: React.ReactNode; href: string; rel: string }): React.JSX.Element {
	return (
		<Link
			href={href}
			rel={rel}
			className='block p-4 mt-[2px] flex-[0_0_200px] text-border-green bg-[rgb(var(--green))] hover:bg-[rgb(var(--dark-green))]'>
			{children}
		</Link>
	)
}

export default Button
