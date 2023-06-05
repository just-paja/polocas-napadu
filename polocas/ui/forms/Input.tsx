import type { UseFormRegisterReturn } from 'react-hook-form'
import type { ClassName } from '@polocas/core/generics'
import type { ElementType, FormEvent, ReactNode } from 'react'

import { FormCheck, Form as BsForm } from 'react-bootstrap'
import { forwardRef } from 'react'
import { useFormControl } from './FormContext.js'
import { useFormContext } from 'react-hook-form'
import { InputWrapper } from './InputWrapper.js'

interface InputOption {
  label: string
  value: string
}

type OnChangeHandler = (e: FormEvent) => void

function resolveType(type?: string): string | undefined {
  if (type === 'checkbox') {
    return undefined
  }
  if (type === 'select') {
    return 'select'
  }
  if (type === 'textarea') {
    return 'textarea'
  }
  return 'input'
}

function resolveComponent(type?: string, as?: ElementType): ElementType {
  if (as) {
    return as
  }
  if (type === 'checkbox' || type === 'radio') {
    return FormCheck.Input
  }
  if (type === 'select') {
    return BsForm.Select
  }
  return BsForm.Control
}

const rightLabelMap = ['checkbox', 'radio']

function isLabelRight(type?: string): boolean {
  return Boolean(type && rightLabelMap.includes(type))
}

function getOptions(
  type?: string,
  options?: InputOption[],
  required?: boolean,
) {
  let opts = null
  if (type === 'select' && options) {
    opts = options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))

    if (!required) {
      opts.unshift(
        <option value='' key={null}>
          - - -
        </option>,
      )
    }
  }
  return opts
}

interface FormlessInputProps {
  as?: ElementType
  className?: ClassName
  error?: Error
  id?: string
  label?: ReactNode
  name: string
  onChange?: OnChangeHandler
  options?: InputOption[]
  helpText?: string
  required?: boolean
  type?: string
  // rome-ignore lint/suspicious/noExplicitAny: The input should handle any value
  value?: any
}

export const FormlessInput = forwardRef<HTMLFormElement, FormlessInputProps>(
  function (
    {
      as,
      className,
      error,
      id,
      label,
      name,
      options,
      helpText,
      required,
      type,
      ...props
    },
    ref,
  ) {
    const { formId } = useFormControl()
    const { formState, watch } = useFormContext()
    const rightLabel = isLabelRight(type)
    const controlId =
      id || `${formId}-${name}${rightLabel ? `-${props.value}` : ''}`
    const htmlOptions = getOptions(type, options, required)
    const Component = resolveComponent(type, as)
    const fieldError = error || formState.errors[name]
    const currentValue = watch(name)
    const inputProps: {
      value?: string
      checked?: boolean
    } = {}
    if (type === 'checkbox') {
      inputProps.value = props.value || 'true'
    }
    if (type === 'radio') {
      inputProps.checked = currentValue === props.value
      inputProps.value = props.value
    }
    return (
      <InputWrapper
        controlId={controlId}
        fieldError={fieldError}
        helpText={helpText}
        label={label}
        required={required}
        rightLabel={rightLabel}
      >
        <Component
          as={resolveType(type)}
          disabled={formState.isSubmitting}
          isInvalid={Boolean(fieldError)}
          name={name}
          type={type}
          {...inputProps}
          {...props}
          className={className}
          ref={ref}
        >
          {htmlOptions}
        </Component>
      </InputWrapper>
    )
  },
)

interface InputProps extends FormlessInputProps {
  validate?: any
}

const getChangeWrapper =
  (field: UseFormRegisterReturn, onChange: OnChangeHandler) =>
  (e: FormEvent) => {
    onChange(e)
    field.onChange(e)
  }

export function Input({ name, onChange, validate, ...props }: InputProps) {
  const { register } = useFormContext()
  const field = register(name, {
    setValueAs: (v) => (['', undefined].includes(v) ? null : v),
    validate,
  })
  const handleChange = onChange
    ? getChangeWrapper(field, onChange)
    : field.onChange
  return <FormlessInput {...props} {...field} onChange={handleChange} />
}
