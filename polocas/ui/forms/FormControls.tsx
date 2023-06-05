import type { MouseEventHandler, ReactNode } from 'react'

import { Button } from '../buttons.js'
import { FormError } from './FormError.js'
import { Submit } from './Submit.js'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormControlsProps {
  cancelLabel?: string
  children?: ReactNode
  disabled?: boolean
  onCancel?: MouseEventHandler<HTMLButtonElement>
  size?: 'sm' | 'lg'
  submitLabel?: string
}

export const FormControls = ({
  cancelLabel,
  children,
  disabled,
  onCancel,
  size,
  submitLabel,
}: FormControlsProps) => {
  const { t } = useTranslation()
  const { formState } = useFormContext()
  return (
    <>
      <FormError vague />
      <div className='mt-3'>
        <Submit
          disabled={disabled}
          loading={formState.isSubmitting}
          size={size}
        >
          {submitLabel}
        </Submit>
        {children}
        {onCancel && (
          <Button
            className='ms-2'
            disabled={disabled}
            type='button'
            variant='secondary'
            size={size}
            onClick={onCancel}
          >
            {cancelLabel || t('cancel')}
          </Button>
        )}
      </div>
    </>
  )
}
