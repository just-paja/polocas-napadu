import type { MouseEventHandler } from 'react'

import { Button } from '@polocas/ui/buttons'
import { AgainIcon } from '@polocas/ui/icons'

export const InspirationSaved = ({
  onContinue,
}: { onContinue: MouseEventHandler }) => (
  <div>
    <h2>Díky!</h2>
    <p>
      Inspiraci jsme si uložili a teď už je jenom na rozhodčím a na náhodě
      jestli se dostane do hry.
    </p>
    <div className='mt-3'>
      <Button icon={<AgainIcon />} onClick={onContinue}>
        Vložit další
      </Button>
    </div>
  </div>
)
