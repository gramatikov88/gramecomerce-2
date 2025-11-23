import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  toggleMegaMenu: () => void;
  isMenuOpen: boolean;
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMegaMenu, isMenuOpen, cartCount, onOpenCart }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top thin bar */}
      <div className="bg-gray-100 border-b border-gray-200 text-xs hidden md:block">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center text-gray-500">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-emag-blue">eMAG Genius</a>
            <a href="#" className="hover:text-emag-blue">Разопаковани продукти</a>
            <a href="#" className="hover:text-emag-blue">Помощ</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-emag-blue">Мобилно приложение</a>
            <a href="#" className="hover:text-emag-blue">Магазини</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
             <a href="/" className="flex-shrink-0">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Emag_logo_%282024%29.svg/200px-Emag_logo_%282024%29.svg.png" alt="eMAG" className="h-6 md:h-8" />
             </a>
          </div>

          {/* Search Bar - Hidden on mobile initially, visible on desktop */}
          <div className="flex-grow max-w-3xl hidden md:flex relative">
            <input 
              type="text" 
              placeholder="Търси продукти..." 
              className="w-full border border-gray-300 rounded-l-md py-2.5 px-4 focus:outline-none focus:border-emag-blue focus:ring-1 focus:ring-emag-blue text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-emag-blue text-white px-6 rounded-r-md hover:bg-emag-darkBlue transition-colors font-semibold flex items-center">
              <Search size={20} className="mr-2"/>
              Търсене
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <button className="flex flex-col items-center group text-gray-700 hover:text-emag-blue">
              <div className="relative">
                <User size={24} strokeWidth={1.5} />
              </div>
              <span className="text-[10px] md:text-xs mt-1 hidden md:block font-semibold">Акаунт</span>
            </button>

            <button className="flex flex-col items-center group text-gray-700 hover:text-emag-blue relative">
               <Heart size={24} strokeWidth={1.5} />
               <span className="text-[10px] md:text-xs mt-1 hidden md:block font-semibold">Любими</span>
            </button>

            <button 
              onClick={onOpenCart}
              className="flex flex-col items-center group text-gray-700 hover:text-emag-blue relative"
            >
              <div className="relative">
                <ShoppingCart size={24} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emag-red text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] md:text-xs mt-1 hidden md:block font-semibold">Количка</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden flex">
           <input 
              type="text" 
              placeholder="Търси продукти..." 
              className="w-full border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:border-emag-blue text-sm"
            />
            <button className="bg-emag-blue text-white px-4 rounded-r-md">
              <Search size={18} />
            </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-t border-gray-200 shadow-sm relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-2">
            <button 
              onClick={toggleMegaMenu}
              className="flex items-center space-x-2 text-gray-700 hover:text-emag-blue font-semibold text-sm transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              <span>Продукти</span>
            </button>
            
            <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-600">
              <a href="#" className="hover:text-emag-blue text-emag-red">Crazy Days</a>
              <a href="#" className="hover:text-emag-blue">Genius Deals</a>
              <a href="#" className="hover:text-emag-blue">Разопаковани</a>
              <a href="#" className="hover:text-emag-blue">IT & Mobile</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;