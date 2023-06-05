import React from 'react'

import { gql } from '@apollo/client'
import { CommonLayout, ContentContainer } from '../components/layout'
import { Title } from '../components/meta'
import { OgImage } from '../components/opengraph'
import { ShowFormatGallery } from '../components/shows/ShowFormatGallery'
import { Heading, Section } from '@polocas/ui/content'
import { useTranslation } from 'next-i18next'
import { withPageProps } from '../pages'
import { compose, withQueryset } from '@polocas/ui/decorators'
import { showFormatListQuery } from '../graphql'

export const getServerSideProps = compose(
  withPageProps,
  withQueryset({
    showFormats: {
      query: gql(showFormatListQuery),
    },
  }),
  (props) => props,
)

export default function RepertoirPage({ showTypeList }) {
  const { t } = useTranslation()
  return (
    <CommonLayout>
      <Section>
        <ContentContainer>
          <Title
            text={t('repertoir')}
            description={t('repertoirOgDescription')}
          />
          <OgImage src='/static/pixmaps/og-show-list.jpg' />
          <Heading>{t('repertoir')}</Heading>
        </ContentContainer>
        <ShowFormatGallery showFormats={showTypeList} />
      </Section>
    </CommonLayout>
  )
}
