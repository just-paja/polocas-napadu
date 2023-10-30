import type { FC } from 'react'
import type { DocumentNode } from '@apollo/client'

import { useParams } from 'react-router'
import {
  useQuery,
} from '@apollo/client'

interface Strippable {
  data: any
}

export const stripData = ({ data }: Strippable) => data
export const mergeQueryResults = (results: object[]) =>
  results.reduce(
    (aggr: object, chunk: object) => Object.assign(aggr, chunk),
    {},
  )

const DEFAULT_POLL_INTERVAL = 500

export const withQuery =
  (Component: FC, query: DocumentNode, poll: boolean = false) =>
  (props: any) => {
    const params = useParams()
    const { pollInterval, variables } = props
    const { data, error, loading } = useQuery(query, {
      pollInterval: poll ? pollInterval || DEFAULT_POLL_INTERVAL : null,
      variables: {
        ...params,
        ...variables,
      },
    })
    if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>Error!</div>
    }
    return <Component data={data} variables={variables} {...props} />
  }
