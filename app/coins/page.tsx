import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { CoinTable } from '@/features/coins/components/coin-table'
import { getCoins } from '@/lib/fetcher'

type PageProps = {
  searchParams: Promise<{
    search?: string
    perPage?: string
    order?: string
  }>
}

export default async function CoinsTable({ searchParams }: PageProps) {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['coins'],
    queryFn: getCoins,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any[], allPages: any[]) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinTable/>
    </HydrationBoundary>
  )
}