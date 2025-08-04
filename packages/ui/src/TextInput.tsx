"use client"

function TextInput({placeholder, onChange, label, type}: {placeholder: string, onChange: (value: number) => void, label: string, type: string}) {
  return (
    <div className="pt-2">
        <label className={`block mb-2 text-sm font-medium text-gray-900`}>{label}</label>
        <input type={type} onChange={(e) => {
          onChange(parseInt(e.target.value))
        }} id="first_name" className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 `} placeholder={placeholder}/>
    </div>
  )
}

export default TextInput