import Alert from 'react-bootstrap/Alert'
import classnames from 'classnames'
import React from 'react'
import styles from './MonthShowList.module.scss'

import { Heading, Section } from '@polocas/ui/content'
import { Link } from '../links'
import { TicketButtons } from './TicketButtons'
import { withTranslation } from '@polocas/ui/i18n'
import { isLive, isPast } from '@polocas/ui/events'
import {
  ShowStart,
  ShowLocation,
  ShowFormat,
  ShowTicketPriceSummary,
} from '@polocas/ui/shows'

const ListItem = ({ show }) => {
  return (
    <Section
      as='article'
      className={classnames('row', styles.event, {
        [styles.past]: isPast(show),
        [styles.live]: isLive(show),
      })}
    >
      <Heading>
        <Link route='showDetail' params={{ slug: show.slug }}>
          {show.name}
        </Link>
      </Heading>
      <div className='mt-2'>
        <div>
          <ShowStart show={show} />
        </div>
        <div>
          <ShowLocation show={show} />
        </div>
        <div>
          <Link route='showFormatDetail' params={{ slug: show.showType.slug }}>
            <ShowFormat show={show} />
          </Link>
        </div>
        {show.ticketPrices.length !== 0 && (
          <div>
            <ShowTicketPriceSummary show={show} />
          </div>
        )}
      </div>
      <TicketButtons event={show} />
    </Section>
  )
}

const NoFutureShows = withTranslation(({ t }) => (
  <Alert className='mt-3' variant='light'>
    {t('noShowsPlanned')}
  </Alert>
))

export const MonthShowList = ({ shows }) => {
  return (
    <div>
      {shows.length ? (
        shows.map((show) => <ListItem key={show.id} show={show} />)
      ) : (
        <NoFutureShows />
      )}
    </div>
  )
}
