import React from 'react'

import { Address } from '../locations/Address'
import { EventLocation } from '@polocas/ui/events'
import { ExternalLink } from '../links'
import { Heading } from '@polocas/ui/content'
import { LocationIcon } from '@polocas/ui/icons'
import { LogisticInfo } from './LogisticInfo'
import { withTranslation } from '@polocas/ui/i18n'

export const ShowVenueInfo = withTranslation(({ show, t }) => (
  <LogisticInfo
    icon={LocationIcon}
    summary={
      <Heading>
        <EventLocation location={show.location} />
      </Heading>
    }
  >
    <Address address={show.location.address} city={show.location.city} />
    <ExternalLink
      href={`https://www.google.com/maps/dir/?api=1&destination=${show.location.address}`}
    >
      {t('howDoIGetThere')}
    </ExternalLink>
  </LogisticInfo>
))
