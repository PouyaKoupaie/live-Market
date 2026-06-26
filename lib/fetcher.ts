// lib/fetcher.ts
import { QueryFunctionContext } from '@tanstack/react-query'
import { CoinGeckoCoin } from '@/features/coins/type'
import { coinsQueryKey } from '@/types/api'

export type CoinsFilters = {
  perPage: string
  currency: string
  order: string
  search: string
}

export async function getCoins({ pageParam }: { pageParam: number }) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${pageParam}`
  );

  if (!res.ok) throw new Error(`Failed to fetch coins: ${res.status}`);
  
  return res.json();
}