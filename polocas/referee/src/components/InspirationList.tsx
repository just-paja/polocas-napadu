import type { Inspiration } from '@polocas/core/constants'

import { Button } from '@polocas/ui/buttons'
import { DeleteIcon } from '@polocas/ui/icons'
import { gql, useMutation } from '@apollo/client'
import { ListGroup } from 'react-bootstrap'

const INSPIRATION_DISCARD = gql`
  mutation InspirationDiscard($inspirationId: Int!) {
    discardInspiration(inspirationId: $inspirationId) {
      ok
    }
  }
`

interface InspirationDiscardProps {
  inspiration: Inspiration
}

function InspirationDiscard({ inspiration }: InspirationDiscardProps) {
  const [mutate, { loading }] = useMutation(INSPIRATION_DISCARD)
  const handleClick = () =>
    mutate({
      refetchQueries: ['MatchStage'],
      variables: {
        inspirationId: inspiration.id,
      },
    })

  return (
    <Button loading={loading} icon={<DeleteIcon />} onClick={handleClick} />
  )
}

interface InspirationItemProps {
  inspiration: Inspiration
  readOnly?: boolean
}

function InspirationItem({ inspiration, readOnly }: InspirationItemProps) {
  return (
    <ListGroup.Item
      key={inspiration.id}
      className='d-flex justify-content-between align-items-center'
    >
      <span>{inspiration.text}</span>
      {readOnly ? null : <InspirationDiscard inspiration={inspiration} />}
    </ListGroup.Item>
  )
}

interface InspirationListProps {
  inspirations: Inspiration[]
  readOnly?: boolean
}

export function InspirationList({
  inspirations,
  readOnly = false,
}: InspirationListProps) {
  return (
    <ListGroup>
      {inspirations.map((inspiration) => (
        <InspirationItem
          inspiration={inspiration}
          readOnly={readOnly}
          key={inspiration.id}
        />
      ))}
    </ListGroup>
  )
}
