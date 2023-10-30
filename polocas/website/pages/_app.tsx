import React from 'react'

import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@polocas/next'
import { appWithTranslation } from 'next-i18next'
import { MetaBase, MetaPage } from '../components/meta'
import { PageContext } from '@polocas/core/context'
import { Tracking } from '../components/tracking'

import './_app.scss'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <PageContext.Provider value={pageProps}>
        <Tracking />
        <MetaBase />
        <MetaPage title='Fantasion' />
        <Component {...pageProps} />
      </PageContext.Provider>
    </ApolloProvider>
  )
}

export default appWithTranslation(MyApp)
