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
import AdminDashboard from './components/AdminDashboard';
import { PRODUCTS, CATEGORIES, MOCK_ORDERS, MOCK_PROMOS } from './constants';
import { Product, CartItem, Category, Order, PromoCode, OrderStatus } from './types';
import { SlidersHorizontal, Settings, X } from 'lucide-react';

const App: React.FC = () => {
  // --- ADMIN & DATA STATE ---
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [promos, setPromos] = useState<PromoCode[]>(MOCK_PROMOS);

  // --- ADMIN LOGIN STATE ---
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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

  // --- ADMIN AUTH HANDLER ---
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdminMode(true);
      setIsAdminLoginOpen(false);
      setAdminPassword('');
      setLoginError('');
    } else {
      setLoginError('Грешна парола');
    }
  };

  // --- CRUD HANDLERS FOR ADMIN ---
  const handleAddProduct = (p: Product) => setProducts(prev => [...prev, p]);
  const handleUpdateProduct = (p: Product) => setProducts(prev => prev.map(prod => prod.id === p.id ? p : prod));
  const handleDeleteProduct = (id: number) => setProducts(prev => prev.filter(p => p.id !== id));
  
  const handleAddCategory = (c: Category) => setCategories(prev => [...prev, c]);
  const handleDeleteCategory = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));
  
  const handleUpdateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const handleAddPromo = (p: PromoCode) => setPromos(prev => [...prev, p]);
  const handleDeletePromo = (id: string) => setPromos(prev => prev.filter(p => p.id !== id));
  const handleTogglePromoStatus = (id: string) => {
    setPromos(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };


  // --- SHOP LOGIC ---
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
    // Check against dynamic promos list
    const foundPromo = promos.find(p => p.code === code && p.isActive);
    if (foundPromo) {
      setPromoDiscount({ code: foundPromo.code, type: foundPromo.type, value: foundPromo.value });
    } else {
      alert('Невалиден или неактивен промо код');
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

  // Derive unique categories from CURRENT products state
  const availableCategories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category))).sort();
  }, [products]);

  // Filtering Logic using dynamic products state
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
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
  }, [products, selectedCategories, priceRange, minRating]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const prods = [...filteredProducts];
    switch (sortOption) {
      case 'priceAsc':
        return prods.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return prods.sort((a, b) => b.price - a.price);
      case 'ratingDesc':
        return prods.sort((a, b) => b.rating - a.rating);
      default:
        return prods;
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

  // --- RENDER ADMIN MODE ---
  if (isAdminMode) {
    return (
      <AdminDashboard 
        products={products}
        categories={categories}
        orders={orders}
        promos={promos}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onAddPromo={handleAddPromo}
        onDeletePromo={handleDeletePromo}
        onTogglePromoStatus={handleTogglePromoStatus}
        onExitAdmin={() => setIsAdminMode(false)}
      />
    );
  }

  // --- RENDER SHOP MODE ---
  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans flex flex-col pb-16 md:pb-0">
      
      {/* Admin Toggle Button */}
      <div className="bg-slate-900 text-white text-xs py-1 px-4 flex justify-between items-center">
        <span>Demo Mode</span>
        <button 
          onClick={() => setIsAdminLoginOpen(true)}
          className="flex items-center gap-1 hover:text-blue-300 font-bold"
        >
          <Settings size={12} /> Вход Админ Панел
        </button>
      </div>

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
               {categories.slice(0, 4).map(cat => (
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

      {/* Admin Login Modal */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Settings size={20} className="text-emag-blue" />
                Вход за администратори
              </h3>
              <button 
                onClick={() => {
                  setIsAdminLoginOpen(false); 
                  setLoginError(''); 
                  setAdminPassword('');
                }} 
                className="text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Парола</label>
                 <input 
                   type="password" 
                   value={adminPassword}
                   onChange={e => {
                     setAdminPassword(e.target.value);
                     setLoginError('');
                   }}
                   className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emag-blue focus:outline-none focus:border-emag-blue transition-all"
                   placeholder="Въведете парола"
                   autoFocus
                 />
                 {loginError && (
                   <div className="text-red-500 text-sm mt-2 flex items-center gap-1 bg-red-50 p-2 rounded border border-red-100">
                     <span className="font-bold">!</span> {loginError}
                   </div>
                 )}
               </div>

               <div className="flex justify-end gap-3 pt-2">
                 <button 
                   type="button" 
                   onClick={() => {
                     setIsAdminLoginOpen(false); 
                     setLoginError(''); 
                     setAdminPassword('');
                   }}
                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                 >
                   Отказ
                 </button>
                 <button 
                   type="submit" 
                   className="px-6 py-2 bg-emag-blue text-white rounded-lg font-bold hover:bg-emag-darkBlue shadow-md transition-colors"
                 >
                   Вход
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;