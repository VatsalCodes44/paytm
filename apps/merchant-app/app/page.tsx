"use client";

import { useBalance } from "@repo/store/balance";
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "../lib/auth";
export default function() {
  const session = useSession();
  const balance = useBalance();
  console.log(session.data?.user)
  return <div>
    hi there {balance}
    <img className="h-20 w-20" src={session.data?.user?.image || " "} />
    <br />
    <button onClick={() => {
      session.data?.user?.name ? signOut() : signIn()
    }}>{session.data?.user?.name ? "signin" : "signout"}</button>
  </div>
}