import classnames from 'classnames'
import Col from 'react-bootstrap/Col'
import styles from './ShowListItem.module.scss'

import { Link } from '../links'
import { EventLocation, EventStart } from '@polocas/ui/events'

export function ShowListItem({ show }) {
  const isFuture = false
  return (
    <Col md={6} lg={3} className={styles.col}>
      <Link
        route="showDetail"
        params={{ slug: show.slug }}
        className={classnames(styles.host, { [styles.future]: isFuture })}
      >
        <div>{show.showType && show.showType.name}</div>
        <div>
          <EventStart start={show.start} />
        </div>
        <div>{show.location && <EventLocation location={show.location} />}</div>
      </Link>
    </Col>
  )
}
