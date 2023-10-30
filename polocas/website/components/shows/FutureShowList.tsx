import Alert from 'react-bootstrap/Alert'
import React from 'react'
import Row from 'react-bootstrap/Row'

import { ShowListItem } from './ShowListItem'
import { useI18n } from '@polocas/next/i18n'

function NoFutureShows() {
  const { t } = useI18n()
  return (
    <Alert className='mt-3' variant='light'>
      {t('noShowsPlanned')}
    </Alert>
  )
}

export const FutureShowList = ({ shows }) => {
  return (
    <Row>
      {shows.length ? (
        shows.map((show) => <ShowListItem key={show.id} show={show} />)
      ) : (
        <NoFutureShows />
      )}
    </Row>
  )
}
