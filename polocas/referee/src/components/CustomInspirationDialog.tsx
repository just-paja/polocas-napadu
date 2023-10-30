import { InspirationForm } from './InspirationForm.js'
import { gql, useMutation } from '@apollo/client'
import { Modal } from 'react-bootstrap'
import { useMatch } from '@polocas/core/context'

const ADD_AND_USE_INSPIRATION = gql`
  mutation AddAndUseInspiration($matchId: Int!, $inspirationText: String!) {
    addAndUseInspiration(matchId: $matchId, inspirationText: $inspirationText) {
      ok
    }
  }
`

const defaultValues = {
  inspiration: '',
}

interface InspirationValues {
  inspiration?: string
}

interface CustomInspirationDialogProps {
  open?: boolean
  onClose?: Function
  values?: InspirationValues
}

export function CustomInspirationDialog({
  open,
  values = defaultValues,
  onClose,
}: CustomInspirationDialogProps) {
  const match = useMatch()
  const [addAndUseInspiration] = useMutation(ADD_AND_USE_INSPIRATION, {
    onCompleted: onClose ? (() => onClose()) : undefined,
    refetchQueries: ['MatchStage'],
  })
  const handleSubmit = (formData: InspirationValues) => {
    addAndUseInspiration({
      variables: {
        inspirationText: formData.inspiration,
        matchId: match?.id,
      },
    })
  }
  return (
    <Modal show={open} onHide={onClose ? (() => onClose()) : undefined}>
      <Modal.Header closeButton>Vlastní inspirace</Modal.Header>
      <Modal.Body>
        <InspirationForm
          id="custom-inspiration-form"
          values={values}
          onSubmit={handleSubmit}
        />
      </Modal.Body>
    </Modal>
  )
}
