import { useEffect } from 'react'

declare global {
	interface Window {
		adsbygoogle: any
	}
}

function Ad(): React.JSX.Element {
	useEffect(() => {
		try {
			window.adsbygoogle.push({})
		} catch (e) {}
	})

	return (
		<div>
			<ins
				className='adsbygoogle'
				style={{ display: 'block' }}
				data-ad-client='ca-pub-4311249285901114'
				data-ad-slot='4606816034'
				data-ad-format='auto'
				data-full-width-responsive='true'
			/>
		</div>
	)
}

export default Ad
