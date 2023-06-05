import type { FC } from "react"

import { use } from "i18next"
import { useTranslation, initReactI18next } from "react-i18next"

export interface TranslatedComponent {
  t: Function
}

export function withTranslation<T>(
  Component: FC<T & TranslatedComponent>
): FC<T & TranslatedComponent> {
  const fn = (props: T & TranslatedComponent) => {
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
