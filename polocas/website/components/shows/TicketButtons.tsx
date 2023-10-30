import moment from 'moment'
import React from 'react'

import { Button } from '@polocas/ui/Button'
import { TicketsIcon } from '@polocas/ui/icons'
import { useI18n } from '@polocas/next/i18n'

function LinkButton({ href, label, ...props }) {
  if (!href) {
    return null
  }
  return (
    <Button href={href} {...props}>
      {label}
    </Button>
  )
}

export function TicketButtons({ event }) {
  const { t } = useI18n()
  if (
    (event.linkTickets || event.linkReservations) &&
    moment().isBefore(event.start)
  ) {
    return (
      <div className='mt-2 d-flex'>
        <LinkButton
          href={event.linkTickets}
          label={t('buyTickets')}
          icon={<TicketsIcon />}
          variant='primary'
          className='me-2'
        />
        <LinkButton
          href={event.linkReservations}
          label={t('reserveSeats')}
          icon={<TicketsIcon />}
          variant={event.linkTickets ? 'secondary' : 'primary'}
        />
      </div>
    )
  }
  return null
}
