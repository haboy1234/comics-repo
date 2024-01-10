import NewsList from './components/NewsList'

function Home(): React.JSX.Element {
	return (
		<>
			<NewsList page={1} />
		</>
	)
}

export default Home
