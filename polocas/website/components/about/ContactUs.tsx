import React from 'react'
import styles from './ContactUs.module.scss'

import { Markdown } from '../markdown'
import { SocialNetworks } from '../social'
import { withTranslation } from '@polocas/ui/i18n'

export const ContactUs = withTranslation(({ t }) => (
  <>
    <Markdown source={t('contactText')} />
    <SocialNetworks className={styles.networks} vertical />
  </>
))
