import React from 'react'

import { List } from '../layout/List'
import { Link } from '../links'

const ShowFormatListItem = ({ showFormat }) => (
  <li>
    <Link route="showFormatDetail" params={{ slug: showFormat.slug }}>
      {showFormat.name}
    </Link>
  </li>
)

export function ShowFormatList({ data }) {
  if (!data.showTypeList.length) {
    return null
  }
  return (
    <List as="ul">
      {data.showTypeList.map(showFormat => (
        <ShowFormatListItem key={showFormat.id} showFormat={showFormat} />
      ))}
    </List>
  )
}
