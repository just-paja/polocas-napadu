import Col from 'react-bootstrap/Col'
import React from 'react'
import Row from 'react-bootstrap/Row'

import { BriefShowListItem } from './BriefShowListItem'
import { ContentContainer } from '../layout/ContentContainer'
import { Gallery } from '../images'
import { Link } from '../links'
import { List } from '../layout/List'
import { Markdown } from '../markdown'
import { Title } from '../meta'
import { withTranslation } from '@polocas/ui/i18n'

export const ShowFormatDetail = withTranslation(({ showList, showType, t }) => {
  return (
    <ContentContainer>
      <Title text={showType.name} />
      <h1>{showType.name}</h1>
      <Row>
        <Col lg={8}>
          <Markdown className="lead" source={showType.shortDescription} />
          <Markdown source={showType.description} />
          {showType.useGames || showType.useFouls ? (
            <>
              <h2>{t('articleLinks')}</h2>
              <ul>
                {showType.useGames && (
                  <li>
                    <Link route="gameList">{t('gameList')}</Link>
                  </li>
                )}
                {showType.useFouls && (
                  <li>
                    <Link route="foulTypeList">{t('foulTypes')}</Link>
                  </li>
                )}
              </ul>
            </>
          ) : null}
        </Col>
        <Col lg={4}>
          <List>
            {showList.map(show => (
              <BriefShowListItem key={show.id} show={show} />
            ))}
          </List>
        </Col>
      </Row>
      <Gallery photos={showType.photos} />
    </ContentContainer>
  )
})
