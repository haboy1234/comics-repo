export interface SERIE {
	id: number
	title: string
	url: string
}

export interface COMIC {
	id: number
	title: string
	url: string
	serieId: number
	embed: string
	image: string
	prev: number
	prevUrl?: string
	next: number
	nextUrl?: string
	pages?: string[]
}

export interface NEW {
	title: string
	url: string
	content: string[]
	image: string
	date: Date
}
