import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick,
  padding = 'md',
}) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variantClasses = {
    default: 'bg-white',
    elevated: 'bg-white shadow-md',
    outlined: 'bg-white border border-gray-200',
  };
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };
  
  const clickableClasses = onClick ? 'cursor-pointer transition-transform hover:scale-[1.01]' : '';
  
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${clickableClasses} ${className}`;
  
  return (
    <div className={allClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;