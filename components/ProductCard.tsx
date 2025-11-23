import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Heart, Eye, ArrowRightLeft } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onQuickView, 
  onToggleCompare,
  isCompared 
}) => {
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border relative group ${isCompared ? 'border-emag-blue ring-1 ring-emag-blue' : 'border-gray-100'}`}>
      
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {discount > 0 && (
          <span className="bg-emag-red text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {product.isGenius && (
          <span className="bg-emag-blue text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Genius
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
        <button 
          className="text-gray-400 hover:text-emag-red opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 bg-white rounded-full shadow-md border border-gray-100 hover:scale-110 translate-x-4 group-hover:translate-x-0"
          title="Добави в любими"
        >
          <Heart size={20} />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="text-gray-400 hover:text-emag-blue opacity-0 group-hover:opacity-100 transition-all duration-200 delay-75 p-2 bg-white rounded-full shadow-md border border-gray-100 hover:scale-110 translate-x-4 group-hover:translate-x-0"
          title="Бърз преглед"
        >
          <Eye size={20} />
        </button>
        <button 
          onClick={(e) => {
             e.stopPropagation();
             onToggleCompare(product);
          }}
          className={`transition-all duration-200 delay-100 p-2 rounded-full shadow-md border hover:scale-110 translate-x-4 group-hover:translate-x-0 ${isCompared ? 'bg-emag-blue text-white border-emag-blue opacity-100 translate-x-0' : 'bg-white text-gray-400 hover:text-emag-blue border-gray-100 opacity-0 group-hover:opacity-100'}`}
          title="Сравни"
        >
          <ArrowRightLeft size={20} />
        </button>
      </div>

      {/* Image */}
      <div 
        className="mb-4 h-48 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out" 
        />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        <h3 
          className="text-sm text-gray-700 font-normal line-clamp-2 mb-2 group-hover:text-emag-blue transition-colors duration-300 cursor-pointer"
          onClick={() => onQuickView(product)}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 2} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto">
          {product.oldPrice && (
            <div className="text-xs text-gray-400 line-through mb-0.5">
              {product.oldPrice.toFixed(2)} лв.
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="text-emag-red font-bold text-lg leading-tight">
              {Math.floor(product.price)}
              <sup className="text-xs top-[-0.2em]">{ (product.price % 1).toFixed(2).substring(2) }</sup>
              <span className="text-sm font-normal ml-1 text-emag-red">лв.</span>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            className="w-full mt-3 bg-emag-blue hover:bg-emag-darkBlue text-white text-sm font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors uppercase tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
          >
            <ShoppingCart size={16} />
            В количката
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;