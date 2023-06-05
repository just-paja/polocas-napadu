import { Input } from './Input.js'
import { InputWrapper } from './InputWrapper.js'
import { useControlId } from './FormContext.js'

interface RadioGroupOption {
  label: string
  value: string
}

interface RadioGroupProps {
  emptyLabel?: string
  label: string
  options: RadioGroupOption[]
  name: string
  required?: boolean
}

export function RadioGroup({
  emptyLabel = 'none',
  label,
  options,
  name,
  required,
}: RadioGroupProps) {
  const controlId = useControlId(name)
  return (
    <InputWrapper controlId={controlId} label={label} required={required}>
      {!required && (
        <Input
          label={<span className='text-muted'>{emptyLabel}</span>}
          name={name}
          type='radio'
          value=''
        />
      )}
      {options.map((opt) => (
        <Input
          value={opt.value}
          label={opt.label}
          name={name}
          type='radio'
          key={opt.value}
        />
      ))}
    </InputWrapper>
  )
}
