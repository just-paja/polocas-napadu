import React from 'react'

import { Article } from '../components/articles'
import { CommonLayout } from '../components/layout'
import { compose } from '@polocas/ui/decorators'
import { withPageProps } from '../pages'

export const getServerSideProps = compose(withPageProps)

export default function ArticlePage({ slug }) {
  return (
    <CommonLayout>
      <Article variables={{ slug }} />
    </CommonLayout>
  )
}
