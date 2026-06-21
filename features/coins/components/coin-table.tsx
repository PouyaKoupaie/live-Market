'use client'
import { useEffect, useRef } from 'react'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { getCoins } from '@/lib/fetcher'

import { CoinGeckoCoin } from '../type'
import { SkeletonTable } from '@/shared/ui/skeleton-table'

export function CoinTable() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['coins'],
    queryFn: getCoins,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })

  const coins = data?.pages.flat() ?? [] ;

  // intersectionObserver logic
  (useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    })
    observer.observe(el)

    return () => observer.disconnect()
  }),
    [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>rank</TableHead>
            <TableHead>coin</TableHead>
            <TableHead>price</TableHead>
            <TableHead>24h</TableHead>
            <TableHead>Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin: CoinGeckoCoin) => (
            <TableRow key={coin.id}>
              <TableCell>{coin.market_cap_rank}</TableCell>
              <TableCell>
                <Image
                  src={coin.image}
                  alt={`${coin.symbol} icon`}
                  width={22}
                  height={22}
                  style={{ display: 'inline' }}
                  quality={75}
                />
                <span className="m-1">{coin.name}</span>
                <span className="text-gray-400">{coin.symbol}</span>
              </TableCell>
              <TableCell>{coin.current_price}</TableCell>
              <TableCell
                className={coin.price_change_percentage_24h < 0 ? 'text-red-600' : 'text-green-600'}
              >
                {coin.price_change_percentage_24h} %
              </TableCell>
              <TableCell>{coin.market_cap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={loadMoreRef} style={{ height: 1 }} />

      {isFetchingNextPage && <SkeletonTable/>}
    </div>
  )
}
