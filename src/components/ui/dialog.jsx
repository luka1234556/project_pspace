import React from 'react';

export function Dialog({ children, open, onOpenChange }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`} onClick={() => onOpenChange(false)}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => onOpenChange(false)}></div>
      <div className="relative z-10 bg-white dark:bg-gray-800 p-8 mx-auto rounded-lg max-w-md">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function DialogHeader({ children }) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}