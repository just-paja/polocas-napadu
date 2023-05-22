import { BannerCarousel } from './BannerCarousel'
import { Bulb } from '../logo'
import { ContentContainer } from '../layout/ContentContainer'
import { withTranslation } from '@polocas/ui/i18n'

import styles from './HomeBanner.module.scss'

export const HomeBanner = withTranslation(({ t }) => {
  return (
    <header className={styles.banner}>
      <BannerCarousel className={styles.carousel} />
      <div className={styles.content}>
        <ContentContainer className={styles.container}>
          <div className={styles.circle}>
            <Bulb />
          </div>
          <Bulb className={styles.bulb2} color="inverse" />

          <div className={styles.text}>
            <h1>{t('projectName')}</h1>
            <p className="lead">{t('projectNameAppendix')}</p>
          </div>
        </ContentContainer>
      </div>
    </header>
  )
})
