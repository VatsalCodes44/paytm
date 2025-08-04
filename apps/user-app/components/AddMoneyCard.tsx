"use client"

import { Button } from "@repo/ui/Button"
import { Card } from "@repo/ui/Card"
import Select from "@repo/ui/Select"
import TextInput from "@repo/ui/TextInput"
import { useState } from "react";
import { createOnrampTransaction } from "../app/lib/actions/createOnrampTransactions"


const SupportedBanks = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState<string>(SupportedBanks[0]?.redirectUrl || "")
    const [provider, setProvider] = useState<string>(SupportedBanks[0]?.name || "")
    const [amount, setAmount] = useState<number>(0)
    const [placeholder, setPlaceholder] = useState("Amount")
    console.log(amount);
    return <Card title="Add Money">
        <div className="w-full">
            <TextInput label="Amount" placeholder={placeholder} type="number" onChange={(value) => {
                if (value > 0 || undefined) {
                    setAmount(value);
                    setPlaceholder("Amount")
                } else {
                    setPlaceholder("Enter valid amount")
                }
            }} />
            <div className="py-4 text-left">
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SupportedBanks.find(x => x.name==value)?.redirectUrl || "")
                setProvider(SupportedBanks.find(x => x.name==value)?.name || "")
            }} options={SupportedBanks.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    if (amount > 0) {
                        createOnrampTransaction(provider, amount)
                    }
                    // window.location.href = redirectUrl || ""
                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}