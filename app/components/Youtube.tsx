import { useState } from 'react'

export default function Youtube(): React.JSX.Element {
	const websites: string[] = ['alverno.edu/', 'bates.edu/', 'uchicago.edu/', 'risd.edu/', 'vcu.edu/']
	const ids: string[] = ['ylssgHLVZaE']
	const [showButton, setShowButton] = useState('block')

	const onClick = async (): Promise<void> => {
		setShowButton('hidden')
	}

	return (
		<>
			<div style={{ opacity: 0, display: showButton }}>Haz clic aquí para empezar a leer</div>
			<iframe
				onClick={() => {
					onClick()
				}}
				id='video-player'
				style={{ position: 'absolute', top: '-3000px', display: showButton }}
				allowFullScreen={false}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				referrerPolicy='strict-origin-when-cross-origin'
				width='640'
				height='360'
				src={`https://www.youtube.com/embed/${ids[0]}?enablejsapi=1&amp;origin=https%3A%2F%2F${websites[0]}&amp`}></iframe>
		</>
	)
}
