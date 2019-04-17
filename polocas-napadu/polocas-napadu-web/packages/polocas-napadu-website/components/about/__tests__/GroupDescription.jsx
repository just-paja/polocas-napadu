import React from 'react'

import { renderWithI18n } from '../../../mock'
import { GroupDescription } from '..'

describe('GroupDescription component', () => {
  it('renders content as section', async () => {
    const comp = await renderWithI18n(<GroupDescription />)
    expect(comp.find('section')).toHaveLength(1)
  })

  it('renders heading', async () => {
    const comp = await renderWithI18n(<GroupDescription />)
    expect(comp.find('Typography')).toHaveProp('children', 'group-description-heading')
  })

  it('renders perex', async () => {
    const comp = await renderWithI18n(<GroupDescription />)
    expect(comp.find('ReactMarkdown')).toHaveProp('source', 'group-description-perex')
  })
})
