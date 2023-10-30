import type { ApolloQueryResult, QueryOptions } from '@apollo/client'

import getConfig from 'next/config.js'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { mergeQueryResults, stripData } from '@polocas/ui/apollo'

export * from './i18n.js'

const { publicRuntimeConfig } = getConfig.default()
const { API_URL } = publicRuntimeConfig

export const apolloClient = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
})

interface QueryVariables {
  [key: string]: string | number
}

interface QueryProps {
  variables?: QueryVariables
  [key: string]: any
}

type Props = any
type QueryCreator = (props: Props) => QueryProps
type Query = QueryCreator | QueryProps

async function getQuery<T>(
  props: Props,
  query: Query,
): Promise<ApolloQueryResult<T>> {
  if (query instanceof Function) {
    return await getQuery(props, query(props))
  }
  return await apolloClient.query({
    ...query,
    variables: {
      ...query.variables,
      ...props.params,
    },
  } as QueryOptions<any, any>)
}

const resolveQuery = (props: Props) => (query: Query) => getQuery(props, query)

export function withQueryset(queryMap: Query[]) {
  return (next: Function) => {
    return async function (props: Props) {
      const data = await Promise.all(
        Object.values(queryMap).map(resolveQuery(props)),
      )
      return next({
        props: {
          ...props.props,
          ...mergeQueryResults(data.map(stripData)),
        },
      })
    }
  }
}
