import type { Translate } from '../i18n.d.ts'
import type { ProcessingError } from './FormContext.d.ts'

import { Alert } from 'react-bootstrap'
import { useI18n } from '../i18n.js'
import { useFormControl } from './FormContext.js'

function describeProcessingError(t: Translate, err: ProcessingError): string {
  if (err?.body?.nonFieldErrors) {
    return err.body.nonFieldErrors.join(',')
  }
  if (err?.body?.message) {
    return err.body.message
  }
  return t('form-failed-to-submit')
}

interface FormErrorProps {
  vague?: boolean
}

export function FormError({ vague }: FormErrorProps) {
  const { processingError } = useFormControl()
  const { t } = useI18n()
  if (processingError) {
    return (
      <div className='mt-3'>
        <Alert variant='danger'>
          {vague
            ? t('form-failed-to-submit')
            : describeProcessingError(t, processingError)}
        </Alert>
      </div>
    )
  }
  return null
}
