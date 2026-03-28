import React from 'react';

const Button = ({ children, className = "", onClick, "data-cursor-text": cursorText, ...props }) => {
    return (
        <button
            onClick={onClick}
            data-cursor-text={cursorText}
            className={`px-6 py-3 rounded-full font-modern transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.02] ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
