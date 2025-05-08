import React from 'react';
//import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/landing/HeroSection';
import FeaturedProducts from '../components/landing/FeaturedProducts';
import CompanyStory from '../components/landing/CompanyStory';
import TestimonialSection from '../components/landing/TestimonialSection';
import Awards from '../components/landing/Awards';
import Button from '../components/common/Button';
import { products, testimonials } from '../data/mockData';

const Landing: React.FC = () => {
  return (
    <>
      <HeroSection />
      
      <FeaturedProducts products={products} />
      
      <CompanyStory />
      
      <TestimonialSection testimonials={testimonials} />
      
      <Awards />
      
      {/* Call to action section */}
      <section className="py-20 bg-honey-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
            Experience Nature's Sweetest Gift
          </h2>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-8">
            Begin your journey through the unique honey varieties of Sri Lanka and taste the difference that traditional beekeeping makes.
          </p>
          <Button
            to="/shop"
            variant="secondary"
            size="lg"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Explore Our Collection
          </Button>
        </div>
      </section>
    </>
  );
};

export default Landing;