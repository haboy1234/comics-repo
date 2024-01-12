import { useState } from 'react'

function ListImage({
	src,
	altSrc,
	title
}: {
	src: string
	altSrc: string | undefined
	title: string
}): React.JSX.Element {
	const [finalSrc, setFinalSrc] = useState<string>(src)

	return (
		<img
			src={finalSrc}
			width={300}
			height={450}
			alt={title}
			onError={() => {
				setFinalSrc(altSrc ?? '')
			}}
			className='w-full opacity-85 group-hover:opacity-45'
		/>
	)
}

export default ListImage
