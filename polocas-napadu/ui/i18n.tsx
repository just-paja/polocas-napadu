import React, { ReactComponent } from "react"

import { use } from "i18next"
import { useTranslation, initReactI18next } from "react-i18next"

export const withTranslation = (Component: ReactComponent) => {
	const fn = (props: any) => {
		const { i18n, t } = useTranslation()
		return <Component {...props} i18n={i18n} t={t} />
	}
	fn.displayName = `i18n(${Component.name})`
	return fn
}

export const initLocalization = (locales) =>
	use(initReactI18next).init({
		resources: Object.fromEntries(
			Object.entries(locales).map(([lang, translation]) => [
				lang,
				{ translation },
			]),
		),
		lng: "cs", // if you're using a language detector, do not define the lng option
		fallbackLng: "en",
	})
