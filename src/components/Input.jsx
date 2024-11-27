import React , {useId , forwardRef} from 'react';

function Input({
    label,
    type = "text",
    className="",
    ...props
} , ref){
    const id = useId();
    return (
        <>
        {label ? (<label htmlFor={id} className='p-2 mx-2 my-2'>{label}</label>) : null}
        <input ref={ref} id={id} type={type} className={`${className} p-2 m-2`} {...props} />
        </>
    )
}

export default forwardRef(Input); //when exporting wrap it inside forwardRef.
