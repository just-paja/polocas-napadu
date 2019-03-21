import React from 'react'

import { Link } from '../../routes'
import { Show } from '../proptypes'
import { EventLocation, EventStart } from '../events'

export const ShowListItem = ({ show }) => (
  <div>
    <Link route='showDetail' params={{ slug: show.slug }}>
      <a>{show.name}</a>
    </Link>
    <br />
    <EventStart
      allDay={show.allDay}
      start={show.start}
      end={show.end}
    />
    <br />
    {show.location && <EventLocation location={show.location} />}
  </div>
)

ShowListItem.propTypes = {
  show: Show.isRequired
}