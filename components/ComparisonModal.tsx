import React, { useState, useMemo, useEffect } from 'react';
import { X, AlertCircle, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveProduct: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ 
  isOpen, 
  onClose, 
  products, 
  onRemoveProduct,
  onAddToCart 
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Extract all unique spec keys from all products
  const allSpecKeys = useMemo(() => {
    const keys = new Set<string>();
    products.forEach(p => {
      if (p.specs) {
        Object.keys(p.specs).forEach(k => keys.add(k));
      }
    });
    return Array.from(keys);
  }, [products]);

  if (!isOpen) return null;

  // Helper to check if a row has differences
  const hasDifference = (getter: (p: Product) => any) => {
    if (products.length < 2) return false;
    const values = products.map(getter);
    return new Set(values).size > 1;
  };

  const isSpecDifferent = (key: string) => {
    if (products.length < 2) return false;
    const values = products.map(p => p.specs?.[key]);
    return new Set(values).size > 1;
  };

  return (
    <div className="fixed inset-0 z-[80] bg-white flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm px-4 py-3 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          Сравнение на продукти ({products.length})
        </h2>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div className={`w-10 h-6 rounded-full p-1 transition-colors ${highlightDifferences ? 'bg-emag-blue' : 'bg-gray-300'}`}>
               <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${highlightDifferences ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <input 
              type="checkbox" 
              checked={highlightDifferences}
              onChange={(e) => setHighlightDifferences(e.target.checked)}
              className="hidden" 
            />
            <span className="text-sm font-medium text-gray-700">Маркирай разликите</span>
          </label>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-gray-50 p-4 md:p-8">
        {products.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
             <AlertCircle size={64} className="mb-4 text-gray-300" />
             <p className="text-xl">Няма избрани продукти за сравнение.</p>
             <button onClick={onClose} className="mt-4 text-emag-blue font-semibold hover:underline">
               Обратно към магазина
             </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-w-max">
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="p-4 w-48 bg-gray-50 border-b border-r border-gray-200 font-bold text-gray-700 sticky left-0 z-10">
                    Характеристика
                  </th>
                  {products.map(product => (
                    <th key={product.id} className="p-4 w-64 border-b border-gray-200 align-top relative group">
                      <button 
                         onClick={() => onRemoveProduct(product.id)}
                         className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                         title="Премахни"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="flex flex-col items-center text-center">
                        <img src={product.image} alt={product.title} className="h-32 object-contain mb-3" />
                        <h3 className="font-semibold text-gray-800 line-clamp-3 mb-2 min-h-[40px]">{product.title}</h3>
                        <div className="text-lg font-bold text-emag-red mb-2">
                          {product.price.toFixed(2)} лв.
                        </div>
                        <button 
                           onClick={() => onAddToCart(product)}
                           className="w-full bg-emag-blue text-white py-1.5 rounded text-xs font-bold hover:bg-emag-darkBlue flex items-center justify-center gap-1"
                        >
                          <ShoppingCart size={14} /> Купи
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* General Info Rows */}
                <tr className={highlightDifferences && hasDifference(p => p.rating) ? 'bg-yellow-50' : ''}>
                   <td className="p-3 border-b border-r border-gray-100 font-medium text-gray-600 bg-gray-50 sticky left-0">Рейтинг</td>
                   {products.map(product => (
                     <td key={product.id} className="p-3 border-b border-gray-100 text-center">
                       <span className="font-bold text-gray-800">{product.rating}</span> / 5 ({product.reviews})
                     </td>
                   ))}
                </tr>
                <tr className={highlightDifferences && hasDifference(p => p.category) ? 'bg-yellow-50' : ''}>
                   <td className="p-3 border-b border-r border-gray-100 font-medium text-gray-600 bg-gray-50 sticky left-0">Категория</td>
                   {products.map(product => (
                     <td key={product.id} className="p-3 border-b border-gray-100 text-center text-gray-700">
                       {product.category}
                     </td>
                   ))}
                </tr>

                {/* Specs Rows */}
                <tr className="bg-gray-100">
                  <td colSpan={products.length + 1} className="p-2 font-bold text-gray-700 uppercase text-xs tracking-wider pl-4">
                    Спецификации
                  </td>
                </tr>
                {allSpecKeys.map(key => {
                   const isDiff = highlightDifferences && isSpecDifferent(key);
                   return (
                     <tr key={key} className={`hover:bg-gray-50 transition-colors ${isDiff ? 'bg-yellow-50' : ''}`}>
                       <td className="p-3 border-b border-r border-gray-100 font-medium text-gray-600 bg-gray-50 sticky left-0">
                         {key}
                       </td>
                       {products.map(product => (
                         <td key={product.id} className={`p-3 border-b border-gray-100 text-center ${!product.specs?.[key] ? 'text-gray-400 italic' : 'text-gray-800'}`}>
                           {product.specs?.[key] || '-'}
                         </td>
                       ))}
                     </tr>
                   );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonModal;