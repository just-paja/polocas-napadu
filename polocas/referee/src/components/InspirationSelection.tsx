import styles from './InspirationSelection.module.scss'

import { ButtonGroup } from 'react-bootstrap'
import { CustomInspirationSelection } from './CustomInspirationSelection.js'
import { InspirationList } from './InspirationList.js'
import { Button } from '@polocas/ui/buttons'
import { gql, useMutation } from '@apollo/client'
import { useMatch } from '@polocas/core/context'

const INSPIRATION_PICK_RANDOM = gql`
  mutation RandomPickInspiration($matchId: Int!, $replace: Boolean) {
    randomPickInspiration(matchId: $matchId, replace: $replace) {
      ok
    }
  }
`

interface ShuffleButtonProps {
  disabled?: boolean
  replace?: boolean
  label: string
}

function ShuffleButton({ disabled, replace, label }: ShuffleButtonProps) {
  const [mutate, { loading }] = useMutation(INSPIRATION_PICK_RANDOM)
  const match = useMatch()
  const handleClick = () =>
    mutate({
      refetchQueries: ['MatchStage'],
      variables: {
        matchId: match.id,
        replace,
      },
    })
  return (
    <Button disabled={disabled} loading={loading} onClick={handleClick}>
      {label}
    </Button>
  )
}

export function InspirationSelection() {
  const { currentStage, preparedInspirationCount } = useMatch()
  return (
    <div>
      <div className={styles.inspirationList}>
        <InspirationList inspirations={currentStage?.inspirations || []} />
      </div>
      <div className='mt-3'>
        <ButtonGroup>
          <ShuffleButton
            disabled={
              preparedInspirationCount === 0 ||
              !(currentStage?.inspirations?.length)
            }
            label='Vylosovat a nahradit'
            replace
          />
          <ShuffleButton
            disabled={preparedInspirationCount === 0}
            label='Vylosovat'
          />
          <CustomInspirationSelection />
        </ButtonGroup>
      </div>
    </div>
  )
}
