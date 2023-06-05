import type { PriceTag } from './prices.js'

import { EventStart, EventLocation } from './events.js'
import { PriceSummary } from './prices.js'
import {
  LocationIcon,
  LogisticsIcon,
  ShowFormatIcon,
  TicketsIcon,
} from './icons.js'

export interface Location {
  name: string
}

export interface ShowType {
  name: string
}

export interface Show {
  id: string
  name: string
  start: string
  showType: ShowType
  location?: Location
  ticketPrices: PriceTag[]
}

interface ShowDetailProps {
  show: Show
}

export function ShowStart({ show }: ShowDetailProps) {
  return (
    <>
      <LogisticsIcon /> <EventStart start={show.start} />
    </>
  )
}

export function ShowLocation({ show }: ShowDetailProps) {
  return (
    <>
      <LocationIcon />{' '}
      {show.location ? <EventLocation location={show.location} /> : null}
    </>
  )
}

export function ShowFormat({ show }: ShowDetailProps) {
  return (
    <>
      <ShowFormatIcon /> {show.showType.name}
    </>
  )
}

export function ShowTicketPriceSummary({ show }: ShowDetailProps) {
  return (
    <>
      <TicketsIcon /> <PriceSummary prices={show.ticketPrices} />
    </>
  )
}
