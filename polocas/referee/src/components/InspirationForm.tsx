import { Form, FormControls, Input } from '@polocas/ui/forms'

const defaultValues = { inspiration: '' }

interface InspirationFormValues {
  inspiration?: string
}

interface InspirationFormProps {
  id: string
  onSubmit: (values: InspirationFormValues) => void
  values?: InspirationFormValues 
}

export function InspirationForm({ id, onSubmit, values = defaultValues }: InspirationFormProps) {
  return (
    <Form
      id={id}
      defaultValues={values}
      onSubmit={onSubmit}
    >
      <div>
        <Input
          name='inspiration'
          label='Inspirace'
          type='text'
          helpText='Inspirace může být cokoliv, třeba "Poslední tramvaj", "Pán s taškou" nebo "Stroj na lásku"'
        />
      </div>
      <FormControls submitLabel='Vložit' />
    </Form>
  )
}
