import Alert from 'react-bootstrap/Alert'
import React from 'react'

import { useI18n } from '@polocas/next/i18n'

export function NoFutureShows() {
  const { t } = useI18n()
  return <Alert variant='light'>{t('noShowsPlanned')}</Alert>
}
