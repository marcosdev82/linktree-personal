export function Input( { placeholder, value, ...rest } ) { 
    return (
        <input
            type="text"
            className="w-full h-9 rounded-lg bg-white border border-gray-300 rounded-3 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            placeholder={placeholder}
            value={value}
            {...rest}
        />
    )
}