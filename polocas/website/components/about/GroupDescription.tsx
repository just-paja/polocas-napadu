import Markdown from 'react-markdown'

import { withTranslation } from '@polocas/ui/i18n'

export const GroupDescription = withTranslation(({ t }) => (
  <section>
    <h1>{t('groupDescriptionHeading')}</h1>
    <Markdown source={t('groupDescriptionPerex')} />
  </section>
))
