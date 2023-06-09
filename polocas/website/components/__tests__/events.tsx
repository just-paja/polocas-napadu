import moment from 'moment-timezone'
import React from 'react'

import { advanceTo, clear } from 'jest-date-mock'
import { EventStart } from 'ui/events'
import { renderWithI18n } from '@polocas-napadu/jest'

describe('EventStart component', () => {
  const systemLocale = moment.locale()

  beforeEach(() => {
    advanceTo(new Date(2019, 1, 19, 8, 0, 0))
    moment.locale('cs')
  })

  afterEach(() => {
    clear()
    moment.locale(systemLocale)
  })

  it.only('given no start date, renders start indeterminate message', async () => {
    const comp = await renderWithI18n(<EventStart />)
    comp.debug()
    expect(comp.getByText('event-start-indeterminate')).toBeInTheDocument()
  })

  it('given start datetime, renders exact start datetime', async () => {
    const comp = await renderWithI18n(
      <EventStart start="2019-02-19T09:00:00" />
    )
    expect(comp).toHaveTextContent('19. únor 2019 9:00')
  })

  it('given start all day date, renders exact start date', async () => {
    const comp = await renderWithI18n(
      <EventStart allDay start="2019-02-19T09:00:00" />
    )
    expect(comp).toHaveTextContent('19. únor 2019')
  })

  it('given start and end, renders exact start datetime', async () => {
    const comp = await renderWithI18n(
      <EventStart start="2019-02-19T09:00:00" end="2019-02-19T12:00:00" />
    )
    expect(comp).toHaveTextContent('19. únor 2019 9:00')
  })

  it('given start and end on same day, renders end hours', async () => {
    const comp = await renderWithI18n(
      <EventStart start="2019-02-19T09:00:00" end="2019-02-19T12:00:00" />
    )
    expect(comp).toHaveTextContent('19. únor 2019 9:00 - 12:00')
  })

  it('given allDay, start and end on same day, renders only events date', async () => {
    const comp = await renderWithI18n(
      <EventStart
        allDay
        start="2019-02-19T00:00:00"
        end="2019-02-19T00:00:00"
      />
    )
    expect(comp).toHaveTextContent('19. únor 2019')
  })

  it('given allDay, start and end on same day, renders events start and end date', async () => {
    const comp = await renderWithI18n(
      <EventStart
        allDay
        start="2019-02-19T00:00:00"
        end="2019-03-20T00:00:00"
      />
    )
    expect(comp).toHaveTextContent('19. únor 2019 - 20. březen 2019')
  })

  it('given start and end on same day, renders events start and end date time', async () => {
    const comp = await renderWithI18n(
      <EventStart start="2019-02-19T10:00:00" end="2019-03-20T15:00:00" />
    )
    expect(comp).toHaveTextContent(
      '19. únor 2019 10:00 - 20. březen 2019 15:00'
    )
  })
})
