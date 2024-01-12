import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title:
		'Leer Comics Online - Miles de cómics gratuitos para leer online. Aquí encontrarás series enteras de Marvel, DC y muchos otros.',
	description:
		'Miles de cómics gratuitos para leer online. Aquí encontrarás series enteras de Marvel, DC y muchos otros.',
	applicationName: 'Leer Comics Online',
	referrer: 'origin-when-cross-origin',
	metadataBase: new URL('https://leercomicsonline.com'),
	appleWebApp: true,
	openGraph: {
		title:
			'Leer Comics Online - Miles de cómics gratuitos para leer online. Aquí encontrarás series enteras de Marvel, DC y muchos otros.',
		description:
			'Miles de cómics gratuitos para leer online. Aquí encontrarás series enteras de Marvel, DC y muchos otros.',
		type: 'website',
		url: new URL('https://leercomicsonline.com'),
		siteName: 'Leer Comics Online',
		locale: 'es_ES'
	},
	twitter: {
		card: 'summary_large_image',
		description:
			'Miles de cómics gratuitos para leer online. Aquí encontrarás series enteras de Marvel, DC y muchos otros.',
		title:
			'Leer Comics Online - Miles de cómics gratuitos para leer online. Aquí encontrarás series enteras de Marvel, DC y muchos otros.',
		site: '@LeerComicOnline'
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<html lang='es'>
			<body className={inter.className}>
				<div className='lg:flex min-h-screen'>
					<Header />
					<main className='flex-1 bg-cover relative'>{children}</main>
				</div>
				<script
					async
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4311249285901114'
					crossOrigin='anonymous'></script>
			</body>
		</html>
	)
}
