import React , {useId , forwardRef}from 'react';


//forwardRef at last forwardRef(Select)
function Select({
    label,
    name = "",
    className = "",
    options,
    labelClass="",
    ...props
} , ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className={` ${labelClass} w-full inline-block`} >{label}</label>}
            <select ref={ref} className={`${className} rounded-lg p-1`} {...props} name={name} id={id}>
                {options.map(option =>
                    <option key={option} value={option} >{option}</option>
                )}
            </select>
        </div>
    )
}

export default forwardRef(Select); //easy way
