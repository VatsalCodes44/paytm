"use client"
import { Button } from "@repo/ui/Button"
import { Card } from "@repo/ui/Card"
import CenterComponents from "@repo/ui/CenterComponents"
import TextInput from "@repo/ui/TextInput"
import { useState } from "react";
import p2pTransfer from "../app/lib/actions/p2pTransfer"


function SendCard() {
  const [recieverNumber, setRecieverNumber] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [response, setResponse] = useState<string>("");
  return (
    <div className=" h-[550px]">
        <CenterComponents>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} type={"string"} label="Number" onChange={(value) => {
                        setRecieverNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} type={"number"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            if (String(recieverNumber).length != 10){
                                setResponse("Enter valid phone number")
                            }
                            else if (amount == 0 ){
                                setResponse("enter amount")
                            } else {
                                const a = await p2pTransfer(String(recieverNumber), amount*100)
                                console.log(a)
                                setResponse(a.message)
                            }
                        }}>Send</Button>
                    </div>
                    <div >
                        {response}
                    </div>
                </div>
            </Card>
        </CenterComponents>
    </div>
  )
}

export default SendCard