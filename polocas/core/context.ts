import type { Match, Show  } from './constants.js'

import { createContext, useContext } from 'react'
import { Sponsor } from './constants.js'

interface PageContextShape {
  siteSponsorList: Sponsor[]
}

export interface UrlBaseShape {
  host: string
  origin: string
  protocol: string
  url: string
}

export const RouterContext = createContext({})
export const MatchContext = createContext<Match>({
  id: '',
})
export const ShowContext = createContext<Show | null>(null)
export const UrlBase = createContext<UrlBaseShape | null>(null)
export const PageContext = createContext<PageContextShape>({
  siteSponsorList: [],
})

export const useMatch = () => useContext(MatchContext)
export const usePage = () => useContext(PageContext)
export const useShow = () => useContext(ShowContext)

export const useSponsors = () => usePage().siteSponsorList
