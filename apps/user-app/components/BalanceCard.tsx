import { Card } from "@repo/ui/Card"


function BalanceCard({amount}: {amount: number}) {
  return (
    <Card title="Balance">
        <div className="flex justify-between border border-b border-slate-300 px-2">
            <div>
                Total Balance
            </div>
            <div>
                {(amount) / 100} INR
            </div>
        </div>
    </Card>
  )
}

export default BalanceCard