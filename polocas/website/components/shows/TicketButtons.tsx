import moment from 'moment'
import React from 'react'

import { Button } from '@polocas/ui/Button'
import { TicketsIcon } from '@polocas/ui/icons'
import { withTranslation } from '@polocas/ui/i18n'

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

export const TicketButtons = withTranslation(({ event, t }) => {
  if (
    (event.linkTickets || event.linkReservations) &&
    moment().isBefore(event.start)
  ) {
    return (
      <div className="mt-2 d-flex">
        <LinkButton
          href={event.linkTickets}
          label={t('buyTickets')}
          icon={<TicketsIcon />}
          variant="primary"
          className="me-2"
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
})
