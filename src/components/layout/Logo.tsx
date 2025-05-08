import React from 'react';

interface LogoProps {
  className?: string;
  isWhite?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', isWhite = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="40" height="48" className="mr-2">
        <path d="M50 0 L95 30 L95 90 L50 120 L5 90 L5 30 Z" fill="#F59E0B" />
        <path d="M40 40 C40 30 60 30 60 40 C60 50 45 60 45 60 L55 60 C55 60 40 70 40 75 C40 80 45 85 50 85 C55 85 60 80 60 75" stroke={isWhite ? "#FFFFFF" : "#064E3B"} strokeWidth="5" fill="none" />
        <path d="M60 50 C70 50 70 60 65 65 C60 70 50 65 50 60" stroke={isWhite ? "#FFFFFF" : "#064E3B"} strokeWidth="5" fill="none" />
      </svg>
      <div className="font-serif font-semibold text-xl">
        <span className={isWhite ? "text-white" : "text-forest-900"}>Ceylon</span>
        <span className={`block -mt-1 ${isWhite ? "text-honey-300" : "text-honey-600"}`}>Nectar</span>
      </div>
    </div>
  );
};

export default Logo;