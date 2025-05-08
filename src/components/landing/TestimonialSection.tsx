import React from 'react';
import { Testimonial } from '../../types';
import TestimonialCard from '../common/TestimonialCard';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-forest-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold text-forest-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from our community of honey enthusiasts, chefs, and wellness advocates
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-6 h-6 text-honey-500 fill-honey-500" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-lg font-medium text-forest-900">4.9 out of 5 stars from 200+ reviews</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;