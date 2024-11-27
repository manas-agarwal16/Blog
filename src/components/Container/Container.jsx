import React from 'react';

const Container = ({children}) => {
    return (
        <div className='p-4 w-full max-w-7xl mx-auto'>
            {children}
        </div>
    );
}

export default Container;
