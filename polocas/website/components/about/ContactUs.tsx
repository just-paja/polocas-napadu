import styles from './ContactUs.module.scss'

import { Markdown } from '@polocas/ui/text'
import { SocialNetworks } from '../social'
import { useI18n } from '@polocas/next/i18n'

export function ContactUs() {
  const { t } = useI18n()
  return (
    <>
      <Markdown source={t('contactText')} />
      <SocialNetworks className={styles.networks} vertical />
    </>
  )
}
