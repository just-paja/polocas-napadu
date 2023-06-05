import Head from 'next/head'
import Markdown from 'react-markdown'

import { Section, Heading } from '@polocas/ui/content'
import { Title } from '../meta.js'

export const FoulTypeDetail = ({ foulType }) => (
  <Section>
    <Heading>
      {foulType.name}
      <Title text={foulType.name} />
      <Head>
        <meta property='og:description' content={foulType.description} />
        <meta property='og:type' content='article' />
      </Head>
    </Heading>
    <Markdown source={foulType.description} />
  </Section>
)
