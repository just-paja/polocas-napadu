import Head from 'next/head'
import React from 'react'

export const Favicon = () => (
  <Head>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/static/favicon/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/static/favicon/safari-pinned-tab.svg"
      color="#007120"
    />
    <meta name="msapplication-TileColor" content="#007120" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
)
