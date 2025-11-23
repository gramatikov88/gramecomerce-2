import React, { useEffect } from 'react';
import { X, ShoppingCart, Check, Star, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[800px] animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-800 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-white">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[300px] md:max-h-[400px] object-contain"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-50 overflow-y-auto">
          {/* Header */}
          <div className="mb-4">
            {product.isGenius && (
               <span className="inline-block bg-emag-blue text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                 Genius
               </span>
            )}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-tight mb-2">
              {product.title}
            </h2>
            
            <div className="flex items-center gap-4 mb-4">
               <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
                  ))}
               </div>
               <span className="text-sm text-gray-500 underline cursor-pointer">{product.reviews} ревюта</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-between items-start">
               <div>
                  {product.oldPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      {product.oldPrice.toFixed(2)} лв.
                    </div>
                  )}
                  <div className="text-3xl font-bold text-emag-red flex items-start">
                    {Math.floor(product.price)}
                    <sup className="text-sm top-1">{ (product.price % 1).toFixed(2).substring(2) }</sup>
                    <span className="text-lg font-medium ml-1 mt-2 text-emag-red">лв.</span>
                  </div>
               </div>
               {discount > 0 && (
                 <div className="bg-emag-red text-white text-sm font-bold px-3 py-1 rounded">
                   -{discount}%
                 </div>
               )}
            </div>
            
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center text-green-600 text-sm font-medium">
                 <Check size={16} className="mr-1.5" />
                 В наличност
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                 <Truck size={16} className="mr-1.5" />
                 Доставка до утре
              </div>
            </div>

            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full mt-4 bg-emag-blue hover:bg-emag-darkBlue text-white text-base font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              <ShoppingCart size={20} />
              Добави в количката
            </button>
          </div>

          {/* Description & Features */}
          <div className="space-y-4">
            {product.description && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Описание</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Характеристики</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <div className="mt-1 mr-2 bg-gray-300 rounded-full p-[2px]">
                         <Check size={8} className="text-white" strokeWidth={4} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-200 mt-4">
               <div className="flex items-center text-xs text-gray-500 gap-1">
                 <ShieldCheck size={14} className="text-emag-blue" />
                 <span>24 месеца гаранция включена</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;