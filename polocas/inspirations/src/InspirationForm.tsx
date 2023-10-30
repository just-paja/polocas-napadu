import type { ApolloError } from '@apollo/client'
import type { ChangeEvent } from 'react'

import styles from './InspirationForm.module.scss'

import { Button } from '@polocas/ui/buttons'
import { Heading, Section } from '@polocas/ui/content'
import { PlainInput } from '@polocas/ui/inputs'
import { SendIcon } from '@polocas/ui/icons'
import { useState } from 'react'

interface InspirationFormProps {
  error?: ApolloError
  onSubmit: Function
  saving: boolean
}

export const InspirationForm = ({
  error,
  onSubmit,
  saving = false,
}: InspirationFormProps) => {
  const [inspiration, setInspiration] = useState('')
  return (
    <Section>
      <Heading>Vložit inspiraci</Heading>
      <p>
        Prosíme vás o krátké, třeba dvouslovné téma, které využijeme jako
        inspiraci do scének. Tedy potom, co si z nich rozhodčí vybere :-)
      </p>
      <form onSubmit={() => onSubmit({ inspiration })}>
        <div className='mt-3'>
          <PlainInput
            controlId='inspiration'
            disabled={saving}
            id='inspirationField'
            label='Inspirace'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInspiration(e.target.value)}
            value={inspiration}
            helpText='Inspirace může být cokoliv, třeba "Poslední tramvaj", "Pán s taškou" nebo "Stroj na lásku"'
          />
        </div>
        <div className={styles.controls}>
          <Button
            loading={saving}
            disabled={!inspiration}
            type='submit'
            icon={<SendIcon />}
            variant='primary'
          >
            Vložit
          </Button>
          {!saving && error ? (
            <p className={styles.error}>
              {error?.graphQLErrors?.some(
                (err) => err.message === 'already-exists',
              )
                ? 'Toto téma již v košíčku existuje'
                : 'Něco se pokazilo. Zkuste to prosím znovu.'}
            </p>
          ) : null}
        </div>
      </form>
    </Section>
  )
}
