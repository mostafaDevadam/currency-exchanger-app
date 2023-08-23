import React from 'react'



type SelectItem = string | number | readonly string[] | undefined

interface SelectProps<T extends SelectItem> {
    options: T[];
    value: T;
    onChange: (value: T) => void;
}

// Select Component
function Select<T extends SelectItem>({ options, value, onChange }: SelectProps<T>) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value as T;
        onChange(selectedValue)
    }

    return (
        <select value={value} onChange={handleChange}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default Select
