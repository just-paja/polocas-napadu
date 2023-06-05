import type { Show } from '@polocas/ui'

import React from 'react'
import styles from './ShowList.module.scss'

import { gql } from '@apollo/client'
import { Heading, Main, Section } from '@polocas/ui/content'
import { Link } from 'react-router-dom'
import { ShowStart, ShowLocation, ShowFormat } from '@polocas/ui/shows'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'

const GET_SHOWS = gql`
  query ShowList {
    showList(future: true, useInspirations: true) {
      id
      name
      start
      end
      showType {
        name
        slug
      }
      location {
        name
      }
    }
  }
`

export function ShowList() {
  const params = useParams()
  const { t } = useTranslation()
  const { data, error, loading } = useQuery(GET_SHOWS, {
    pollInterval: 500,
    variables: params,
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error!</div>
  }
  const { showList } = data
  return (
    <Main>
      <div>
        <Heading>{t('inspireShow')}</Heading>
        <ul className={styles.showList}>
          {showList.map((show: Show) => (
            <Section key={show.id} component='li'>
              <Heading>
                <Link to={`/${show.id}`}>{show.name}</Link>
              </Heading>
              <div>
                <ShowStart show={show} />
              </div>
              <div>
                <ShowLocation show={show} />
              </div>
              <div>
                <ShowFormat show={show} />
              </div>
            </Section>
          ))}
        </ul>
      </div>
    </Main>
  )
}
