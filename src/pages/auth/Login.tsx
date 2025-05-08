import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const Login: React.FC = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/shop';
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream-50">
      <div className="container mx-auto px-4">
        <LoginForm redirectPath={from} />
      </div>
    </div>
  );
};

export default Login;