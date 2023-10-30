import Col from 'react-bootstrap/Col'
import React from 'react'
import Row from 'react-bootstrap/Row'
import styles from './home.module.scss'

import { BriefFutureShowList } from '../components/shows/BriefFutureShowList'
import { ContentContainer, Footer, MainMenu } from '../components/layout'
import { HomeBanner } from '../components/about'
import { OgImage } from '../components/opengraph'
import { Title } from '../components/meta'
import { compose } from '@polocas/ui/decorators'
import { useI18n, withQueryset } from '@polocas/next'
import { withPageProps } from '../pages'
import { showListQuery, showPhotosQuery } from '../graphql'
import { gql } from '@apollo/client'

export const getServerSideProps = compose(
  withPageProps,
  withQueryset({
    showPhotos: { query: gql(showPhotosQuery) },
    shows: { query: gql(showListQuery), variables: { future: true } },
  }),
  (props) => props,
)

export default function Home({ showList }) {
  const { t } = useI18n()
  return (
    <>
      <Title
        text={`${t('projectName')} - ${t('projectNameAppendix')}`}
        description={t('projectAbout')}
        pure
      />
      <OgImage src='/static/pixmaps/og-main.jpg' />
      <MainMenu />
      <HomeBanner />
      <ContentContainer className={styles.content}>
        <Row>
          <Col>
            <h2>{t('upcomingShows')}</h2>
            <BriefFutureShowList shows={showList} />
          </Col>
        </Row>
      </ContentContainer>
      <Footer sponsors={[]} />
    </>
  )
}
