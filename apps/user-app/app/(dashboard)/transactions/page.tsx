import db from '@repo/db/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import { redirect } from 'next/navigation'
import Transactions from '../../../components/Transactions'


async function page() {
  const session = await getServerSession(authOptions)
  if (!session){
    redirect("/api/signin")
  }
  const transactions = await db.p2P.findMany({
    where: {
      OR: [{
        toUserId: session.user.id
      }, {
        fromUserId: session.user.id
      }]
    },
    orderBy: {
      timestamp: "desc"
    },
    select: {
      id: true,
      amount: true,
      timestamp: true,
      fromUserId: true,
      toUserId: true,
      fromUser: {
        select: {
          name: true,
          number: true
        }
      }, 
      toUser: {
        select: {
          name: true,
          number: true
        }
      }
    }
  })
  return (
    <div className='flex justify-center p-4'>
      <div className='w-full max-w-xl'>
        <Transactions transactions={transactions} />
      </div>
    </div>
  )
}

export default page