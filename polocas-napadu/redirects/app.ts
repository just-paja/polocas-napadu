import express, { Request, Response } from "express"

export interface Redirect {
	permanent?: boolean
	test: RegExp
	target: string
}

const getHost = (req: Request): string => req.get("host") || ""
const parseProtocol = (req: Request): string => (req.secure ? "https" : "http")
const parseRedirect = (obj: { test: string }) => ({
	...obj,
	test: new RegExp(obj.test),
})
const parseRedirects = (str: string): Redirect[] =>
	JSON.parse(str).map(parseRedirect)
const translateHost = (target: string, match: string[]): string =>
	match.reduce(
		(aggr: string, value: string, index: number) =>
			aggr.replace(new RegExp(`\\$${index}`, "g"), value),
		target,
	)

const translateRedirect = (req: Request, redirect: Redirect): string | null => {
	const match = redirect.test.exec(getHost(req))
	if (match) {
		const host = translateHost(redirect.target, match)
		return `${parseProtocol(req)}://${host}${req.originalUrl}`
	}
	return null
}

export const createRedirectApp = (redirectsStr: string) => {
	const app = express()
	const redirects: Redirect[] = parseRedirects(redirectsStr)
  app.get('/health', (_req, res) => {
    res.status(200).send({ message: 'ok' })
  })
	app.use((req: Request, res: Response) => {
		try {
			for (const redirect of redirects) {
				const target = translateRedirect(req, redirect)
				if (target) {
					return res.redirect(redirect.permanent ? 302 : 301, target)
				}
			}
			return res.redirect(302, `${parseProtocol(req)}://${getHost(req)}${req.originalUrl}`)
		} catch (e) {
			res.status(500).send("Internal Server Error")
			console.error(e)
		}
	})
	return app
}
