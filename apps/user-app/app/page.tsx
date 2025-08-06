"use client"

import { getSession, useSession } from "next-auth/react";

export default function Page(): JSX.Element {
  const session = useSession()
  // console.log(session.data?.user)
  return (
   <div>
      hi
      <div>
        hi
      </div>
      <div>
        hi
      </div>
      <div>
        hi
      </div>
      <div>
        hi
      </div>
   </div>
  );
}
