import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

import { propsTranslated } from '../proptypes'
import { withTranslation } from '../../lib/i18n'

const TitleComponent = ({ pure, t, text }) => (
  <Head>
    <title>{pure ? text : `${text} - ${t('projectName')}`}</title>
    <meta property='og:title' content={text} />
    <meta property='og:site_name' content={t('projectName')} />
  </Head>
)

TitleComponent.propTypes = {
  ...propsTranslated,
  pure: PropTypes.bool,
  text: PropTypes.string.isRequired
}

TitleComponent.defaultProps = {
  pure: false
}

export const Title = withTranslation('common')(TitleComponent)
