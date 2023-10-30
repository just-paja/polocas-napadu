import Col from 'react-bootstrap/Col'
import React from 'react'
import Row from 'react-bootstrap/Row'
import styles from './ShowsCounter.module.scss'

import { Link } from '../links'
import { Markdown } from '@polocas/ui/text'
import { useI18n } from '@polocas/next/i18n'

const ShowsCounterItem = ({ format }) => (
  <Link
    route='showFormatDetail'
    params={{ slug: format.slug }}
    className={styles.item}
  >
    <span className={styles.count}>{format.showCount}x</span>{' '}
    <span>{format.name}</span>
  </Link>
)

export function ShowsCounter({ showTypes }) {
  const { t } = useI18n()
  return (
    <div className={styles.counter}>
      <h2>{t('howMuchDidWePlay')}</h2>
      <Markdown source={t('howMuchDidWePlayPerex')} />
      <Row className='mt-3'>
        {showTypes.map((format) => (
          <Col key={format.id} md={4} xs={6}>
            <ShowsCounterItem key={format.id} format={format} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
