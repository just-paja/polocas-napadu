import React from 'react'

import { Section, Heading } from '@polocas/ui/content'
import { useI18n } from '@polocas/next/i18n'

function formatPlace(place) {
  return place.location.name
}

export function HomeStageNotice({ usualPlaces }) {
  const { t } = useI18n()
  if (!usualPlaces.length) {
    return null
  }

  return (
    <Section>
      <Heading>{t('home-stage')}</Heading>
      <p>
        {t('usualHomeStages', {
          places: usualPlaces.map(formatPlace).join(','),
        })}
      </p>
    </Section>
  )
}
