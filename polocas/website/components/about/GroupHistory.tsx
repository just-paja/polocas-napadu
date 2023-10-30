import { ContentContainer } from '../layout/ContentContainer'
import { Markdown } from '@polocas/ui/text'
import { useI18n } from '@polocas/next/i18n'

export function GroupHistory() {
  const { t } = useI18n()
  return (
    <section>
      <ContentContainer>
        <h1>{t('group-history-heading')}</h1>
        <Markdown source={t('group-history-perex')} />
      </ContentContainer>
    </section>
  )
}
