import React from 'react'

import { CommonLayout } from '../components/layout/CommonLayout'
import { Profile } from '../components/profiles/Profile'

export default function ProfilePage({ slug }) {
  return (
    <CommonLayout>
      <Profile variables={{ slug }} />
    </CommonLayout>
  )
}
