
function CenterComponents({children}:{children: React.ReactNode}) {
  return (
    <div className="flex justify-center items-center h-full">
        <div className="">
            {children}
        </div>
    </div>
  )
}

export default CenterComponents