import { useEffect, useState } from 'react'
import YouTubePlayer from 'youtube-player'

export default function Youtube(): React.JSX.Element {
	const apikey = 'AIzaSyCAs-6RcJITK_ByTkPY-B4odhoHwwaVECM'
	const channelId = 'UCOjXckWt5JEv8dE-M95VB_w' // Professource code
	const [error, setError] = useState(false)

	useEffect(() => {
		const startVideo = async (): Promise<void> => {
			const { publishedAfter, publishedBefore } = obtenerFechasDeAyer()
			const ids = await obtenerVideos(publishedAfter, publishedBefore)
			if (ids.length > 0) {
				const id = shuffle(ids)[0] as string
				const player = YouTubePlayer('video-player')
				await player.loadVideoById(id)
				await player.stopVideo()
				await player.mute()
				await player.setVolume(0)
				player.on('stateChange', event => {
					if (event.data === 1) {
						document.getElementById('video-player')!.style.zIndex = '-1'
						document.getElementById('overlay')!.style.display = 'none'
					}
				})
			}
		}
		startVideo()
	}, [])

	function obtenerFechasDeAyer(): { publishedAfter: string; publishedBefore: string } {
		// Crear un objeto Date para la fecha actual
		const hoy = new Date()

		// Restar un día para obtener la fecha de ayer
		const ayer = new Date(hoy)
		ayer.setDate(hoy.getDate() - 1)

		// Establecer la hora de "ayer" al comienzo del día (00:00:00)
		const comienzoDeAyer = new Date(ayer)
		comienzoDeAyer.setHours(0, 0, 0, 0)

		// Establecer la hora de "ayer" al final del día (23:59:59)
		const finDeAyer = new Date(ayer)
		finDeAyer.setHours(23, 59, 59, 999)

		// Convertir las fechas al formato ISO 8601
		const publishedAfter = comienzoDeAyer.toISOString()
		const publishedBefore = finDeAyer.toISOString()

		return { publishedAfter, publishedBefore }
	}

	async function obtenerVideos(publishedAfter: string, publishedBefore: string): Promise<string[]> {
		const url = `https://www.googleapis.com/youtube/v3/search?key=${apikey}&channelId=${channelId}&part=snippet&order=date&publishedAfter=${publishedAfter}&publishedBefore=${publishedBefore}&maxResults=6`
		console.log(url)
		const ids: string[] = []
		try {
			const response = await fetch(url)
			const data = await response.json()
			if (data.items.length > 0) {
				data.items.forEach((item: { id: { videoId: string } }) => {
					ids.push(item.id.videoId)
				})
			} else {
				console.log('V Not found.')
			}
		} catch (error) {
			setError(true)
			console.error('Error:', error)
		}
		return ids
	}

	function shuffle(array: any[]): any[] {
		let currentIndex = array.length
		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			const randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--
			// And swap it with the current element.
			;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
		}
		return array
	}

	return !error ? (
		<>
			<div
				id='overlay'
				style={{
					position: 'fixed',
					top: '0',
					bottom: '0',
					right: '0',
					color: '#fff',
					background: 'rgba(0,0,0,0.8)',
					fontSize: '3rem',
					fontWeight: 100,
					padding: '40px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column'
				}}
				className='left-0 lg:left-[255px]'>
				Haz click
				<span
					style={{
						color: 'rgb(0,155,80)',
						fontWeight: 'bold',
						cursor: 'pointer',
						textDecoration: 'underline',
						margin: '0 15px',
						display: 'inline-block'
					}}>
					AQUÍ
				</span>
				para empezar a leer
			</div>
			<div id='video-player' style={{ position: 'fixed', top: '0', height: '1080px', width: '100%', opacity: 0 }}></div>
		</>
	) : (
		<></>
	)
}
