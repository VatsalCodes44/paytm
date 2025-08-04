import { Card } from '@repo/ui/Card'
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../app/lib/auth';
import { redirect } from 'next/navigation';

type Transaction =  {
    toUser: {
        number: string;
        name: string | null;
    };
    id: string;
    amount: number;
    timestamp: Date;
    fromUserId: string;
    toUserId: string;
    fromUser: {
        number: string;
        name: string | null;
    };
}[]
async function Transactions({transactions}: {
    transactions: Transaction
}) {

    const session = await getServerSession(authOptions)
    if (!session){
        redirect("/api/signin")
    }
    return (
        <Card title='Recent Transactions'>
            <div className='pt-2'>
                {transactions.map(t => {
                    return (
                        <div className='flex justify-between py-2'>
                            <div>
                                <div className="text-sm">
                                    {t.toUserId == session.user.id ? (t.fromUser.name ? t.fromUser.name: t.fromUser.number) : (t.toUser.name ? t.toUser.name: t.toUser.number)}
                                </div>
                                <div className="text-slate-600 text-xs">
                                    Id: {t.id}
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.timestamp.toDateString()}
                                </div>
                            </div>
                            <div className={`${t.toUserId == session.user.id ? "text-green-600" : ""} text-sm text-right flex items-center min-w-fit`}>
                                {t.toUserId == session.user.id ? "+ Rs "+(t.amount)/100 : "- Rs "+(t.amount)/100}
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </Card>
    )
}

export default Transactions