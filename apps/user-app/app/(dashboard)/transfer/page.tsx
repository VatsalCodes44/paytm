import db from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import BalanceCard from "../../../components/BalanceCard";
import OnRampTransactions from "../../../components/OnRampTransactions";


async function getBalance() {
  const session = await getServerSession(authOptions)
  const balance = await db.balance.findFirst({
    where: {
      userId: session?.user?.id,
    }
  });

  return {
        amount: balance?.amount || 0
    }
}

async function getOnRampTransactions () {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      startTime: "desc"
    }
  })
  return txns.map (t => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }))
}

async function Transaction() {
  const balance= await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
          Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
          <div>
            <AddMoney />
          </div>
          <div>
            <BalanceCard amount={balance.amount} />
            <div className="py-4">
              <OnRampTransactions transactions={transactions} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Transaction