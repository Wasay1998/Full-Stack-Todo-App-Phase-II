'use client';

import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
  'aria-label'?: string;
}

export const Checkbox = ({ checked, onChange, className = '', 'aria-label': ariaLabel }: CheckboxProps) => {
  return (
    <div className="flex items-center h-5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
        className={`h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-1 cursor-pointer transition-all duration-200 ${
          checked
            ? 'bg-blue-600 border-blue-600'
            : 'hover:border-blue-400'
        } ${className}`}
      />
    </div>
  );
};