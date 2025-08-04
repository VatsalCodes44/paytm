import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
async function main () {
    const alice = await prisma.user.upsert({
        where: {number: "9999999999"},
        update:{},
        create: {
            number: "999999999",
            name: 'alice',
            password: await hash("alice",10),
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20000,
                    token: "122",
                    provider: "HDFC Bank"
                }
            }
        }
    })
    const aliceBalanceAccount = await prisma.balance.create({
        data:{
            userId: alice.id,
            amount: 0,
            locked: 0
            
        }
    })
    const bob = await prisma.user.upsert({
        where: { number: '9999999998' },
        update: {},
        create: {
            number: '9999999998',
            name: 'bob',
            password: await hash("bob",10),
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Failure",
                    amount: 2000,
                    token: "123",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    const bobBalanceAccount = await prisma.balance.create({
        data:{
            userId: bob.id,
            amount: 0,
            locked: 0
            
        }
    })
    console.log(alice,bob)
}
main ().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})