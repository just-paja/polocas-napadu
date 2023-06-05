import type { ReactNode } from 'react'
import type { Translate } from '../i18n.js'
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import classnames from 'classnames'

import { Form as BsForm } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { InputLabel } from '../inputs.js'

interface ApiError {
  type: string
}

// rome-ignore lint/suspicious/noExplicitAny: Accept any error
type HookInputError = FieldError | Merge<FieldError, FieldErrorsImpl<any>>
type InputError = HookInputError | ApiError | Error | string

interface InputWrapperProps {
  controlId: string
  fieldError?: InputError
  helpText?: string
  children: ReactNode
  label?: ReactNode
  required?: boolean
  rightLabel?: boolean
}

function describeError(t: Translate, error: InputError): ReactNode {
  if (typeof error === 'string') {
    return error
  }
  if (error instanceof Error) {
    return error.message
  }
  if (error.type) {
    return t(`error-input-${error.type}`)
  }
  return t('error-unknown')
}

export function InputWrapper({
  controlId,
  children,
  fieldError,
  helpText,
  label,
  required,
  rightLabel,
}: InputWrapperProps) {
  const { t } = useTranslation()
  return (
    <BsForm.Group
      controlId={controlId}
      className={classnames('mt-2', {
        'form-check': rightLabel,
      })}
    >
      {label && !rightLabel ? (
        <InputLabel required={required} text={label} />
      ) : null}
      {children}
      {label && rightLabel ? (
        <InputLabel colon={false} text={label} required={required} formCheck />
      ) : null}
      {fieldError ? (
        <BsForm.Control.Feedback type='invalid'>
          {describeError(t, fieldError)}
        </BsForm.Control.Feedback>
      ) : null}
      {helpText ? <BsForm.Text as='div'>{helpText}</BsForm.Text> : null}
    </BsForm.Group>
  )
}
