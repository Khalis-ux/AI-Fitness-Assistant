
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
  return (
    <div className="w-full mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="w-full bg-bg-tertiary p-3 rounded-lg border border-bg-tertiary focus:border-brand-primary focus:ring-brand-primary transition"
        {...props}
      />
    </div>
  );
};
