import fetch from 'node-fetch'

import { describe, expect, beforeAll, afterAll, it } from '@jest/globals'
import { createServer } from 'http'
import { createRedirectApp } from '../app'

describe('redirects app', () => {
  let server

  beforeAll(async () => {
    server = createServer(
      createRedirectApp(
        JSON.stringify([
          {
            test: '(.*)\\.?polocasnapadu.cz',
            target: '$1polocas-napadu.cz',
          },
          {
            permanent: true,
            test: '(.*)\\.?longforman.cz',
            target: '$1longforman.cz',
          },
        ]),
      ),
    )
    server.listen()
    server.origin = `http://[${server.address().address}]:${
      server.address().port
    }`
  })

  afterAll(() => {
    server.close()
    server = null
  })

  describe('given redirect is *.polocasnapadu.cz -> $1.polocas-napadu.cz', () => {
    it('returns HTTP 301 for temporary redirects', async () => {
      const res = await fetch(server.origin, {
        method: 'GET',
        headers: { host: 'internal.polocasnapadu.cz' },
        redirect: 'manual',
      })
      expect(res.status).toEqual(301)
    })

    it('returns HTTP 302 for temporary redirects', async () => {
      const res = await fetch(server.origin, {
        method: 'GET',
        headers: { host: 'www.longforman.cz' },
        redirect: 'manual',
      })
      expect(res.status).toEqual(302)
    })

    it('translates internal.polocasnapadu.cz/ to internal.polocas-napadu.cz/', async () => {
      const res = await fetch(server.origin, {
        method: 'GET',
        headers: { host: 'internal.polocasnapadu.cz' },
        redirect: 'manual',
      })
      expect(res.headers.get('location')).toEqual(
        'http://internal.polocas-napadu.cz/',
      )
    })

    it('translates polocasnapadu.cz/ to polocas-napadu.cz/', async () => {
      const res = await fetch(server.origin, {
        method: 'GET',
        headers: { host: 'polocasnapadu.cz' },
        redirect: 'manual',
      })
      expect(res.headers.get('location')).toEqual('http://polocas-napadu.cz/')
    })

    it('translates ukoly.polocasnapadu.cz/foo/bar to ukoly.polocas-napadu.cz/foo/bar', async () => {
      const res = await fetch(`${server.origin}/foo/bar`, {
        method: 'GET',
        headers: { host: 'ukoly.polocasnapadu.cz' },
        redirect: 'manual',
      })
      expect(res.headers.get('location')).toEqual(
        'http://ukoly.polocas-napadu.cz/foo/bar',
      )
    })

    it('keeps query string', async () => {
      const res = await fetch(
        `${server.origin}/foo/bar?active=1&sort=createdAt`,
        {
          method: 'GET',
          headers: { host: 'ukoly.polocasnapadu.cz' },
          redirect: 'manual',
        },
      )
      expect(res.headers.get('location')).toEqual(
        'http://ukoly.polocas-napadu.cz/foo/bar?active=1&sort=createdAt',
      )
    })
  })
})
