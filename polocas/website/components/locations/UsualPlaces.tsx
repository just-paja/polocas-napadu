import React, { FC } from 'react'

import { UsualPlace } from '@polocas/core/constants'
import { Heading, Section } from '@polocas/ui/content'
import { LocationAddress } from './LocationAddress'
import { Markdown } from '@polocas/ui/text'
import { useI18n } from '@polocas/next/i18n'

interface UsualPlaceProps {
  place: UsualPlace
}

const UsualPlaceSection: FC<UsualPlaceProps> = ({ place }) => (
  <Section>
    <Heading>{place.name}</Heading>
    <Markdown source={place.description} />
    <LocationAddress location={place.location} />
  </Section>
)

interface UsualPlacesProps {
  places: UsualPlace[]
}

export function UsualPlaces({ places }: UsualPlacesProps) {
  const { t } = useI18n()
  return (
    <Section>
      <p>{t('usualPlacesFlavourText')}</p>
      {places.map((place) => (
        <UsualPlaceSection key={place.id} place={place} />
      ))}
    </Section>
  )
}
