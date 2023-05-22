import React from 'react'
import styles from './ShowDateInfo.module.scss'

import { AddToCalendar } from '../ics'
import { EventStart } from '@polocas/ui/events'
import { ExternalLink } from '../links'
import { Heading } from '@polocas/ui/content'
import { LogisticInfo } from './LogisticInfo'
import { withTranslation } from '@polocas/ui/i18n'
import { LogisticsIcon, FacebookIcon } from '@polocas/ui/icons'

export const ShowDateInfo = withTranslation(({ show, t }) => {
  return (
    <LogisticInfo
      icon={LogisticsIcon}
      summary={
        <Heading>
          <EventStart end={show.end} start={show.start} />
        </Heading>
      }
    >
      <div>
        <ExternalLink href={show.linkFacebook} icon={FacebookIcon}>
          {t('eventOnFacebook')}
        </ExternalLink>
      </div>
      <div>
        <AddToCalendar className={styles.addToCalendar} event={show} />
      </div>
    </LogisticInfo>
  )
})
