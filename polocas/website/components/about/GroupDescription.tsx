import { Markdown } from '@polocas/ui/text'
import { useI18n } from '@polocas/next/i18n'

export function GroupDescription() {
  const { t } = useI18n()
  return (
    <section>
      <h1>{t('groupDescriptionHeading')}</h1>
      <Markdown source={t('groupDescriptionPerex')} />
    </section>
  )
}
