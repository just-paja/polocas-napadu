import Breadcrumb from 'react-bootstrap/Breadcrumb'
import classnames from 'classnames'
import Markdown from 'react-markdown'
import React from 'react'
import styles from './Profile.module.scss'

import { ContentContainer } from '../layout/ContentContainer'
import { formatName } from './names'
import { Gallery } from '../images'
import { Link } from '../links'
import { PageHeading } from '../layout/PageHeading'
import { ProfileListItem } from './ProfileList'
import { Title } from '../meta'
import { useI18n } from '@polocas/next/i18n'

export function ProfileComponent({ data }) {
  const { t } = useI18n()
  const { profile } = data
  const profileName = formatName(profile)
  return (
    <>
      <PageHeading>
        <ProfileListItem className={styles.bubble} dark profile={profile} />
        <h1 className={styles.heading}>{profileName}</h1>
        <Title text={profileName} />
      </PageHeading>
      <ContentContainer className={classnames(styles.center, styles.column)}>
        <Breadcrumb>
          <Link route='about' passHref>
            <Breadcrumb.Item href=''>{t('about')}</Breadcrumb.Item>
          </Link>
          <Link route='members' passHref>
            <Breadcrumb.Item href=''>{t('members')}</Breadcrumb.Item>
          </Link>
          <Link route='profile' params={{ slug: profile.slug }}>
            <Breadcrumb.Item href=''>{profileName}</Breadcrumb.Item>
          </Link>
        </Breadcrumb>
        <Markdown source={profile.about} />
        <Gallery photos={profile.photos} />
      </ContentContainer>
    </>
  )
}
