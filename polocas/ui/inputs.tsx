import type { ChangeEvent, ReactNode } from 'react'

import classnames from 'classnames'

import { forwardRef } from 'react'
import { FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap'

interface InputLabelProps {
  colon?: boolean
  formCheck?: boolean
  required?: boolean
  text: ReactNode
}

export function InputLabel({
  colon = true,
  formCheck,
  required,
  text,
}: InputLabelProps) {
  return (
    <FormLabel
      className={classnames({
        'form-check-label': formCheck,
        'fw-bold': required,
      })}
    >
      {text}
      {colon ? ':' : ''}
    </FormLabel>
  )
}

type OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void

interface PlainInputProps {
  controlId: string
  disabled?: boolean
  helpText?: string
  id?: string
  label?: ReactNode
  onChange?: OnChangeHandler
  required?: boolean
  value?: string
}

export const PlainInput = forwardRef<HTMLInputElement, PlainInputProps>(
  ({ controlId, helpText, label, required, ...inputProps }, ref) => (
    <FormGroup controlId={controlId}>
      <InputLabel required={required} text={label} />
      <FormControl {...inputProps} ref={ref} />
      {helpText ? <FormText as='div'>{helpText}</FormText> : null}
    </FormGroup>
  ),
)
