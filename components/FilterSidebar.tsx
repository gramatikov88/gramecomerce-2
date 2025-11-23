import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, X, Filter } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  minRating: number | null;
  onRatingChange: (rating: number | null) => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  onClearFilters
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  
  // Local state for inputs to allow typing without immediate triggering
  const [minPriceInput, setMinPriceInput] = useState(priceRange[0].toString());
  const [maxPriceInput, setMaxPriceInput] = useState(priceRange[1].toString());

  // Sync local inputs when parent priceRange changes (e.g. clear filters)
  useEffect(() => {
    setMinPriceInput(priceRange[0].toString());
    setMaxPriceInput(priceRange[1].toString());
  }, [priceRange]);

  const handlePriceApply = () => {
    const min = parseInt(minPriceInput) || 0;
    const max = parseInt(maxPriceInput) || 10000;
    onPriceChange([min, max]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || minRating !== null || priceRange[0] > 0 || priceRange[1] < 5000;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Filter size={18} />
          Филтри
        </h3>
        {hasActiveFilters && (
             <button onClick={onClearFilters} className="text-xs text-emag-blue hover:underline flex items-center font-semibold">
                <X size={12} className="mr-1"/> Изчисти
             </button>
        )}
      </div>

      {/* Categories */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div 
            className="flex justify-between items-center cursor-pointer mb-2 select-none"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
            <h4 className="font-semibold text-sm text-gray-800">Категории</h4>
            {isCategoryOpen ? <ChevronUp size={16} className="text-gray-500"/> : <ChevronDown size={16} className="text-gray-500"/>}
        </div>
        
        {isCategoryOpen && (
            <div className="space-y-2 mt-3">
                {categories.map(cat => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 hover:text-emag-blue transition-colors">
                        <input 
                            type="checkbox" 
                            checked={selectedCategories.includes(cat)}
                            onChange={() => onCategoryChange(cat)}
                            className="rounded border-gray-300 text-emag-blue focus:ring-emag-blue w-4 h-4"
                        />
                        <span>{cat}</span>
                    </label>
                ))}
            </div>
        )}
      </div>

      {/* Price */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
         <div 
            className="flex justify-between items-center cursor-pointer mb-2 select-none"
            onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
            <h4 className="font-semibold text-sm text-gray-800">Цена (лв.)</h4>
            {isPriceOpen ? <ChevronUp size={16} className="text-gray-500"/> : <ChevronDown size={16} className="text-gray-500"/>}
        </div>
        
        {isPriceOpen && (
            <div className="mt-3">
                <div className="flex items-center space-x-2 mb-3">
                    <input 
                        type="number" 
                        value={minPriceInput}
                        onChange={(e) => setMinPriceInput(e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-emag-blue focus:ring-1 focus:ring-emag-blue"
                        placeholder="От"
                        min="0"
                    />
                    <span className="text-gray-400">-</span>
                    <input 
                        type="number" 
                        value={maxPriceInput}
                        onChange={(e) => setMaxPriceInput(e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-emag-blue focus:ring-1 focus:ring-emag-blue"
                        placeholder="До"
                        min="0"
                    />
                </div>
                <button 
                    onClick={handlePriceApply}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded transition-colors uppercase tracking-wide"
                >
                    Приложи
                </button>
            </div>
        )}
      </div>

      {/* Rating */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
         <div 
            className="flex justify-between items-center cursor-pointer mb-2 select-none"
            onClick={() => setIsRatingOpen(!isRatingOpen)}
        >
            <h4 className="font-semibold text-sm text-gray-800">Рейтинг</h4>
            {isRatingOpen ? <ChevronUp size={16} className="text-gray-500"/> : <ChevronDown size={16} className="text-gray-500"/>}
        </div>

        {isRatingOpen && (
            <div className="space-y-1 mt-3">
                {[5, 4, 3, 2, 1].map(star => (
                    <div 
                        key={star} 
                        className={`flex items-center cursor-pointer px-2 py-1.5 rounded transition-colors ${minRating === star ? 'bg-blue-50 ring-1 ring-blue-100' : 'hover:bg-gray-50'}`}
                        onClick={() => onRatingChange(minRating === star ? null : star)}
                    >
                        <div className="flex text-yellow-400 mr-2 shrink-0">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={14} 
                                    fill={i < star ? "currentColor" : "none"} 
                                    strokeWidth={i < star ? 0 : 2}
                                    className={i < star ? "" : "text-gray-300"}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-600 font-medium">
                            {star === 5 ? "5 звезди" : `над ${star} звезди`}
                        </span>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;