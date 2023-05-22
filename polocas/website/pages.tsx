import getConfig from 'next/config'

import { apolloClient } from '@polocas/next'
import { gql } from '@apollo/client'
import { mergeQueryResults, stripData } from '@polocas/ui/apollo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations.js'
import { sponsorsQuery } from './graphql'

const { publicRuntimeConfig } = getConfig()

const origin = `https://${publicRuntimeConfig.baseDomain}`
const defaultLang = publicRuntimeConfig.defaultLang
const determineLocale = locale =>
  !locale || locale === 'default' ? defaultLang : locale

const getSponsors = async () =>
  stripData(await apolloClient.query({ query: gql(sponsorsQuery) }))

export const withPageProps = fn => async props => {
  const locale = determineLocale(props.locale)
  return fn({
    ...props,
    props: {
      ...props.props,
      origin,
      baseUrl: `${origin}/${locale}`,
      lang: locale,
      ...mergeQueryResults(
        await Promise.all([getSponsors(), serverSideTranslations(locale)])
      ),
    },
  })
}
