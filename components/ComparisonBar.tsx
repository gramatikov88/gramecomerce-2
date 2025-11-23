import React from 'react';
import { ArrowRightLeft, X } from 'lucide-react';
import { Product } from '../types';

interface ComparisonBarProps {
  items: Product[];
  onOpenComparison: () => void;
  onClear: () => void;
  onRemoveItem: (id: number) => void;
}

const ComparisonBar: React.FC<ComparisonBarProps> = ({ items, onOpenComparison, onClear, onRemoveItem }) => {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 border-t border-gray-200 animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-4 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
           <div className="flex items-center gap-2 text-gray-700 font-semibold whitespace-nowrap">
             <div className="bg-emag-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
               {items.length}
             </div>
             <span>За сравнение</span>
           </div>

           <div className="flex items-center gap-3">
             {items.map(item => (
               <div key={item.id} className="relative group shrink-0 w-12 h-12 bg-white border border-gray-200 rounded p-1">
                 <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                 <button 
                   onClick={() => onRemoveItem(item.id)}
                   className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   <X size={12} />
                 </button>
               </div>
             ))}
             {items.length < 4 && (
                <div className="w-12 h-12 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-xs text-center leading-none p-1">
                   + Продукт
                </div>
             )}
           </div>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 ml-4">
           <button 
             onClick={onClear}
             className="text-sm text-gray-500 hover:text-red-500 font-medium hidden md:block"
           >
             Изчисти
           </button>
           <button 
             onClick={onOpenComparison}
             className="bg-emag-blue hover:bg-emag-darkBlue text-white px-5 py-2.5 rounded shadow-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap"
             disabled={items.length < 2}
           >
             <ArrowRightLeft size={18} />
             Сравни {items.length >= 2 ? '' : '(мин. 2)'}
           </button>
        </div>

      </div>
    </div>
  );
};

export default ComparisonBar;