import React from 'react';

const Container = ({children}) => {
    return (
        <div className='w-full bg-gray-200 min-h-screen max-w-7xl mx-auto m-0'>
            {children}
        </div>
    );
}

export default Container;
