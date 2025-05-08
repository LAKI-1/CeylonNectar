import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-honey-500 hover:bg-honey-600 text-white focus:ring-honey-500',
    secondary: 'bg-forest-700 hover:bg-forest-800 text-white focus:ring-forest-700',
    tertiary: 'bg-cream-100 hover:bg-cream-200 text-forest-900 focus:ring-cream-200',
    outline: 'bg-transparent border-2 border-honey-500 text-honey-600 hover:bg-honey-50 focus:ring-honey-500',
  };
  
  // Full width and disabled classes
  const utilityClasses = [
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
  ].join(' ');
  
  // Combine all classes
  const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${utilityClasses} ${className}`;
  
  // Icon content
  const iconContent = icon && (
    <span className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`}>
      {icon}
    </span>
  );
  
  // Content based on icon position
  const content = (
    <>
      {iconPosition === 'left' && iconContent}
      {children}
      {iconPosition === 'right' && iconContent}
    </>
  );
  
  // Render as link if 'to' or 'href' is provided
  if (to) {
    return (
      <Link to={to} className={allClasses}>
        {content}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={allClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  
  // Otherwise render as button
  return (
    <button
      type={type}
      className={allClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;