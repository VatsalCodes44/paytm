"use server"
import db from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export default async function p2pTransfer(reciever: string, amount: number) {
    const session = await getServerSession(authOptions);
    const sender = session?.user.number;
    
    if (!sender) {
        return {
            message: "Error while sending"
        }
    }
    
    const fromUser = await db.user.findUnique({
        where: {
            number: sender
        }
    })

    const toUser = await db.user.findUnique({
        where: {
            number: reciever
        }
    })
    
    if (!toUser || !fromUser) {
        return {
            message: "User not exist"
        }
    }
    
    try {
        await db.$transaction(async (tx) => {

            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${toUser.id} FOR UPDATE`;

            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: fromUser.id
                }
            })

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient funds")
            }
            await tx.balance.update({
                where: {
                    userId: fromUser.id
                }, data: {
                    amount: {
                        decrement: amount
                    }
                }
            })
    
            await tx.balance.update({
                where: {
                    userId: toUser.id
                }, data: {
                    amount: {
                        increment: amount
                    }
                }
            })
            
            await tx.p2P.create({
                data: {
                    amount,
                    timestamp: new Date(),
                    fromUserId: fromUser.id,
                    toUserId: toUser.id
                }
            })
            
        })
        return {
            message: "Transfer Succesful"
        }
    } catch {
        return {
            message: "Payment Failed"
        }
    }
}
