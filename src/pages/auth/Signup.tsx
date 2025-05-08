import React from 'react';
import SignupForm from '../../components/auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream-50">
      <div className="container mx-auto px-4">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;