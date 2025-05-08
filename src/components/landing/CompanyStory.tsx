import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const CompanyStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Simple parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      
      const scrollPosition = window.scrollY;
      const sectionPosition = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Only apply effect when section is in view
      if (scrollPosition > sectionPosition - window.innerHeight && 
          scrollPosition < sectionPosition + sectionHeight) {
        
        const imageLeft = section.querySelector<HTMLImageElement>('.parallax-left');
        const imageRight = section.querySelector<HTMLImageElement>('.parallax-right');
        
        if (imageLeft && imageRight) {
          const distance = scrollPosition - (sectionPosition - window.innerHeight);
          
          // Adjust these values to control the parallax intensity
          imageLeft.style.transform = `translateY(${distance * 0.05}px)`;
          imageRight.style.transform = `translateY(${distance * -0.03}px)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section ref={sectionRef} id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif font-semibold text-forest-900 mb-4">
            Our Story
          </h2>
          <p className="text-lg text-gray-600">
            From the lush forests and vibrant meadows of Sri Lanka to your table — a journey of sustainability, quality, and tradition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/1415810/pexels-photo-1415810.jpeg" 
              alt="Sri Lankan tea plantations" 
              className="rounded-lg shadow-lg parallax-left"
            />
            <img 
              src="https://images.pexels.com/photos/12967/pexels-photo-12967.jpeg" 
              alt="Sri Lankan beekeeper" 
              className="absolute -bottom-8 -right-8 w-2/3 rounded-lg shadow-lg border-4 border-white parallax-right"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-serif font-semibold text-forest-900 mb-4">
              Sustainable Partnerships
            </h3>
            <p className="text-gray-700 mb-4">
              Ceylon Nectar was founded on a simple principle: to create a direct bridge between Sri Lanka's skilled beekeepers and conscious consumers worldwide.
            </p>
            <p className="text-gray-700 mb-6">
              We partner with over 200 local beekeepers across Sri Lanka, ensuring fair compensation, sustainable practices, and the preservation of ancient beekeeping traditions that have been passed down through generations.
            </p>
            <Button
              to="#impact"
              variant="outline"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Learn About Our Impact
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-serif font-semibold text-forest-900 mb-4">
              Quality & Tradition
            </h3>
            <p className="text-gray-700 mb-4">
              Each jar of Ceylon Nectar honey carries the distinct character of its origin — from the cinnamon estates of the south to the tea plantations of the central highlands.
            </p>
            <p className="text-gray-700 mb-6">
              Our commitment to quality means we never mass-process our honey. All our products are raw, unfiltered, and harvested with care to preserve the unique enzymes, pollens, and flavors that make Sri Lankan honey special.
            </p>
            <Button
              to="/shop"
              variant="primary"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Explore Our Collection
            </Button>
          </div>
          
          <div className="relative order-1 md:order-2">
            <img 
              src="https://images.pexels.com/photos/8963956/pexels-photo-8963956.jpeg" 
              alt="Honey processing" 
              className="rounded-lg shadow-lg parallax-right"
            />
            <img 
              src="https://images.pexels.com/photos/7963572/pexels-photo-7963572.jpeg" 
              alt="Honey varieties" 
              className="absolute -bottom-8 -left-8 w-2/3 rounded-lg shadow-lg border-4 border-white parallax-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;