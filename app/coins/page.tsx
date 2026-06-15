import { HydrationBoundary, QueryClient, dehydrate, useQuery } from '@tanstack/react-query'

import { CoinTable } from '@/features/coins/components/coin-table'
import { getCoins } from '@/lib/fetcher'

export default async function CoinsTable() {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['coins'],
    queryFn: getCoins,
    initialPageParam: 1,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinTable />
    </HydrationBoundary>
  )
}
