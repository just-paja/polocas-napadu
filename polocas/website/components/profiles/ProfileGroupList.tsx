import React from 'react'
import styles from './ProfileGroupList.module.scss'

import { ContentContainer } from '../layout/ContentContainer'
import { ProfileList } from './ProfileList'
import { withTranslation } from '@polocas/ui/i18n'

export const ProfileGroupList = withTranslation(({ groups, t }) => (
  <section className={styles.block} id={t('membersAnchor')}>
    <ContentContainer className={styles.container}>
      <h2 className={styles.heading}>{t('members')}</h2>
      <div className={styles.list}>
        {groups.map(group => (
          <ProfileList key={group.id} group={group} />
        ))}
      </div>
    </ContentContainer>
  </section>
))
