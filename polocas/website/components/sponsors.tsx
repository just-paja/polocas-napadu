import React from 'react'
import styles from './sponsors.module.scss'

import { Image } from './images'
import { openExternalUrl } from './links'
import { useSponsors } from '@polocas-napadu/core/context'
import { useI18n } from '@polocas/next/i18n'

const SiteSponsorLogo = ({ sponsor }) => (
  <Image
    className={styles.logo}
    component='a'
    href={sponsor.website}
    image={sponsor.logo}
    onClick={openExternalUrl}
    title={sponsor.name}
    size='avatar'
  />
)

export function SiteSponsors() {
  const { t } = useI18n()
  const sponsors = useSponsors()
  if (!sponsors.length) {
    return null
  }

  return (
    <div className={styles.sponsors}>
      <h4 className='text-center'>
        <strong>{t('coopWith')}</strong>
      </h4>
      <div className='d-flex justify-content-center'>
        {sponsors.map((sponsor) => (
          <SiteSponsorLogo key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </div>
  )
}
