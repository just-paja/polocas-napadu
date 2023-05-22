import React from 'react'

import { CommonLayout } from '../../components/layout'
import { compose, withQueryset } from '@polocas/ui/decorators'
import { gql } from '@apollo/client'
import { ShowFormatDetail } from '../../components/shows/ShowFormatDetail'
import { showFormatQuery } from '../../graphql'
import { withPageProps } from '../../pages'

export const getServerSideProps = compose(
  withPageProps,
  withQueryset({
    show: { query: gql(showFormatQuery) },
  }),
  props => props
)

export default ({ showList, showType }) => {
  return (
    <CommonLayout>
      <ShowFormatDetail showList={showList} showType={showType} />
    </CommonLayout>
  )
}
