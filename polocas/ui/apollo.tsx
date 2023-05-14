import qs from "query-string"
import React from "react"

import type { ComponentType } from 'react'
import type { DocumentNode } from '@apollo/client'

import { useParams } from "react-router"
import { setContext } from "@apollo/client/link/context"
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
	useQuery,
} from "@apollo/client"

interface Strippable {
	data: any
}

export const stripData = ({ data }: Strippable) => data
export const mergeQueryResults = (results: object[]) =>
	results.reduce((aggr: object, chunk: object) => Object.assign(aggr, chunk), {})

interface ApolloProps {
	apiUrl?: string
	children: React.ReactNode
}

interface Headers {
	[key: string]: string
}

export const Apollo: React.FC<ApolloProps> = ({ apiUrl, children }) => {
	const params = qs.parse(document.location.search)
	if ("authToken" in params) {
		sessionStorage.setItem("authToken", String(params.token))
	}
	if ("apiUrl" in params) {
		sessionStorage.setItem("apiUrl", String(params.apiUrl))
		document.location.search = ""
	}

	const sessionApiUrl = sessionStorage.getItem("apiUrl")
	const sessionAuthToken = sessionStorage.getItem("authToken")
	const httpLink = createHttpLink({
		uri: sessionApiUrl || apiUrl || process.env.apiUrl,
	})
	const authLink = setContext((_any: any, { headers }: { headers?: Headers }) => {
		return {
			headers: {
				...headers,
				authorization: sessionAuthToken ? `JWT ${sessionAuthToken}` : undefined,
			},
		}
	})

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: authLink.concat(httpLink),
	})
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const DEFAULT_POLL_INTERVAL = 500

export const withQuery = (
	Component: ComponentType,
	query: DocumentNode,
	poll: boolean = false
) => {
	if (!Component) {
		throw new Error("You must pass a Component.")
	}

	return (props: any) => {
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
}
