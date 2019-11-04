import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './ShowParticipants.scss'

import { OptionalLink } from '../bindings'
import { List } from '../layout'
import { formatName } from '../profiles/names'
import { ShowParticipant } from '../proptypes'
import { withTranslation } from '../../lib/i18n'

function ShowParticipantsMap ({ participants }) {
  return participants
    .sort((a, b) =>
      a.role.name.localeCompare(b.role.name) ||
      formatName(a.profile).localeCompare(formatName(b.profile))
    )
    .map(participant => (
      <li key={participant.id}>
        <OptionalLink
          route='profile'
          params={{ slug: participant.profile.slug }}
          isLink={Boolean(participant.profile.group)}
        >
          {formatName(participant.profile)}
        </OptionalLink>
        {' '}
        ({participant.role.name})
      </li>
    ))
}

function ShowParticipantsComponent ({ participants, t }) {
  return (
    <List>
      {participants.length > 0
        ? (
          <ul className={styles.list}>
            <ShowParticipantsMap participants={participants} />
          </ul>
        ) : (
          <Alert variant='light'>
            {t('noShowParticipants')}
          </Alert>
        )}
    </List>
  )
}

ShowParticipantsComponent.propTypes = {
  participants: PropTypes.arrayOf(ShowParticipant).isRequired
}

export const ShowParticipants = withTranslation(['common'])(ShowParticipantsComponent)
