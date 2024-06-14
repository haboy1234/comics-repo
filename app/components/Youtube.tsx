import { useState } from 'react'
import YouTubePlayer from 'youtube-player'

export default function Youtube(): React.JSX.Element {
	const ids: string[] = ['7JEjQG4-tpU']
	const [showButton, setShowButton] = useState('block')

	const onClick = async (): Promise<void> => {
		setShowButton('hidden')
		const player = YouTubePlayer('video-player')
		await player.setVolume(0)
		await player.mute()
		player.loadVideoById(ids[0])
		player.playVideo()
	}

	return (
		<>
			<button
				onClick={() => {
					onClick()
				}}
				style={{ opacity: 0, display: showButton }}></button>
			<div id='video-player' style={{ position: 'absolute', top: '-3000px' }}></div>
		</>
	)
}
