import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styles from './[slug].module.scss'

import { Button } from '@polocas/ui/Button'
import { compose, withQueryset } from '@polocas/ui/decorators'
import { Gallery } from '../../components/images'
import { gql } from '@apollo/client'
import { Heading, Section } from '@polocas/ui/content'
import { isVisible } from '@polocas-napadu/core/visibility'
import { Link } from '../../components/links'
import { Markdown } from '../../components/markdown'
import { MatchProgress } from '../../components/shows//MatchProgress'
import { OgEvent } from '../../components/opengraph'
import { LogisticInfo } from '../../components/shows/LogisticInfo'
import { Price } from '@polocas/ui/prices'
import { ShowDateInfo } from '../../components/shows/ShowDateInfo'
import { ShowParticipants } from '../../components/shows/ShowParticipants'
import { showQuery } from '../../graphql'
import { ShowVenueInfo } from '../../components/shows/ShowVenueInfo'
import { TicketsIcon } from '@polocas/ui/icons'
import { Title } from '../../components/meta'
import { withPageProps } from '../../pages'
import { withTranslation } from '@polocas/ui/i18n'
import {
  CommonLayout,
  ContentContainer,
  PageHeading,
} from '../../components/layout'

function LinkButton({ href, label, ...props }) {
  if (!href) {
    return null
  }
  return (
    <Button className={styles.ticketsButton} href={href} {...props}>
      {label}
    </Button>
  )
}

const EventDetailHeading = ({ event }) => {
  const photo = event.showType.photos[0]
  return (
    <PageHeading backgroundImage={photo?.image}>
      <Heading>{event.name}</Heading>
      <Title text={event.name} description={event.description} />
      <OgEvent event={event} />
    </PageHeading>
  )
}

const EventDetailDescription = ({ event }) => (
  <Markdown className='lead' source={event.description} />
)

const ShowDetailDescription = ({ show }) => (
  <>
    <EventDetailDescription event={show} />
    <Markdown
      className={show.description ? null : 'lead'}
      source={show.showType.shortDescription}
    />
  </>
)

const ShowDetailTypeLink = withTranslation(({ showType, t }) => {
  console.log(showType)
  if (isVisible(showType)) {
    return (
      <Link route='showFormatDetail' params={{ slug: showType.slug }}>
        {t('moreAboutFormat', { formatName: showType.name })}
      </Link>
    )
  }
  return null
})

const ShowDetailEmailReservations = withTranslation(({ show, t }) => {
  if (show.emailReservations) {
    return (
      <p>
        {t('reserveSeatsEmail')}:{' '}
        <Link href={`mailto:${show.emailReservations}`}>
          {show.emailReservations}
        </Link>
      </p>
    )
  }
  return null
})

const ShowDetailMatchReport = withTranslation(({ match, t }) => {
  if (match) {
    return (
      <Col as={Section} lg={6}>
        <h2>{t('matchProgress')}</h2>
        <MatchProgress closed={match.closed} matchId={match.id} />
      </Col>
    )
  }
  return null
})

const ShowDetailParticipants = withTranslation(({ participants, t }) => (
  <Col as={Section} lg={6}>
    <Heading>{t('showParticipants')}</Heading>
    <ShowParticipants participants={participants} />
  </Col>
))

export const getServerSideProps = compose(
  withPageProps,
  withQueryset({
    show: { query: gql(showQuery) },
  }),
  (props) => props,
)

const TicketPrice = ({ price }) => (
  <div key={price.id}>
    {price.priceLevel.name}:{' '}
    <Price key={price.id} amount={price.amount} currency={price.currency} />
  </div>
)

const EventPrices = withTranslation(({ event, prices, t }) => (
  <LogisticInfo
    icon={TicketsIcon}
    summary={<Heading>{t('ticket-links')}</Heading>}
  >
    <div>
      {prices.map((price) => (
        <TicketPrice price={price} key={price.id} />
      ))}
    </div>
    <div className='d-flex flex-wrap'>
      <LinkButton
        href={event.linkTickets}
        label={t('buyTickets')}
        icon={<TicketsIcon />}
        variant='primary'
        size='lg'
        className='mt-2 me-2 flex-grow-1'
      />
      <LinkButton
        href={event.linkReservations}
        label={t('reserveSeats')}
        icon={<TicketsIcon />}
        variant={event.linkTickets ? 'secondary' : 'primary'}
        size='lg'
        className='mt-2 me-2 flex-grow-1'
      />
    </div>
  </LogisticInfo>
))

const InfoCol = ({ children, ...props }) => (
  <Col className={styles.logisticsItem} md={6} lg={6} xl={5} {...props}>
    {children}
  </Col>
)

const ShowInfo = ({ show }) => (
  <Row className={styles.logistics}>
    <InfoCol>
      <ShowDateInfo show={show} />
    </InfoCol>
    <InfoCol>
      <ShowVenueInfo show={show} />
    </InfoCol>
    {show.ticketPrices.length !== 0 && (
      <InfoCol md={8} lg={7}>
        <EventPrices event={show} prices={show.ticketPrices} />
      </InfoCol>
    )}
  </Row>
)

export default function ShowDetail({ show }) {
  return (
    <CommonLayout>
      <Section as='article'>
        <EventDetailHeading event={show} />
        <ContentContainer>
          <ShowInfo show={show} />
          <div className={styles.description}>
            <div>
              <ShowDetailDescription show={show} />
              <ShowDetailEmailReservations show={show} />
              <ShowDetailTypeLink showType={show.showType} />
            </div>
          </div>
          <Row className='justify-content-center'>
            <ShowDetailMatchReport match={show.match} />
            <ShowDetailParticipants participants={show.participants} />
          </Row>
        </ContentContainer>
        <Gallery photos={show.photos} free />
      </Section>
    </CommonLayout>
  )
}
