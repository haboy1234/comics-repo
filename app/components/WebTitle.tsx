'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function WebTitle(): React.JSX.Element {
	const pathname = usePathname()
	const classes = 'block text-xl font-bold py-4 pl-4 text-border-green uppercase'
	const title = 'Leer Comics Online'

	return (
		<Link href='/'>
			{pathname === '/' ? <h1 className={classes}>{title}</h1> : <span className={classes}>{title}</span>}
		</Link>
	)
}

export default WebTitle
