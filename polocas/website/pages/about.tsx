import React from 'react'

import { gql } from '@apollo/client'
import { CommonLayout, ContentContainer } from '../components/layout'
import { compose, withQueryset } from '@polocas/ui/decorators'
import { GroupDescription } from '../components/about'
import { AnchoredArticle } from '../components/articles'
import { ProfileGroupList } from '../components/profiles'
import { ShowsCounter } from '../components/shows/ShowsCounter'
import { Title } from '../components/meta'
import { withPageProps } from '../pages'
import { withTranslation } from '@polocas/ui/i18n'
import { profileGroupListQuery, showCountQuery } from '../graphql'

export const getServerSideProps = compose(
  withPageProps,
  withQueryset({
    profileGroups: {
      query: gql(profileGroupListQuery),
    },
    showCount: {
      query: gql(showCountQuery),
    },
  }),
  (props) => props,
)

export default withTranslation(({ profileGroupList, showTypeList, t }) => (
  <CommonLayout>
    <Title text={t('about')} />
    <ContentContainer>
      <GroupDescription />
    </ContentContainer>
    <ProfileGroupList groups={profileGroupList} />
    <ContentContainer>
      <ShowsCounter showTypes={showTypeList} />
    </ContentContainer>
    <AnchoredArticle variables={{ siteAnchor: 'history' }} />
  </CommonLayout>
))
