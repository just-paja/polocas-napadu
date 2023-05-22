import Markdown from 'react-markdown'

import { Heading, Section } from '@polocas/ui/content'
import { ContentContainer } from '../layout/ContentContainer'
import { withTranslation } from '@polocas/ui/i18n'

export const GroupHistoryBanner = withTranslation(({ t }) => (
  <ContentContainer column as={Section}>
    <Heading>{t('groupHistoryHeading')}</Heading>
    <Markdown source={t('groupHistoryPerex')} />
  </ContentContainer>
))
