import React from 'react'

import { Link } from '../links'
import { Show } from '@polocas-napadu/core/proptypes'
import { EventStart } from '@polocas/ui/events'
import { LocationName } from '../locations/LocationName'

import styles from './BriefShowListItem.module.scss'

export const BriefShowListItem = ({ show }) => (
  <div className={styles.container}>
    <Link
      route='showDetail'
      params={{ slug: show.slug }}
      className={styles.content}
    >
      <span className={styles.location}>
        <EventStart start={show.start} />
        <span className={styles.additional}>
          <LocationName location={show.location} />
        </span>
      </span>
      <span>{show.name}</span>
    </Link>
  </div>
)

BriefShowListItem.propTypes = {
  show: Show.isRequired,
}
