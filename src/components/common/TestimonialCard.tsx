import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, image, role, content, rating } = testimonial;
  
  // Generate star rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={i < rating ? 'text-honey-500 fill-honey-500' : 'text-gray-300'} 
        />
      );
    }
    return stars;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full transition-transform hover:translate-y-[-5px] duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-lg text-forest-900">{name}</h3>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {renderStars()}
      </div>
      
      <p className="text-gray-700 italic flex-grow">"{content}"</p>
    </div>
  );
};

export default TestimonialCard;