import React from 'react'

function addressToHtml(...args) {
  return args
    .join(',')
    .split(',')
    .map((row) => row.trim())
    .filter(Boolean)
    .reduce((aggr, addressRow, index, array) => {
      const row = <React.Fragment key={index}>{addressRow}</React.Fragment>
      return index < array.length
        ? [...aggr, row, <br key={addressRow} />]
        : [...aggr, row]
    }, [])
}

interface AddressProps {
  address: string
  city?: string
}

export const Address = ({ address, city }: AddressProps) => (
  <address>{addressToHtml(address, city)}</address>
)
