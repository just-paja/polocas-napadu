import { Heading, Section } from '@polocas/ui/content'
import { ContentContainer } from '../layout/ContentContainer'
import { Markdown } from '@polocas/ui/text'
import { useI18n } from '@polocas/next/i18n'

export function GroupHistoryBanner() {
  const { t } = useI18n()
  return (
    <ContentContainer column as={Section}>
      <Heading>{t('groupHistoryHeading')}</Heading>
      <Markdown source={t('groupHistoryPerex')} />
    </ContentContainer>
  )
}
