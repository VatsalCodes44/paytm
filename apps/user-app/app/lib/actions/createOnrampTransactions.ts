"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth";
import db from "@repo/db/client";

export async function createOnrampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user?.id) {
       return {
        message: "Unauthenticated Request"
       } 
    }
    // console.log(amount, "")
    // Ideally the token should come from the banking provider (hdfc/axis)
    const token = (Math.random()*1000).toString();

    await db.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token,
            userId: session.user.id,
            amount: amount*100
        }
    })

    return {
        message: "Done"
    }
}