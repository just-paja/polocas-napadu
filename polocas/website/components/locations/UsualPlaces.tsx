import Markdown from 'react-markdown'
import React from 'react'

import { Heading, Section } from '@polocas/ui/content'
import { Location } from './Location'
import { withTranslation } from '@polocas/ui/i18n'

const UsualPlace = ({ place }) => (
  <Section>
    <Heading>{place.name}</Heading>
    <Markdown source={place.description} />
    <Location location={place.location} />
  </Section>
)

export const UsualPlaces = withTranslation(({ places, t }) => (
  <Section>
    <p>{t('usualPlacesFlavourText')}</p>
    {places.map(place => (
      <UsualPlace key={place.id} place={place} />
    ))}
  </Section>
))
