// features/coins/components/coin-table.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronRight } from 'lucide-react'

import { getCoins } from '@/lib/fetcher'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

import { columns } from './columns'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

export function CoinTable() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['coins'],
    queryFn: getCoins,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })

  const coins = data?.pages.flat() ?? []

  const table = useReactTable({
    data: coins,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const canAutoFetch = (data?.pages.length ?? 0) < 3
  // Infinite Scroll Trigger
  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0]

      if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage && canAutoFetch) {
        fetchNextPage()
      }
    })
    observer.observe(el)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, coins.length])

  return (
    <div className="space-y-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="choose sort type"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='market_cap'>by market cap</SelectItem>
            <SelectItem value='increase'>by increase</SelectItem>
            <SelectItem value='decrease'>by decrease</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-24">
                No coins found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
        <div ref={loadMoreRef} />
        {isFetchingNextPage && <SkeletonTable />}
        {!canAutoFetch ? (
          <span onClick={() => fetchNextPage()} className="text-primary flex items-center">
            Load More <ChevronRight />
          </span>
        ) : (
          ''
        )}
    </div>
  )
}
