import { ArrayList } from './text.js'
import { useI18n } from './i18n.js'

export const AppError = () => <div>Application failed with Error!</div>

export function NotFound() {
  const { t } = useI18n()
  return (
    <div>
      <h1>{t('error-not-found')}</h1>
      <p>{t('error-not-found-explanation-text')}</p>
      <ArrayList
        text={t('error-not-found-help-text', { returnObjects: true }) || []}
      />
    </div>
  )
}

export function UnknownError() {
  const { t } = useI18n()
  return (
    <div>
      <h1>{t('error-unknown')}</h1>
      <p>{t('error-unknown-explanation-text')}</p>
      <ArrayList
        text={t('error-unknown-help-text', { returnObjects: true }) || []}
      />
    </div>
  )
}
