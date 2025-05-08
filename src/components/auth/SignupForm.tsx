import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRightCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const steps = [
  { name: 'Account Type', icon: User },
  { name: 'Personal Info', icon: Mail },
  { name: 'Password', icon: Lock },
  { name: 'Review', icon: ArrowRightCircle },
];

const SignupForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [role, setRole] = useState<'consumer' | 'vendor'>('consumer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return true; // Role selection always valid
      case 1:
        return name.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      case 2:
        return (
          password.length >= 8 &&
          confirmPassword === password
        );
      case 3:
        return acceptTerms;
      default:
        return false;
    }
  };
  
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      setError('');
    } else {
      switch (currentStep) {
        case 1:
          setError('Please enter a valid name and email address.');
          break;
        case 2:
          setError(
            password.length < 8
              ? 'Password must be at least 8 characters long.'
              : 'Passwords do not match.'
          );
          break;
        case 3:
          setError('You must accept the terms and conditions.');
          break;
      }
    }
  };
  
  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      setError('Please accept the terms and conditions.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(name, email, password, role);
      navigate(role === 'vendor' ? '/vendor/dashboard' : '/shop');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-forest-900">Choose Your Account Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                className={`p-6 border-2 rounded-lg text-left ${
                  role === 'consumer'
                    ? 'border-honey-500 bg-honey-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setRole('consumer')}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-honey-100 p-2 rounded-full">
                    <User size={20} className="text-honey-600" />
                  </div>
                  <div className={`h-4 w-4 rounded-full ${
                    role === 'consumer' ? 'bg-honey-500' : 'border-2 border-gray-300'
                  }`} />
                </div>
                <h4 className="font-medium text-forest-900">Consumer</h4>
                <p className="text-sm text-gray-600 mt-1">Buy our premium honey products</p>
              </button>
              
              <button
                type="button"
                className={`p-6 border-2 rounded-lg text-left ${
                  role === 'vendor'
                    ? 'border-honey-500 bg-honey-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setRole('vendor')}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-forest-100 p-2 rounded-full">
                    <User size={20} className="text-forest-600" />
                  </div>
                  <div className={`h-4 w-4 rounded-full ${
                    role === 'vendor' ? 'bg-honey-500' : 'border-2 border-gray-300'
                  }`} />
                </div>
                <h4 className="font-medium text-forest-900">Vendor</h4>
                <p className="text-sm text-gray-600 mt-1">Sell your honey through our platform</p>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {role === 'consumer' 
                ? 'Choose Consumer if you want to purchase our honey products.' 
                : 'Choose Vendor if you are a beekeeper or honey producer.'}
            </p>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-forest-900">Personal Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                placeholder="Your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-forest-900">Create Password</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-forest-900">Review Information</h3>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-600">Account Type:</div>
                <div className="font-medium text-forest-900 capitalize">{role}</div>
                
                <div className="text-gray-600">Name:</div>
                <div className="font-medium text-forest-900">{name}</div>
                
                <div className="text-gray-600">Email:</div>
                <div className="font-medium text-forest-900">{email}</div>
              </div>
            </div>
            
            <div className="flex items-start mt-6">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 mt-1 text-honey-500 focus:ring-honey-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-honey-600 hover:text-honey-700">Terms of Service</a> and {' '}
                <a href="#" className="text-honey-600 hover:text-honey-700">Privacy Policy</a>
              </label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif font-semibold text-forest-900">Create Your Account</h2>
          <p className="text-gray-600 mt-1">Join Ceylon Nectar today</p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 relative">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    isActive
                      ? 'bg-honey-500 text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <StepIcon size={20} />
                </div>
                <div className="text-xs mt-2 text-center">
                  {step.name}
                </div>
              </div>
            );
          })}
          
          {/* Progress bar */}
          <div className="absolute top-5 left-0 h-0.5 bg-gray-200 w-full -z-0">
            <div
              className="h-full bg-honey-500 transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={goToPrevStep}
              >
                Back
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                variant="primary"
                onClick={goToNextStep}
                className="ml-auto"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="ml-auto"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            )}
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-honey-600 hover:text-honey-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;