import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const slides = [
  {
    id: 1,
    title: "Pure Sri Lankan Honey",
    subtitle: "Directly from the highlands of Sri Lanka to your table",
    image: "https://images.pexels.com/photos/6413701/pexels-photo-6413701.jpeg",
    cta: "Explore Our Collection"
  },
  {
    id: 2,
    title: "Supporting Local Beekeepers",
    subtitle: "Fair partnerships with Sri Lankan beekeeping communities",
    image: "https://images.pexels.com/photos/353076/pexels-photo-353076.jpeg",
    cta: "Learn About Our Impact"
  },
  {
    id: 3,
    title: "Unprocessed. Unfiltered. Unparalleled.",
    subtitle: "Experience the authentic taste of nature's sweetest gift",
    image: "https://images.pexels.com/photos/2487443/pexels-photo-2487443.jpeg",
    cta: "Shop Premium Honey"
  }
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="relative h-screen-80 min-h-[600px] overflow-hidden">
      {/* Background slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            currentSlide === index 
              ? 'opacity-100 z-10' 
              : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-forest-950/30 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
        <div className={`max-w-2xl transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-cream-50 mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <Button
            to="/shop"
            variant="primary"
            size="lg"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            {slides[currentSlide].cta}
          </Button>
          
          {/* Slide indicators */}
          <div className="flex space-x-2 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'w-8 bg-honey-500' 
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;