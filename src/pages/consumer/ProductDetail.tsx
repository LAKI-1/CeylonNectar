import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, Droplet, Check, ShoppingCart, Truck, RotateCcw, AlertCircle, Shield, Minus, Plus } from 'lucide-react';
import Button from '../../components/common/Button';
import ProductCard from '../../components/common/ProductCard';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/mockData';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  
  if (!product) {
    return (
      <div className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium text-forest-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for does not exist or has been removed.</p>
          <Link to="/shop" className="text-honey-600 hover:text-honey-700">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(product.stock, value)));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  // Find related products (same type but different id)
  const relatedProducts = products
    .filter(p => p.type === product.type && p.id !== product.id)
    .slice(0, 3);
  
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100) 
    : product.price;
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-honey-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/shop" className="hover:text-honey-600">Shop</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to={`/shop?type=${product.type}`} className="hover:text-honey-600">{product.type}</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4 aspect-square">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden ${
                    index === activeImage ? 'ring-2 ring-honey-500' : ''
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-1">{product.type} • {product.origin}</div>
              <h1 className="text-3xl font-serif font-semibold text-forest-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={18} 
                      className={star <= 4 ? "text-honey-500 fill-honey-500" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">4.0 (24 reviews)</span>
              </div>
              
              <div className="flex items-baseline mb-4">
                {product.discount ? (
                  <>
                    <span className="text-2xl font-bold text-forest-900">${discountedPrice.toFixed(2)}</span>
                    <span className="ml-3 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-3 px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                      {product.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-forest-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>
            </div>
            
            {/* Quality Metrics */}
            <div className="bg-cream-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-forest-900 mb-3">Quality Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-cream-100 rounded-full flex items-center justify-center mr-3">
                    <Droplet size={16} className="text-honey-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Purity</div>
                    <div className="font-medium">{product.qualityMetrics.purity}%</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-cream-100 rounded-full flex items-center justify-center mr-3">
                    <Droplet size={16} className="text-honey-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Density</div>
                    <div className="font-medium">{product.qualityMetrics.density} g/ml</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-cream-100 rounded-full flex items-center justify-center mr-3">
                    <Droplet size={16} className="text-honey-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Moisture</div>
                    <div className="font-medium">{product.qualityMetrics.moisture}%</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-cream-100 rounded-full flex items-center justify-center mr-3">
                    <Droplet size={16} className="text-honey-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Color</div>
                    <div className="font-medium">{product.qualityMetrics.color}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md w-32">
                    <button
                      type="button"
                      className="p-2 text-gray-600 hover:text-gray-800"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      className="w-full text-center border-0 focus:ring-0"
                      value={quantity}
                      min="1"
                      max={product.stock}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    />
                    <button
                      type="button"
                      className="p-2 text-gray-600 hover:text-gray-800"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </div>
                  {product.stock > 10 ? (
                    <div className="text-green-600 flex items-center">
                      <Check size={16} className="mr-1" />
                      In Stock
                    </div>
                  ) : product.stock > 0 ? (
                    <div className="text-orange-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      Low Stock ({product.stock} left)
                    </div>
                  ) : (
                    <div className="text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      Out of Stock
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  variant="primary"
                  fullWidth
                  icon={<ShoppingCart size={18} />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Truck size={20} className="text-forest-700 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-forest-900">Free Shipping</h4>
                    <p className="text-sm text-gray-600">On orders over $50</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <RotateCcw size={20} className="text-forest-700 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-forest-900">Easy Returns</h4>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield size={20} className="text-forest-700 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-forest-900">Quality Guarantee</h4>
                    <p className="text-sm text-gray-600">Tested and certified</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Truck size={20} className="text-forest-700 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-forest-900">Direct from Source</h4>
                    <p className="text-sm text-gray-600">Sri Lankan beekeepers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex -mb-px">
              <button
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'description'
                    ? 'border-b-2 border-honey-500 text-honey-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'details'
                    ? 'border-b-2 border-honey-500 text-honey-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Additional Information
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-honey-500 text-honey-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (24)
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="mb-4">
                  Our {product.name} is carefully harvested by experienced beekeepers from the {product.origin}. This exquisite honey variety captures the essence of Sri Lanka's diverse ecosystem, delivering a unique flavor profile and numerous health benefits.
                </p>
                <p className="mb-4">
                  The bees forage among the pristine landscapes, collecting nectar from various blossoms and plants native to the region. This results in a honey that is not just delicious, but also packed with natural enzymes, antioxidants, and beneficial compounds.
                </p>
                <h3 className="text-xl font-medium text-forest-900 mb-3">Tasting Notes</h3>
                <p className="mb-4">
                  {product.type === 'Wild Forest' && 'A robust, aromatic honey with deep earthy undertones and subtle floral notes. The complex flavor profile includes hints of tropical fruits and woody elements that linger on the palate.'}
                  {product.type === 'Cinnamon Blossom' && 'A distinctive honey with warm, spicy notes and a gentle sweetness. The unmistakable aroma of cinnamon is present but not overwhelming, creating a perfectly balanced flavor profile.'}
                  {product.type === 'Multifloral' && 'A delightfully varied flavor profile representing the diverse wildflowers of Sri Lanka\'s central highlands. Expect subtle shifts in taste throughout the season as different plants come into bloom.'}
                  {product.type === 'Coconut Blossom' && 'A light, tropical honey with subtle caramel notes and a smooth finish. The distinct coconut character is gentle and refined, creating a uniquely Sri Lankan honey experience.'}
                  {product.type === 'Manuka' && 'A bold, distinctive honey prized for its robust flavor profile and medicinal properties. Featuring earthy, herbaceous notes with a hint of pepper and a slightly bitter finish.'}
                  {product.type === 'Tea Blossom' && 'A delicate, aromatic honey with subtle tea-like qualities and floral undertones. This rare honey variety offers a refined sweetness that perfectly complements its origin story.'}
                </p>
                <h3 className="text-xl font-medium text-forest-900 mb-3">Health Benefits</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Rich in natural antioxidants</li>
                  <li>Contains beneficial enzymes and nutrients</li>
                  <li>Natural antimicrobial properties</li>
                  <li>Soothes throat irritation</li>
                  <li>Supports digestive health</li>
                </ul>
                <h3 className="text-xl font-medium text-forest-900 mb-3">Serving Suggestions</h3>
                <p>
                  Enjoy our {product.name} drizzled over yogurt, added to tea, spread on toast, or used in cooking and baking. For the purest experience, savor a spoonful on its own to fully appreciate its unique character and natural goodness.
                </p>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div>
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900 w-1/3">Weight</td>
                      <td className="py-3 text-sm text-gray-700">340g (12oz)</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900">Origin</td>
                      <td className="py-3 text-sm text-gray-700">{product.origin}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900">Type</td>
                      <td className="py-3 text-sm text-gray-700">{product.type}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900">Ingredients</td>
                      <td className="py-3 text-sm text-gray-700">100% Pure Raw Honey</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900">Processing</td>
                      <td className="py-3 text-sm text-gray-700">Unfiltered, Cold Extracted</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900">Certifications</td>
                      <td className="py-3 text-sm text-gray-700">Organic, Fair Trade</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900">Storage</td>
                      <td className="py-3 text-sm text-gray-700">Store at room temperature</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900">Shelf Life</td>
                      <td className="py-3 text-sm text-gray-700">24 months from production</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-forest-900">Customer Reviews</h3>
                  <Button variant="outline" size="sm">Write a Review</Button>
                </div>
                
                <div className="flex items-center mb-8">
                  <div className="flex items-center mr-4">
                    <span className="text-3xl font-bold text-forest-900 mr-2">4.0</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={18} 
                          className={star <= 4 ? "text-honey-500 fill-honey-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Based on 24 reviews</div>
                </div>
                
                <div className="space-y-6">
                  {/* Sample reviews */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-forest-900">Emily R.</h4>
                      <span className="text-sm text-gray-600">May 15, 2023</span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          className={star <= 5 ? "text-honey-500 fill-honey-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">
                      Absolutely amazing honey! The flavor is unlike anything I've tasted before - so rich and complex. You can really taste the difference compared to supermarket honey. I love drizzling it on my yogurt in the morning.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-forest-900">Michael T.</h4>
                      <span className="text-sm text-gray-600">April 28, 2023</span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          className={star <= 4 ? "text-honey-500 fill-honey-500" : "text-gray-300"}
                        />
                      ))}
                      <Star size={16} className="text-gray-300" />
                    </div>
                    <p className="text-gray-700">
                      Great quality honey with a distinct flavor. I appreciate that it's ethically sourced and supports local beekeepers. The only reason for 4 stars instead of 5 is that the jar is a bit smaller than I expected for the price.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-forest-900">Sarah L.</h4>
                      <span className="text-sm text-gray-600">April 10, 2023</span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          className={star <= 3 ? "text-honey-500 fill-honey-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">
                      The honey arrived well-packaged and is definitely of good quality. The flavor is nice but a bit milder than I was expecting based on the description. It's good, but I'm not sure if I'll reorder this specific variety.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" size="sm">Load More Reviews</Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-serif font-semibold text-forest-900">You May Also Like</h2>
              <Link to="/shop" className="text-honey-600 hover:text-honey-700">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;