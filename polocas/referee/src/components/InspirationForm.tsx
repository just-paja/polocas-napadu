import { Form, FormControls, Input } from '@polocas/ui/forms'

const defaultValues = { inspiration: '' }

export const InspirationForm = ({ onSubmit, values = defaultValues }) => {
  return (
    <Form defaultValues={values} onSubmit={onSubmit}>
      <div>
        <Input
          name="inspiration"
          label="Inspirace"
          type="text"
          helpText='Inspirace může být cokoliv, třeba "Poslední tramvaj", "Pán s taškou" nebo "Stroj na lásku"'
        />
      </div>
      <FormControls submitLabel="Vložit" />
    </Form>
  )
}
