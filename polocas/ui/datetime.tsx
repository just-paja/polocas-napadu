import type { ClassName } from '@polocas/core/generics'
import type { FC } from 'react'

import classnames from 'classnames'
import { useTranslation } from 'react-i18next'

interface DateFormatProps {
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  month?: 'numeric' | 'long' | '2-digit' | 'short' | 'narrow'
  year?: 'numeric' | '2-digit'
}

const getFormat = (locale: string, props: DateFormatProps) =>
  new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...props,
  })

export function formatDate(
  lang: string,
  date: Date | string,
  props: DateFormatProps,
): string {
  return getFormat(lang, props).format(new Date(date)).replace(' ', ' ')
}

export function formatDateRange(
  lang: string,
  start: Date | string,
  end: Date | string,
  props: DateFormatProps,
): string {
  return getFormat(lang, props)
    .formatRange(new Date(start), new Date(end))
    .replace(' ', ' ')
}

interface DateLabelProps extends DateFormatProps {
  className?: ClassName
  date: Date | string
  showTime?: boolean
}

export const DateLabel: FC<DateLabelProps> = ({ date, showTime, ...props }) => (
  <time dateTime={`${date}`}>
    {formatDate(useTranslation().i18n.language, date, {
      hour: showTime ? 'numeric' : undefined,
      minute: showTime ? 'numeric' : undefined,
      ...props,
    })}
  </time>
)

export const DateTimeLabel = ({
  showTime = true,
  ...props
}: DateLabelProps) => <DateLabel {...props} showTime={showTime} />

interface DateRangeLabelProps extends DateFormatProps {
  className?: ClassName
  end: Date | string
  showTime?: boolean
  start: Date | string
}

export const DateRangeLabel = ({
  start,
  end,
  showTime,
  className,
  ...props
}: DateRangeLabelProps) => {
  const { i18n } = useTranslation()
  return (
    <time className={classnames(className)} dateTime={`${start}/${end}`}>
      {formatDateRange(i18n.language, start, end, {
        hour: showTime ? 'numeric' : undefined,
        minute: showTime ? 'numeric' : undefined,
        ...props,
      })}
    </time>
  )
}
