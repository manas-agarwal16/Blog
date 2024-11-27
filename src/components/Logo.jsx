import React from 'react';

const Logo = ({width = '100px'}) => {
    return (
        <div style={{ "--width": width }} className="w-[var(--width)]">
            Logo
        </div>
    );
}

export default Logo;
