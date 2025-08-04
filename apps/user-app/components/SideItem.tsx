"use client"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
export function SideItem ({title,href,d}:{title:string, href:string, d:string}){
    const router = useRouter();
    const pathName = usePathname();
    return (
        <div onClick={() => {
            router.push(href);
        }} className={`flex justify-center md:justify-normal gap-4 mt-4 hover:cursor-pointer hover:underline hover:underline-offset-4 ${pathName == href ? "text-[#6a51a6] font-medium underline underline-offset-4" : "text-gray-600"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 20" stroke-width={`${pathName == href ? "2.5" : "1.5"}`} stroke="currentColor" className="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d={d} />
            </svg>
            <div className="hidden md:block">
                {title}
            </div>
        </div>
    )
}