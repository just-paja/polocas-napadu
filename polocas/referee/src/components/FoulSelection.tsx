import { Input } from '@polocas/ui/forms'
import { gql } from '@apollo/client'
import { withQuery } from '@polocas/ui/apollo'

const GET_GAMES = gql`
  query FoulTypes {
    foulTypeList {
      id
      name
    }
  }
`

export const FoulSelection = withQuery(
  ({ data, ...props }) => (
    <Input
      {...props}
      options={data.foulTypeList.map(option => ({
        label: option.name,
        value: option.id,
      }))}
      placeholder="Vyber druh chyby"
      type="select"
    />
  ),
  GET_GAMES
)
