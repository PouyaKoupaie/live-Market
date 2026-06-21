import Link from 'next/link'

import { HomeCard } from '@/shared/ui/HomeCard'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans ">
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
