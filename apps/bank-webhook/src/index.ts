import express, { Request, Response } from "express"
import db from "@repo/db/client"
const app = express();

type PaymentInformation = {
    token: string;
    userId: string;
    amount: number
}

app.post("/hdfcWebHook",async (req: Request,res: Response) => {
    const paymentInformation: PaymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    try{
        const txn = await db.onRampTransaction.findUnique({
            where: {
                token: paymentInformation.userId
            }
        });
        if (txn?.status == "Processing") {
            await db.$transaction([
                db.balance.update({
                   where: {
                    userId: paymentInformation.userId
                   },
                   data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
            ])
            res.json({
                message: "captured"
            })
        } else {
            res.status(409).json({
                message: "failed"
            })
        }
    } catch {
        res.status(411).json({
            message: "error while processing webhook"
        })
    }
})


app.post("/axisWebHook",async (req: Request,res: Response) => {
    const paymentInformation: PaymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    try{
        await db.$transaction([
            db.balance.update({
               where: {
                userId: paymentInformation.userId
               },
               data: {
                amount: {
                    increment: paymentInformation.amount
                }
            }
        }),
        db.onRampTransaction.update({
            where: {
                token: paymentInformation.token
            }, 
            data: {
                status: "Success",
            }
        })
        ])
        res.json({
            message: "captured"
        })
    } catch {
        res.status(411).json({
            message: "error while processing webhook"
        })
    }
})

app.listen(3002);