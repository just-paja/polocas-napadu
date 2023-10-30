import type { FC } from 'react'

import { use } from 'i18next'
import { useTranslation, initReactI18next } from 'react-i18next'

import cs from '@polocas/ui/locales/cs/common.json' assert { type: 'json' }
import en from '@polocas/ui/locales/en/common.json' assert { type: 'json' }

export const locales = { cs, en }

export type Translate = (t: string) => string

export interface TranslatedComponent {
  t: Translate
}

export function useI18n() {
  return useTranslation()
}

export function withTranslation<T>(
  Component: FC<T & TranslatedComponent>,
): FC<T & TranslatedComponent> {
  const fn = (props: T & TranslatedComponent) => {
    const { i18n, t } = useTranslation()
    return <Component {...props} i18n={i18n} t={t} />
  }
  fn.displayName = `i18n(${Component.name})`
  return fn
}

export function initLocalization(
  locales: Record<string, Record<string, string>>,
) {
  const resources = Object.fromEntries(
    Object.entries(locales).map(([lang, translation]) => [
      lang,
      { translation },
    ]),
  )
  return use(initReactI18next).init({
    resources,
    lng: 'cs', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
  })
}
