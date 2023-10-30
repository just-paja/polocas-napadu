import styles from './Footer.module.scss'

import { ContentContainer } from './ContentContainer'
import { LanguageSwitcher } from '../i18n'
import { SiteSponsors } from '../sponsors'
import { SocialNetworks } from '../social'
import { useI18n } from '@polocas/next/i18n'

export function Footer({ sponsors }) {
  const { t } = useI18n()
  return (
    <>
      <SiteSponsors sponsors={sponsors} />
      <footer className={styles.footer}>
        <ContentContainer>
          <div className='text-center'>
            <LanguageSwitcher />
          </div>
          <SocialNetworks className={styles.social} inverse />
          <p className={styles.copyrightNotice}>{t('copyrightNotice')}</p>
        </ContentContainer>
      </footer>
    </>
  )
}
