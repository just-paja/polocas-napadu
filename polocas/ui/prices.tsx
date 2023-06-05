import { useI18n } from './i18n.js'

const currencyDecimals = 2

interface PriceProps {
  amount: number | string
  currency: string
  from?: boolean
}

export function Price({ amount, currency, from }: PriceProps) {
  const { i18n, t } = useI18n()
  const price = parseFloat(String(amount)).toLocaleString(i18n.language, {
    currency,
    style: 'currency',
    maximumFractionDigits: currency === 'CZK' ? 0 : currencyDecimals,
  })
  return <>{from ? t('price-from', { price }) : price}</>
}

export interface PriceTag {
  amount: number
  currency: string
}

interface PriceSummaryProps {
  prices: PriceTag[]
}

function getMaxPrice(prices: PriceTag[]): PriceTag {
  return prices.reduce((aggr, ticketPrice) =>
    ticketPrice.amount > aggr.amount ? ticketPrice : aggr,
  )
}

export function PriceSummary({ prices }: PriceSummaryProps) {
  if (prices.length === 0) {
    return null
  }
  const max = getMaxPrice(prices)
  return (
    <Price
      amount={max.amount}
      currency={max.currency}
      from={prices.length === 1}
    />
  )
}
