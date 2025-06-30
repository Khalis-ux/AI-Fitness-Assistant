
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-bg-secondary rounded-xl shadow-lg border border-bg-tertiary ${className}`}>
      {children}
    </div>
  );
};
