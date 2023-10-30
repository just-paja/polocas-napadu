import type { FormEvent, ForwardedRef, ReactNode } from 'react'
import type {
  Path,
  Resolver,
  SubmitHandler,
  DefaultValues,
  FieldValues,
} from 'react-hook-form'
import type { ProcessingError } from './FormContext.js'

import { Form as BsForm } from 'react-bootstrap'
import { forwardRef, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InternalFormProvider } from './FormContext.js'

interface ControlledFormProps extends JSX.IntrinsicAttributes {
  children: ReactNode
  id: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const ControlledForm = forwardRef<HTMLFormElement, ControlledFormProps>(
  ({ children, id, onSubmit, ...props }, ref) => (
    <BsForm noValidate id={id} onSubmit={onSubmit} ref={ref} {...props}>
      {children}
    </BsForm>
  ),
)

interface FormProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>
  children: ReactNode
  id: string
  onSubmit: SubmitHandler<T>
  resolver?: Resolver<T>
}

function ReflessForm<T extends FieldValues>(
  { defaultValues, children, id, onSubmit, resolver, ...props }: FormProps<T>,
  ref: ForwardedRef<HTMLFormElement>,
) {
  const [processingError, setProcessingError] =
    useState<ProcessingError | null>(null)
  const methods = useForm({ defaultValues, resolver })
  const { handleSubmit, setError } = methods
  const protectedSubmit: SubmitHandler<T> = useCallback(
    async (values: T) => {
      try {
        setProcessingError(null)
        await onSubmit(values)
      } catch (e) {
        if (e instanceof Error) {
          setProcessingError(e as ProcessingError)
          // @FIXME This error should be reported to Sentry
          console.error(e)
          const body = (e as any).body
          if (body && typeof body === 'object') {
            const formErrors = Object.entries(body).filter(
              ([key]) => key !== 'nonFieldErrors',
            )
            for (const [field, fieldErrors] of formErrors) {
              if (Array.isArray(fieldErrors)) {
                for (const fieldError of fieldErrors) {
                  setError(field as Path<T>, { message: fieldError })
                }
              }
            }
          }
        } else {
          throw e
        }
      }
    },
    [onSubmit, setError],
  )
  return (
    <InternalFormProvider
      formId={id}
      form={methods}
      processingError={processingError}
    >
      <ControlledForm
        {...props}
        id={id}
        onSubmit={handleSubmit(protectedSubmit)}
        ref={ref}
      >
        {children}
      </ControlledForm>
    </InternalFormProvider>
  )
}

export const Form = forwardRef(ReflessForm)
