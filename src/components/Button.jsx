import React from 'react';

const Button = ({text , bgColor="bg-blue-500" , textColor="text-white", className='', ...props}) => {
    return (
        <button className={`px-4 py-2 rounded-lg ${className} ${textColor} ${bgColor}`} >{text}</button>
    );
}

export default Button;
