import type { FC } from 'react'
import type { QueryOptions } from '@apollo/client'

import getConfig from "next/config.js"

import { ApolloClient, InMemoryCache } from "@apollo/client"
import { mergeQueryResults, stripData } from "@polocas/ui/apollo"

const { publicRuntimeConfig } = getConfig()
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
type Query = Function | QueryProps

const getQuery = (props: Props, query: Query): Promise<any> => {
	if (query instanceof Function) {
		return getQuery(props, query(props))
	}
	return apolloClient.query({
		...query,
		variables: {
			...query.variables,
			...props.params,
		},
	} as QueryOptions<any, any>)
}

const resolveQuery = (props: Props) => (query: Query) => getQuery(props, query)

export const withQueryset = (queryMap: Query[]) => (fn: FC) => async (props: Props) => {
	const data = await Promise.all(
		Object.values(queryMap).map(resolveQuery(props)),
	)
	return fn({
		props: {
			...props.props,
			...mergeQueryResults(data.map(stripData)),
		},
	})
}
