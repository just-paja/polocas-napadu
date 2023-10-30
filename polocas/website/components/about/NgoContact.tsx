import styles from './NgoContact.module.scss'

import { Heading, Section } from '@polocas/ui/content'
import { Markdown } from '@polocas/ui/text'
import { useI18n } from '@polocas/next/i18n'

const ListItem = ({ label, value }) => (
  <li>
    <div className={styles.label}>{label}:</div>{' '}
    <div className={styles.value}>{value}</div>
  </li>
)

export function NgoContact() {
  const { t } = useI18n()
  return (
    <Section className={styles.ngo}>
      <Heading>{t('ngoContact')}</Heading>
      <Markdown source={t('ngoContactText')} />
      <ul className={styles.details}>
        <ListItem label={t('identificationNumberCz')} value='05758661' />
        <ListItem label={t('bankAccountCz')} value='2501561542/2010' />
        <ListItem label={t('iban')} value='CZ0920100000002501561542' />
        <ListItem label={t('swift')} value='FIOBCZPPXXX' />
        <ListItem label={t('dataPostBox')} value='epwghq9' />
      </ul>
    </Section>
  )
}
