import type { FC } from 'react'
import { useTranslation } from "react-i18next"

const getFormat = (locale, props) =>
	new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
		...props,
	})

export const formatDate = (lang, date, props) =>
	getFormat(lang, props).format(new Date(date)).replace(" ", " ")

export const formatDateRange = (lang, start, end, props) =>
	getFormat(lang, props)
		.formatRange(new Date(start), new Date(end))
		.replace(" ", " ")

interface DateLabelProps {
  date: string | Date
  showTime?: boolean
}

export const DateLabel: FC<DateLabelProps> = ({ date, showTime, ...props }) => (
	<time dateTime={`${date}`}>
		{formatDate(useTranslation().language, date, {
			hour: showTime ? "numeric" : undefined,
			minute: showTime ? "numeric" : undefined,
			...props,
		})}
	</time>
)

export const DateTimeLabel = ({ showTime = true, ...props }) => (
	<DateLabel {...props} showTime={showTime} />
)

export const DateRangeLabel = ({ start, end, showTime, ...props }) => {
	const { i18n } = useTranslation()
	return (
		<time dateTime={`${start}/${end}`}>
			{formatDateRange(i18n.language, start, end, {
				hour: showTime ? "numeric" : undefined,
				minute: showTime ? "numeric" : undefined,
				...props,
			})}
		</time>
	)
}
