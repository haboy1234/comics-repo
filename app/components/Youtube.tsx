import { useState, useEffect } from 'react'
// import YouTubePlayer from 'youtube-player'

export default function Youtube(): React.JSX.Element {
	// const websites: string[] = ['alverno.edu/', 'bates.edu/', 'uchicago.edu/', 'risd.edu/', 'vcu.edu/']
	// const ids: string[] = ['ylssgHLVZaE']
	const [showButton, setShowButton] = useState('block')
	// const player = YouTubePlayer('video-player')

	const onClick = async (): Promise<void> => {
		setShowButton('hidden')
	}

	useEffect(() => {
		/* player.loadVideoById(ids[0])
		player.mute()
		player.setVolume(0) */
	}, [])

	return (
		<>
			<div
				onClick={() => {
					onClick()
				}}
				id='video-player'
				style={{ position: 'absolute', top: '-3000px', display: showButton }}></div>
		</>
	)
}
