import { Card } from '@repo/ui/Card'
import React from 'react'

enum Status {
    Success,
    Processing,
    Failure
}
function OnRampTransactions({transactions}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) {
    
    if (!transactions.length){
        return <Card title="Recent Transfers">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div> 
        </Card>
    }
    return (
        <Card title='Recent Transactions'>
            <div className='pt-2'>
                {transactions.map(t => 
                    <div className='flex justify-between py-2'>
                        <div>
                            <div className="text-sm">
                               {t.provider} Transfer Received INR  
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center text-right">
                            + Rs {t.amount / 100}
                            <div className={`${t.status == "Failure" ? "text-red-500 " : t.status == "Processing" ? "text-orange-500 " : "hidden"} text-xs`}>
                                {t.status == "Failure" ? "Failed!" : t.status == "Processing" ? "Processing" : ""}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default OnRampTransactions;