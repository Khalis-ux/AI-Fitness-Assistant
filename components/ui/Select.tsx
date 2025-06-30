
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const Select: React.FC<SelectProps> = ({ label, name, children, ...props }) => {
  return (
    <div className="w-full mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full bg-bg-tertiary p-3 rounded-lg border border-bg-tertiary focus:border-brand-primary focus:ring-brand-primary transition"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};
