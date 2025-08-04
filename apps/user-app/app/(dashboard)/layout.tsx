import { SideItem } from "../../components/SideItem";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="grid grid-cols-12 h-screen">
        <div className="col-span-1 md:col-span-3 lg:col-span-2 mt-5 flex flex-col items-center">
            <div className="">
                <SideItem title="Home" href="/" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                <SideItem title="Transfer" href="/transfer" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
                <SideItem title="Transactions" href="/transactions" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                <SideItem title="P2P Transfer" href="/p2p" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/>
            </div>
        </div>
        <div className=" flex col-span-11 md:col-span-9 lg:col-span-10">
            <div className=" bg-gray-200 w-[1px] h-full"></div>
            <div className="w-full mx-2">
                {children}
            </div>
        </div>
    </div>
  );
}

