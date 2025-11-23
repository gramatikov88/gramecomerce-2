import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import MegaMenu from './components/MegaMenu';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';
import QuickViewModal from './components/QuickViewModal';
import FilterSidebar from './components/FilterSidebar';
import CartDrawer from './components/CartDrawer';
import ComparisonModal from './components/ComparisonModal';
import ComparisonBar from './components/ComparisonBar';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem } from './types';
import { SlidersHorizontal } from 'lucide-react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState<{code: string, type: 'percent'|'fixed', value: number} | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Comparison State
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [minRating, setMinRating] = useState<number | null>(null);
  
  // Sort State
  const [sortOption, setSortOption] = useState<string>('relevance');

  const toggleMegaMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      }
      return [...prev, {...product, quantity: 1}];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty < 1 ? item : {...item, quantity: newQty};
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'GENIUS') {
      setPromoDiscount({ code: 'GENIUS', type: 'percent', value: 10 });
    } else if (code === 'SUMMER') {
      setPromoDiscount({ code: 'SUMMER', type: 'fixed', value: 20 });
    } else {
      alert('Невалиден промо код');
    }
  };

  const handleRemovePromo = () => {
    setPromoDiscount(null);
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  // Comparison Handlers
  const handleToggleCompare = (product: Product) => {
    setComparisonList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert("Можете да сравнявате максимум 4 продукта.");
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (id: number) => {
    setComparisonList(prev => prev.filter(p => p.id !== id));
  };

  // Derive unique categories from products
  const availableCategories = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map(p => p.category))).sort();
  }, []);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      if (minRating !== null && product.rating < minRating) {
        return false;
      }
      return true;
    });
  }, [selectedCategories, priceRange, minRating]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (sortOption) {
      case 'priceAsc':
        return products.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return products.sort((a, b) => b.price - a.price);
      case 'ratingDesc':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  }, [filteredProducts, sortOption]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setMinRating(null);
    setSortOption('relevance');
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans flex flex-col pb-16 md:pb-0">
      <Header 
        toggleMegaMenu={toggleMegaMenu} 
        isMenuOpen={isMenuOpen} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <main className="container mx-auto px-4 flex-grow relative pt-4">
        <div className="flex gap-6">
          {/* Sidebar / Menu Placeholder for Desktop */}
          <div className={`
             absolute top-0 left-4 z-40 transition-all duration-200
             ${isMenuOpen ? 'block' : 'hidden'}
          `}>
             <MegaMenu isOpen={isMenuOpen} />
          </div>

          <div className="w-full">
             <Hero />

             {/* Mobile Quick Links */}
             <div className="md:hidden grid grid-cols-4 gap-2 mb-6 text-center mt-4">
               {CATEGORIES.slice(0, 4).map(cat => (
                 <div key={cat.id} className="bg-white p-2 rounded-lg shadow-sm flex flex-col items-center justify-center text-[10px]">
                    <div className="w-8 h-8 bg-gray-100 rounded-full mb-1"></div>
                    {cat.name.split(' ')[0]}
                 </div>
               ))}
             </div>

             {/* Main Content Area with Filters */}
             <div className="flex flex-col md:flex-row gap-6 mt-8">
               
               {/* Desktop Sidebar */}
               <aside className="hidden md:block w-64 flex-shrink-0">
                 <FilterSidebar 
                   categories={availableCategories}
                   selectedCategories={selectedCategories}
                   onCategoryChange={handleCategoryChange}
                   priceRange={priceRange}
                   onPriceChange={setPriceRange}
                   minRating={minRating}
                   onRatingChange={setMinRating}
                   onClearFilters={handleClearFilters}
                 />
               </aside>

               {/* Mobile Filter Toggle */}
               <div className="md:hidden mb-4">
                 <button 
                   onClick={() => setShowMobileFilters(!showMobileFilters)}
                   className="w-full bg-white p-3 rounded-lg shadow-sm flex items-center justify-center gap-2 font-semibold text-gray-700"
                 >
                   <SlidersHorizontal size={18} />
                   Филтрирай продукти ({sortedProducts.length})
                 </button>
                 
                 {showMobileFilters && (
                   <div className="mt-4 animate-in slide-in-from-top-4 duration-200">
                     <FilterSidebar 
                       categories={availableCategories}
                       selectedCategories={selectedCategories}
                       onCategoryChange={handleCategoryChange}
                       priceRange={priceRange}
                       onPriceChange={setPriceRange}
                       minRating={minRating}
                       onRatingChange={setMinRating}
                       onClearFilters={handleClearFilters}
                     />
                   </div>
                 )}
               </div>

               {/* Product Grid */}
               <div className="flex-1">
                 {/* Header with Sort and Count */}
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                   <div className="flex items-baseline gap-2">
                     <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                       {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'Всички оферти'}
                     </h2>
                     <span className="text-sm text-gray-500">{sortedProducts.length} продукта</span>
                   </div>
                   
                   <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 font-medium">Сортирай по:</span>
                      <select 
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-emag-blue focus:border-emag-blue block p-2 outline-none cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <option value="relevance">Най-популярни</option>
                        <option value="priceAsc">Цена: възходящ</option>
                        <option value="priceDesc">Цена: низходящ</option>
                        <option value="ratingDesc">Рейтинг</option>
                      </select>
                   </div>
                 </div>
                 
                 {sortedProducts.length > 0 ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                     {sortedProducts.map(product => (
                       <ProductCard 
                         key={product.id} 
                         product={product} 
                         onAddToCart={handleAddToCart}
                         onQuickView={handleQuickView}
                         onToggleCompare={handleToggleCompare}
                         isCompared={!!comparisonList.find(p => p.id === product.id)}
                       />
                     ))}
                   </div>
                 ) : (
                   <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                     <p className="text-gray-500 text-lg mb-4">Няма намерени продукти с избраните филтри.</p>
                     <button 
                       onClick={handleClearFilters}
                       className="text-emag-blue font-semibold hover:underline"
                     >
                       Изчисти филтрите
                     </button>
                   </div>
                 )}

                 <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-md">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-2xl font-bold mb-2">Genius: Безплатна доставка</h3>
                      <p className="opacity-90">За милиони продукти. Опитай безплатно за 30 дни.</p>
                    </div>
                    <button className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
                      Опитай сега
                    </button>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />
      <AiAssistant />
      
      <QuickViewModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        promoDiscount={promoDiscount}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      <ComparisonBar 
        items={comparisonList}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onClear={() => setComparisonList([])}
        onRemoveItem={handleRemoveFromCompare}
      />

      <ComparisonModal 
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={comparisonList}
        onRemoveProduct={handleRemoveFromCompare}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;