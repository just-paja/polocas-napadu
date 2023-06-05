import Col from 'react-bootstrap/Col'
import moment from 'moment'
import React from 'react'
import Row from 'react-bootstrap/Row'
import styles from './showList.module.scss'

import { AboutImprovLarge } from '../components/about/AboutImprov'
import { gql } from '@apollo/client'
import { CommonLayout, ContentContainer } from '../components/layout'
import { Title } from '../components/meta'
import { HomeStageNotice } from '../components/shows/HomeStageNotice'
import { MonthShowList } from '../components/shows/MonthShowList'
import { OgImage } from '../components/opengraph'
import { showListQuery, usualPlacesQuery } from '../graphql'
import { withTranslation } from '@polocas/ui/i18n'
import { compose, withQueryset } from '@polocas/ui/decorators'
import { withPageProps } from '../pages'
import { Heading, Main } from '@polocas/ui/content'
import { EventFilter } from '../components/events'

const withSelectedMonth = (fn) => (props) => {
  const { month } = props.query
  return fn({
    props: {
      ...props.props,
      month: month || moment().format('YYYY-MM'),
    },
  })
}

export const getServerSideProps = compose(
  withPageProps,
  withSelectedMonth,
  withQueryset({
    shows: (props) => ({
      query: gql(showListQuery),
      variables: {
        month: props.props.month,
      },
    }),
    usualPlaces: { query: gql(usualPlacesQuery) },
  }),
  (props) => props,
)

export default compose(
  withTranslation,
  ({ month, showList, usualPlaceList, t }) => {
    return (
      <CommonLayout>
        <Title text={t('shows')} description={t('showsInvite')} />
        <OgImage src='/static/pixmaps/og-show-list.jpg' />
        <ContentContainer>
          <Main className={styles.list}>
            <Heading>{t('shows')}</Heading>
            <Row>
              <Col md={12} lg={7}>
                <EventFilter values={{ month }} />
                <MonthShowList shows={showList} />
                <HomeStageNotice usualPlaces={usualPlaceList} />
              </Col>
              <Col md={12} lg={5}>
                <AboutImprovLarge />
              </Col>
            </Row>
          </Main>
        </ContentContainer>
      </CommonLayout>
    )
  },
)
