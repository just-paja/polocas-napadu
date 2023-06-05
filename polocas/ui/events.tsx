import type { ClassName } from '@polocas/core/generics'

import moment from 'moment-timezone'

import { DateLabel, DateRangeLabel } from './datetime.js'
import { useI18n } from './i18n.js'

interface Location {
  name: string
}

type EventDate = Date | string

interface Event {
  allDay?: boolean
  end?: EventDate
  start: EventDate
}

interface EventLocationProps {
  location: Location
}

export const EventLocation = ({ location }: EventLocationProps) => (
  <span>{location.name}</span>
)

/**
 * Detects if event start is before now and event end is before now. Given
 * event end is null, it compares it to end of day.
 */
export function isPast(event: Event): boolean {
  const start = moment(event.start)
  const now = moment()
  const end = event.end ? moment(event.end) : moment(event.start).endOf('day')
  return now.isAfter(start) && now.isAfter(end)
}

export function isLive(event: Event): boolean {
  const start = moment(event.start)
  const now = moment()
  const end = event.end ? moment(event.end) : moment(event.start).endOf('day')
  return now.isAfter(start) && now.isBefore(end)
}

interface EventStartProps {
  allDay?: boolean
  className?: ClassName
  end?: EventDate
  start: EventDate
}

export function EventStart({ allDay, className, end, start }: EventStartProps) {
  const { t } = useI18n()
  if (!start) {
    return <>{t('event-start-indeterminate')}</>
  }
  const startDate = moment(start)
  if (!end) {
    return <DateLabel showTime={!allDay} date={start} className={className} />
  }
  if (startDate.isSame(end, 'day')) {
    if (allDay) {
      return <DateLabel date={start} className={className} />
    }
  }
  return (
    <DateRangeLabel
      showTime={!allDay}
      start={start}
      end={end}
      className={className}
    />
  )
}
