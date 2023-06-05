import type { ReactNode } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

import { createContext, useContext, useMemo } from 'react'
import { FormProvider } from 'react-hook-form'

interface ProcessingErrorBody {
  nonFieldErrors?: string[]
  message?: string
}

export interface ProcessingError {
  body?: ProcessingErrorBody
}

interface InternalFormProps {
  formId: string
  processingError?: ProcessingError | null
}

export const InternalFormContext = createContext<InternalFormProps>({
  formId: '',
})

interface InternalFormProviderProps<T extends FieldValues>
  extends InternalFormProps {
  children: ReactNode
  form: UseFormReturn<T>
}

export function useFormControl(): InternalFormProps {
  return useContext(InternalFormContext)
}

export function useControlId(controlName: string): string {
  return `${useFormControl().formId}-${controlName}`
}

export function InternalFormProvider<T extends FieldValues>({
  form,
  formId,
  children,
  processingError,
}: InternalFormProviderProps<T>) {
  const value = useMemo(
    () => ({ formId, processingError }),
    [formId, processingError],
  )
  return (
    <InternalFormContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </InternalFormContext.Provider>
  )
}
