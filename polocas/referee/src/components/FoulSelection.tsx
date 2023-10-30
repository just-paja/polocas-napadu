import type { FoulType } from '@polocas/core'

import { Input } from '@polocas/ui/forms'
import { gql, useQuery } from '@apollo/client'

const getFoulTypes = gql`
  query FoulTypes {
    foulTypeList {
      id
      name
    }
  }
`

interface FoulSelectionProps {
  label: string
  name: string
  required?: boolean
}

export function FoulSelection({ ...props }: FoulSelectionProps) {
  const { loading, error, data } = useQuery(getFoulTypes)
  return (
    <Input
      {...props}
      options={data.foulTypeList.map((option: FoulType) => ({
        label: option.name,
        value: option.id,
      }))}
      disabled={loading}
      error={error}
      type='select'
    />
  )
}
