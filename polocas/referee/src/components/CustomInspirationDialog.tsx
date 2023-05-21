import Modal from 'react-bootstrap/Modal'

import { InspirationForm } from './InspirationForm.js'
import { gql, useMutation } from '@apollo/client'
import { useMatch } from '@polocas/core/context'

const ADD_AND_USE_INSPIRATION = gql`
  mutation AddAndUseInspiration($matchId: Int!, $inspirationText: String!) {
    addAndUseInspiration(matchId: $matchId, inspirationText: $inspirationText) {
      ok
    }
  }
`

const defaultValues = {
  inspirationText: '',
}

export const CustomInspirationDialog = ({
  open,
  values = defaultValues,
  onClose,
}) => {
  const match = useMatch()
  const [addAndUseInspiration] = useMutation(ADD_AND_USE_INSPIRATION, {
    onCompleted: onClose,
    refetchQueries: ['MatchStage'],
  })
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>Vlastní inspirace</Modal.Header>
      <Modal.Body>
        <InspirationForm
          values={values}
          onSubmit={formData => {
            addAndUseInspiration({
              variables: {
                inspirationText: formData.inspiration,
                matchId: match.id,
              },
            })
          }}
        />
      </Modal.Body>
    </Modal>
  )
}
