import type { ButtonProps } from '../buttons.d.ts'

import { Button } from '../buttons.js'

export function Submit({ children, ...props }: ButtonProps) {
  return (
    <Button {...props} type='submit'>
      {children}
    </Button>
  )
}
