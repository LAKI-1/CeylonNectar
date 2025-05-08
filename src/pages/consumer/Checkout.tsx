import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Check, ChevronRight, Lock, Package } from 'lucide-react';
import Button from '../../components/common/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

type CheckoutStep = 'shipping' | 'payment' | 'review';

const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal'>('credit');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
  };
  
  const handlePlaceOrder = () => {
    // Here you would typically submit the order to your backend
    alert('Order placed successfully!');
    clearCart();
  };
  
  const shippingCost = shippingMethod === 'standard' ? 5.99 : 12.99;
  const subtotal = cart.totalPrice;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;
  
  return (
    <div className="pt-24 pb-16 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-serif font-semibold text-forest-900 mb-6">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex justify-between relative mb-4">
              {['shipping', 'payment', 'review'].map((step, index) => (
                <div 
                  key={step} 
                  className="flex flex-col items-center relative z-10"
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step === currentStep
                      ? 'border-honey-500 bg-honey-500 text-white'
                      : index < ['shipping', 'payment', 'review'].indexOf(currentStep)
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}>
                    {index < ['shipping', 'payment', 'review'].indexOf(currentStep) ? (
                      <Check size={18} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="text-xs mt-2 capitalize">
                    {step}
                  </div>
                </div>
              ))}
              
              {/* Progress bar */}
              <div className="absolute top-5 left-0 h-0.5 bg-gray-200 w-full -z-0">
                <div
                  className="h-full bg-honey-500 transition-all duration-300"
                  style={{ 
                    width: currentStep === 'shipping' 
                      ? '0%' 
                      : currentStep === 'payment' 
                      ? '50%' 
                      : '100%' 
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {currentStep === 'shipping' && (
                  <form onSubmit={handleShippingSubmit}>
                    <h2 className="text-xl font-medium text-forest-900 mb-6">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State / Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-forest-900 mb-3">Shipping Method</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            id="standard"
                            name="shippingMethod"
                            type="radio"
                            className="h-4 w-4 text-honey-500 focus:ring-honey-500 border-gray-300"
                            checked={shippingMethod === 'standard'}
                            onChange={() => setShippingMethod('standard')}
                          />
                          <label htmlFor="standard" className="ml-3 block">
                            <span className="text-sm font-medium text-gray-900">Standard Shipping</span>
                            <span className="block text-sm text-gray-500">5-7 business days</span>
                          </label>
                          <span className="ml-auto text-sm font-medium text-gray-900">$5.99</span>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="express"
                            name="shippingMethod"
                            type="radio"
                            className="h-4 w-4 text-honey-500 focus:ring-honey-500 border-gray-300"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                          />
                          <label htmlFor="express" className="ml-3 block">
                            <span className="text-sm font-medium text-gray-900">Express Shipping</span>
                            <span className="block text-sm text-gray-500">2-3 business days</span>
                          </label>
                          <span className="ml-auto text-sm font-medium text-gray-900">$12.99</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Link to="/shop">
                        <Button variant="outline">
                          Continue Shopping
                        </Button>
                      </Link>
                      <Button type="submit" variant="primary">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                )}
                
                {currentStep === 'payment' && (
                  <form onSubmit={handlePaymentSubmit}>
                    <h2 className="text-xl font-medium text-forest-900 mb-6">Payment Method</h2>
                    
                    <div className="space-y-4 mb-8">
                      <div 
                        className={`border rounded-md p-4 ${
                          paymentMethod === 'credit' 
                            ? 'border-honey-500 bg-honey-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            id="credit"
                            name="paymentMethod"
                            type="radio"
                            className="h-4 w-4 text-honey-500 focus:ring-honey-500 border-gray-300"
                            checked={paymentMethod === 'credit'}
                            onChange={() => setPaymentMethod('credit')}
                          />
                          <label htmlFor="credit" className="ml-3 flex items-center">
                            <span className="text-sm font-medium text-gray-900 mr-2">Credit Card</span>
                            <CreditCard size={18} className="text-gray-600" />
                          </label>
                        </div>
                        
                        {paymentMethod === 'credit' && (
                          <div className="mt-4 pl-7 space-y-4">
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Card Number
                              </label>
                              <input
                                type="text"
                                id="cardNumber"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                                placeholder="1234 5678 9012 3456"
                                value={cardInfo.number}
                                onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                                Name on Card
                              </label>
                              <input
                                type="text"
                                id="cardName"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                                value={cardInfo.name}
                                onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                  Expiration Date
                                </label>
                                <input
                                  type="text"
                                  id="expiry"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                                  placeholder="MM/YY"
                                  value={cardInfo.expiry}
                                  onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                                  required
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                                  CVC
                                </label>
                                <input
                                  type="text"
                                  id="cvc"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent"
                                  placeholder="123"
                                  value={cardInfo.cvc}
                                  onChange={(e) => setCardInfo({...cardInfo, cvc: e.target.value})}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`border rounded-md p-4 ${
                          paymentMethod === 'paypal' 
                            ? 'border-honey-500 bg-honey-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            id="paypal"
                            name="paymentMethod"
                            type="radio"
                            className="h-4 w-4 text-honey-500 focus:ring-honey-500 border-gray-300"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                          />
                          <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-900">
                            PayPal
                          </label>
                        </div>
                        
                        {paymentMethod === 'paypal' && (
                          <div className="mt-4 pl-7">
                            <p className="text-sm text-gray-600">
                              You will be redirected to PayPal to complete your payment securely.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <div className="flex items-center mb-4">
                        <input
                          id="savePayment"
                          name="savePayment"
                          type="checkbox"
                          className="h-4 w-4 text-honey-500 focus:ring-honey-500 border-gray-300 rounded"
                        />
                        <label htmlFor="savePayment" className="ml-2 block text-sm text-gray-700">
                          Save this payment method for future purchases
                        </label>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Lock size={16} className="mr-2 text-forest-600" />
                        Your payment information is secured with industry-standard encryption
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep('shipping')}
                      >
                        Back to Shipping
                      </Button>
                      <Button type="submit" variant="primary">
                        Review Order
                      </Button>
                    </div>
                  </form>
                )}
                
                {currentStep === 'review' && (
                  <div>
                    <h2 className="text-xl font-medium text-forest-900 mb-6">Review Your Order</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-forest-900 mb-3">Order Summary</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                              </th>
                              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                              </th>
                              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {cart.items.map((item) => (
                              <tr key={item.product.id}>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
                                      <img 
                                        src={item.product.images[0]} 
                                        alt={item.product.name} 
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                                      <div className="text-sm text-gray-500">{item.product.type}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                  {item.quantity}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-lg font-medium text-forest-900 mb-3">Shipping Information</h3>
                        <div className="bg-gray-50 rounded-md p-4">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</span><br />
                            {shippingInfo.address}<br />
                            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}<br />
                            {shippingInfo.country}<br />
                            <span className="mt-2 block">{shippingInfo.phone}</span>
                            <span>{shippingInfo.email}</span>
                          </p>
                          <div className="mt-3 flex items-center text-sm text-forest-600">
                            <Package size={16} className="mr-2" />
                            <span>
                              {shippingMethod === 'standard' ? 'Standard Shipping (5-7 days)' : 'Express Shipping (2-3 days)'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-forest-900 mb-3">Payment Method</h3>
                        <div className="bg-gray-50 rounded-md p-4">
                          {paymentMethod === 'credit' ? (
                            <div className="flex items-start">
                              <CreditCard size={20} className="text-gray-600 mr-3 mt-0.5" />
                              <div className="text-sm text-gray-700">
                                <span className="font-medium">Credit Card</span><br />
                                **** **** **** {cardInfo.number.slice(-4)}<br />
                                {cardInfo.name}<br />
                                Expires: {cardInfo.expiry}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center mr-3">
                                <span className="font-bold">P</span>
                              </div>
                              <span className="text-sm font-medium text-gray-700">PayPal</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep('payment')}
                      >
                        Back to Payment
                      </Button>
                      <Button 
                        variant="primary"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-medium text-forest-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                    <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-bold text-forest-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center mb-4">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Quality guarantee</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center">
                    <Lock size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Secure checkout</span>
                  </div>
                </div>
                
                {!isAuthenticated && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 mb-3">
                      Already have an account?{' '}
                      <Link to="/login" className="text-honey-600 hover:text-honey-700 font-medium">
                        Sign in
                      </Link>{' '}
                      for a faster checkout experience.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;