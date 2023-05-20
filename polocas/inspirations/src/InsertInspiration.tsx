import React, { useState } from 'react'

import { Show } from '@polocas/core/constants'
import { gql, useMutation } from '@apollo/client'
import { InspirationForm } from './InspirationForm'
import { InspirationSaved } from './InspirationSaved'

const ADD_INSPIRATION = gql`
  mutation AddInspiration($showId: Int!, $inspirationText: String!) {
    addInspiration(showId: $showId, inspirationText: $inspirationText) {
      ok
    }
  }
`

export const InsertInspiration = ({ show }: { show: Show }) => {
  const [saved, setSaved] = useState(false)
  const [save, { loading, error }] = useMutation(ADD_INSPIRATION)

  if (saved) {
    return <InspirationSaved onContinue={() => setSaved(false)} />
  }

  const handleSubmit = async formValue => {
    await save({
      refetchQueries: ['ShowInfo'],
      variables: {
        inspirationText: formValue.inspiration,
        showId: show.id,
      },
    })
    setSaved(true)
  }

  return (
    <InspirationForm onSubmit={handleSubmit} error={error} saving={loading} />
  )
}
