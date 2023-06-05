import Head from 'next/head'
import Markdown from 'react-markdown'

import { Section, Heading } from '@polocas/ui/content'
import { Title } from '../meta.js'

export const GameDetail = ({ rules }) => (
  <Section>
    <Heading>
      {rules.name}
      <Title text={rules.name} />
      <Head>
        <meta property='og:description' content={rules.description} />
        <meta property='og:type' content='article' />
      </Head>
    </Heading>
    <Markdown source={rules.description} />
  </Section>
)
