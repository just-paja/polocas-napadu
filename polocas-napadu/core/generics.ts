export type GpsCoordinates = string
export type Ident = string

export interface ImageObject {
	height: number
	src: string
	width: number
}

export type Image = ImageObject | string

export interface Entity {
	id: Ident
}

export interface NamedEntity extends Entity {
	name: string
}

export interface TeamEntity extends NamedEntity {
city: string
logo: Image
}

export type Children = string | JSX.Element | JSX.Element[] | (() => JSX.Element)
