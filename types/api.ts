type CoinsFilters = {
  perPage: string
  currency: string
  order: string
}

export const coinsQueryKey = (filters: CoinsFilters) =>
  ['coins', filters] as const

export const filters = {
  perPage: 20,
  currency: 'usd',
  order: 'market_cap_desc',
}