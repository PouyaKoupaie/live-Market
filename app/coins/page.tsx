import { CoinTable } from "@/features/coins/components/coin-table";
import { getTopCoins } from "@/features/coins/services/coin-gecko";

export default async function Home() {
  const coins = await getTopCoins();

  return (
    <div>
      <CoinTable coins={coins}></CoinTable>
    </div>
  );
}