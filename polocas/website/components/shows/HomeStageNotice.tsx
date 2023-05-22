import React from 'react'

import { Section, Heading } from '@polocas/ui/content'
import { withTranslation } from '@polocas/ui/i18n'

function formatPlace(place) {
  return place.location.name
}

export const HomeStageNotice = withTranslation(({ usualPlaces, t }) => {
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
})
