import { ContestantGroup } from './contestants.js'
import { GameStage } from './gameStage.js'
import { ReactNode } from 'react'
import { GpsCoordinates, Ident, NamedEntity, TeamEntity, Entity, Image } from './generics.js'

export const MAX_PENALTIES = 3

export const TEAM_LOGO_DEFAULT = "/default-logo.png"

export type Band = TeamEntity

export interface Location extends NamedEntity {
	city: string
	address: string
	website: string
	gps?: GpsCoordinates
}

export interface Profile extends NamedEntity {
	avatar: string
	alias: string
}

export interface Role extends NamedEntity {
	show?: Show
}

export interface ShowParticipant extends Entity {
	profile: Profile
	role: Role
}

export interface ShowType extends NamedEntity {
	description: string,
	shortDescription: string,
	slug: string,
}

export interface Show extends NamedEntity {
	location: Location
	participants: ShowParticipant[]
	slug: string
	start: string
	type: ShowType
}
export interface Inspiration extends Entity {
	text: string
}

export interface Game extends Entity {
	inspirations: Inspiration
	type: string
}
	
export interface Stage extends Entity {
	game: Game
	type: GameStage
}

export interface Match extends Entity {
	closed: boolean
	currentStage: Stage
	contestantGroups: ContestantGroup[]
	show: Show
}

export interface GenericError {
	message: string
	name: string
}

export type ErrorMessage = ReactNode | GenericError

export interface FoulType extends NamedEntity {
	slug: string
}

export interface GameRules extends NamedEntity {
	slug: string
}

interface I18nOptions {
	allLanguages: string[]
	defaultLanguage: string
}

export interface I18n {
	options: I18nOptions
}

export interface UsualPlace extends NamedEntity {
	description: string
	location: Location
	placeType: Ident
}

export interface Sponsor extends NamedEntity {
	logo: Image
}

export interface Photo extends Entity {
	description: string
	image: Image
}

export interface propsTranslated {
	t: Function
}
