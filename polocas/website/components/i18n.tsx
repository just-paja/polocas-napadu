import styles from './i18n.module.scss'

import { OptionalLink } from './links'
import { useI18n } from '@polocas/next/i18n'

const renderLink = (t, lngCurrent, lngChoice) => {
  return (
    <OptionalLink
      className={styles.link}
      fallbackComponent='span'
      isLink={lngChoice === lngCurrent ? 'span' : 'a'}
      key={lngChoice}
      language={lngChoice}
      route='home'
    >
      {t(`language-${lngChoice}`)}
    </OptionalLink>
  )
}

export function LanguageSwitcher({ lng }) {
  const { ready, i18n, t } = useI18n()
  const { language, options } = i18n
  const languages = options?.locales || []
  return (
    <div>
      {languages
        .filter((item) => item !== 'default')
        .reduce((acc, lngChoice, index, src) => {
          const next = [...acc, renderLink(t, language, lngChoice)]
          if (index < src.length - 1) {
            next.push(' | ')
          }
          return next
        }, [])}
    </div>
  )
}
