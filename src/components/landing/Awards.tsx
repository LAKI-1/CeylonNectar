import React from 'react';
import { Award, Medal, Star, CheckCircle } from 'lucide-react';

interface AwardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AwardItem: React.FC<AwardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="bg-honey-100 p-3 rounded-full text-honey-600">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-medium text-lg text-forest-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Awards: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold text-forest-900 mb-4">
            Quality & Recognition
          </h2>
          <p className="text-lg text-gray-600">
            Our commitment to excellence has earned us recognition from industry experts and certifying bodies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <AwardItem 
            icon={<Award size={24} />}
            title="Best Specialty Food 2023"
            description="Awarded by the International Food & Beverage Quality Institute for our Cinnamon Blossom Honey."
          />
          
          <AwardItem 
            icon={<Medal size={24} />}
            title="Gold Medal - Agricultural Excellence"
            description="Recognized for sustainable farming practices and support of local beekeeping communities."
          />
          
          <AwardItem 
            icon={<Star size={24} />}
            title="Organic Certification"
            description="All our honey varieties meet the strictest standards for organic production and sustainability."
          />
          
          <AwardItem 
            icon={<CheckCircle size={24} />}
            title="Quality Assurance Certification"
            description="Each batch is laboratory tested for purity, ensuring only the finest honey reaches your table."
          />
        </div>
        
        {/* Certification logos */}
        <div className="mt-16 py-8 border-t border-b border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-gray-600 font-semibold">USDA</span>
              </div>
              <p className="text-sm text-gray-600">USDA Organic</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-gray-600 font-semibold">ISO</span>
              </div>
              <p className="text-sm text-gray-600">ISO Certified</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-gray-600 font-semibold">FT</span>
              </div>
              <p className="text-sm text-gray-600">Fair Trade</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-gray-600 font-semibold">NON GMO</span>
              </div>
              <p className="text-sm text-gray-600">Non-GMO Project</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;