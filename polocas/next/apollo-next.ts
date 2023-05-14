import getConfig from "next/config"

import { ApolloClient, InMemoryCache } from "@apollo/client"
import { mergeQueryResults, stripData } from "@polocas/ui/apollo"

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig

export const apolloClient = new ApolloClient({
	uri: API_URL,
	cache: new InMemoryCache(),
})

const getQuery = (props, query) => {
	if (query instanceof Function) {
		return getQuery(props, query(props))
	}
	return apolloClient.query({
		...query,
		variables: {
			...query.variables,
			...props.params,
		},
	})
}

const resolveQuery = (props) => (query) => getQuery(props, query)

export const withQueryset = (queryMap) => (fn) => async (props) => {
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
