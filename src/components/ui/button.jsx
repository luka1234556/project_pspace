import React from 'react';

export function Button({ children, onClick, className, variant }) {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold cursor-pointer';
  const variantStyles = variant === 'secondary' ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white';

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}