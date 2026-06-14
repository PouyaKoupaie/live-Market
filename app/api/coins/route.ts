import { getTopCoins } from "@/features/coins/services/coin-gecko";

export async function GET() {
  const coins = await getTopCoins();

  return Response.json(coins);
}