import React from 'react'

import { AppError } from './AppError'
import { gql, useQuery } from '@apollo/client'
import { Heading, Main } from '@polocas-napadu/ui/content'
import { InsertInspiration } from './InsertInspiration'
import { NotFound } from './NotFound'
import { ShowContext } from '@polocas-napadu/core/context'
import { useParams } from 'react-router'

import styles from './ShowInspirations.module.scss'

const GET_SHOW = gql`
  query ShowInfo($showId: Int!) {
    show(showId: $showId, useInspirations: true) {
      id
      name
      start
      end
      totalInspirations
    }
  }
`

export const ShowInspirations = () => {
  const { showId } = useParams()
  const { loading, data, error } = useQuery(GET_SHOW, {
    variables: { showId },
    pollInterval: 5000,
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <AppError error={error} />
  }
  if (!data.show) {
    return <NotFound />
  }
  return (
    <ShowContext.Provider value={data.show}>
      <Main className={styles.main}>
        <Heading>{data.show.name}</Heading>
        <div className={styles.layout}>
          <InsertInspiration show={data.show} />
          <p>Celkem jste nás inspirovali {data.show.totalInspirations}x</p>
        </div>
      </Main>
    </ShowContext.Provider>
  )
}
