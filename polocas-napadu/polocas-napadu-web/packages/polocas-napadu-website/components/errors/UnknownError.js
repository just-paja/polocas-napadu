import React from 'react'

import { ArrayList } from '../text'
import { withNamespaces } from '../../lib/i18n'

export const UnknownError = withNamespaces(['error'])(
  ({ t }) => (
    <div>
      <h1>{t('error-unknown')}</h1>
      <p>{t('error-unknown-explanation-text')}</p>
      <ArrayList text={t('error-unknown-help-text', { returnObjects: true }) || []} />
    </div>
  )
)
