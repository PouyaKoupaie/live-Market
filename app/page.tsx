import Image from 'next/image'
import Link from 'next/link'

import { HomeCard } from '@/components/ui/HomeCard'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background dark:bg-black">
      <main className="flex justify-around w-full">
        <Link href="/coins">
          <HomeCard
            title="Crypto"
            description="live price of major crypto currancy"
            imgSource="https://www.svgrepo.com/show/452169/bitcoin.svg"
          />
        </Link>
        <Link href="/companies">
          <HomeCard
            title="Market cap"
            description="companies value from around the world"
            imgSource="https://www.svgrepo.com/show/444223/chart-combo.svg"
          />
        </Link>
      </main>
    </div>
  )
}
