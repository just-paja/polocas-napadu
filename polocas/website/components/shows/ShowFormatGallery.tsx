import classnames from 'classnames'
import Col from 'react-bootstrap/Col'
import React from 'react'
import Row from 'react-bootstrap/Row'
import styles from './ShowFormatGallery.module.scss'

import { Heading, Section } from '@polocas/ui/content'
import { List } from '../layout/List'
import { Markdown } from '../markdown'
import { ContentContainer } from '../layout/ContentContainer'
import { Link } from '../links'

const ShowFormatGalleryItem = ({ reverse, showFormat }) => (
  <Section component='article' className={styles.format}>
    <Row className={classnames({ 'flex-row-reverse': reverse })}>
      <Col
        md={6}
        className='d-flex flex-column align-items-center justify-content-center'
      >
        <div className={styles.formatDescription}>
          <Heading>
            <Link route='showFormatDetail' params={{ slug: showFormat.slug }}>
              {showFormat.name}
            </Link>
          </Heading>
          <Markdown source={showFormat.shortDescription} />
        </div>
      </Col>
      <Col md={6}>
        <Link route='showFormatDetail' params={{ slug: showFormat.slug }}>
          {showFormat.photos.length ? (
            <img src={showFormat.photos[0].image.src} />
          ) : null}
        </Link>
      </Col>
    </Row>
  </Section>
)

const reversePattern = 2

export const ShowFormatGallery = ({ showFormats }) => {
  if (!showFormats.length) {
    return null
  }
  return (
    <List>
      <ContentContainer fluid>
        {showFormats.map((showFormat, index) => (
          <div key={showFormat.id}>
            <ShowFormatGalleryItem
              showFormat={showFormat}
              reverse={index % reversePattern}
            />
          </div>
        ))}
      </ContentContainer>
    </List>
  )
}
