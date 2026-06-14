import Image from 'next/image'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CoinGeckoCoin } from '../type'

export function CoinTable({ coins }: { coins: CoinGeckoCoin[] }) {
  const data = coins.map((coin: CoinGeckoCoin) => ({
    market_cap_rank: coin.market_cap_rank,
    image: coin.image,
    name: coin.name,
    symbole: coin.symbol,
    current_price: coin.current_price,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    market_cap: coin.market_cap,
  }))
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>rank</TableHead>
          <TableHead>coin</TableHead>
          <TableHead>price</TableHead>
          <TableHead >24h</TableHead>
          <TableHead>Market Cap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((coin) => (
          <TableRow key={coin.market_cap_rank}>
            <TableCell>{coin.market_cap_rank}</TableCell>
            <TableCell>
              <Image src={coin.image} alt={`${coin.symbole} icon`} width={22} height={22} style={{'display':'inline'}}/>
              <span className='m-1'>{coin.name}</span>
              <span className='text-gray-400'>{coin.symbole}</span>
            </TableCell>
            <TableCell>{coin.current_price}</TableCell>
            <TableCell className={(coin.price_change_percentage_24h)< 0 ? 'text-red-600': 'text-green-600'}>{coin.price_change_percentage_24h} %</TableCell>
            <TableCell>{coin.market_cap}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
