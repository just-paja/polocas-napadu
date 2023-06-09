import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styles from './LogisticInfo.module.scss'

import { Children } from '@polocas-napadu/core/proptypes'
import { Details } from '@polocas/ui/content'

function ignore(e) {
  e.preventDefault()
}

export function LogisticInfo({ icon: Icon, summary, children }) {
  const [open, setOpen] = useState(true)
  return (
    <Details
      className={classnames(styles.box, { [styles.open]: open })}
      open
      onClick={ignore}
    >
      <summary onClick={() => setOpen(true)}>
        <Icon className={styles.icon} />
        {summary}
      </summary>
      <div className={styles.details}>{children}</div>
    </Details>
  )
}

LogisticInfo.propTypes = {
  children: Children,
  icon: PropTypes.func.isRequired,
  summary: Children.isRequired,
}
