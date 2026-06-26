import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { CoinGeckoCoin } from '../type' // Use your unified type here

export const columns: ColumnDef<CoinGeckoCoin>[] = [
  {
    accessorKey: 'market_cap_rank',
    header: 'Rank',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const coin = row.original
      return (
        <div className="flex items-center gap-2">
          <Image
            src={coin.image}
            alt={`${coin.symbol} icon`}
            width={22}
            height={22}
            quality={50}
          />
          <span className="font-medium">{coin.name}</span>
          <span className="text-gray-400 uppercase">{coin.symbol}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'current_price',
    header: 'Price',
    cell: ({ getValue }) => {
      const price = getValue<number>()
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    },
  },
  {
    accessorKey: 'price_change_percentage_24h',
    header: '24h',
    cell: ({ getValue }) => {
      const change = getValue<number | null>() // explicitly allow null
    
    // 1. Handle the null/undefined fallback case first
    if (change === null || change === undefined) {
      return <span className="text-gray-400">—</span>
    }
      const isNegative = change < 0
      return (
        <span className={isNegative ? 'text-red-600' : 'text-green-600'}>
          {isNegative ? '' : '+'}{change.toFixed(2)}%
        </span>
      )
    },
  },
  {
    accessorKey: 'market_cap',
    header: 'Market Cap',
    cell: ({ getValue }) => {
      const marketCap = getValue<number>()
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(marketCap)
    },
  },
]