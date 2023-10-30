import type { NamedEntity } from '@polocas/core/generics'

import Select from 'react-select'

import { gql, useQuery } from '@apollo/client'

const getGames = gql`
  query GameRules {
    gameRulesList {
      id
      name
    }
  }
`

interface GameSelectionProps {
  disabled?: boolean
  onChange: Function
  value?: NamedEntity
}

export function GameSelection({ disabled, onChange, value }: GameSelectionProps) {
  const { data, loading } = useQuery(getGames)
  return (
    <Select
      options={data.gameRulesList}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
      value={value}
      isDisabled={disabled}
      isLoading={loading}
      onChange={(value) => onChange(value)}
      placeholder='Vyber kategorii'
      isClearable
    />
  )
}
