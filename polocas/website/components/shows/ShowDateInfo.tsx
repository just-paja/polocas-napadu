import React from 'react'
import styles from './ShowDateInfo.module.scss'

import { AddToCalendar } from '../ics'
import { EventStart } from '@polocas/ui/events'
import { ExternalLink } from '@polocas/ui/links'
import { Heading } from '@polocas/ui/content'
import { LogisticInfo } from './LogisticInfo'
import { LogisticsIcon, FacebookIcon } from '@polocas/ui/icons'
import { useI18n } from '@polocas/next/i18n'

export function ShowDateInfo({ show }) {
  const { t } = useI18n()
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
}
