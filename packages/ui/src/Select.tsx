

function Select({options, onSelect}: {options: {
    key: string,
    value: string
}[], onSelect: (value: string) => void }) {
  return (
    <select onChange={(e) => {
        onSelect(e.target.value)
    }} className='bg-gray-50 border border-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5'>
        {options.map(option => <option className="" value={option.key}>{option.value}</option>)}
    </select>
  )
}

export default Select