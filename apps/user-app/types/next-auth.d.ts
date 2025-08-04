import "next-auth"

declare module "next-auth" {
    interface User {
        id: string,
        number: string,
    }
    interface Session {
        user: {
            id: string,
            number: string,
        }
    }
    
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
        id: string,
        number: string
  }
}