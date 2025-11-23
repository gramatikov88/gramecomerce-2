import React from 'react';
import { CATEGORIES } from '../constants';
import { ChevronRight, Smartphone, Tv, Home, Shirt, Zap } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'smartphone': return <Smartphone size={18} />;
      case 'tv': return <Tv size={18} />;
      case 'home': return <Home size={18} />;
      case 'shirt': return <Shirt size={18} />;
      default: return <Zap size={18} />;
    }
  };

  return (
    <div className="absolute top-full left-0 w-full md:w-64 bg-white shadow-xl z-40 border-t border-gray-100 h-[calc(100vh-150px)] md:h-auto overflow-y-auto">
      <ul className="py-2">
        {CATEGORIES.map((category) => (
          <li key={category.id} className="group">
            <a href={`#${category.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 group-hover:text-emag-blue">
                  {getIcon(category.icon)}
                </span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </a>
            
            {/* Desktop Flyout Mock - Hidden on mobile to simplify */}
            <div className="hidden md:block absolute left-64 top-0 w-[600px] h-full bg-white shadow-xl border-l border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                 {getIcon(category.icon)} {category.name}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.subcategories.map(sub => (
                  <a key={sub} href="#" className="text-sm text-gray-600 hover:text-emag-blue hover:underline block py-1">
                    {sub}
                  </a>
                ))}
              </div>
              <div className="mt-8">
                 <img src={`https://picsum.photos/500/150?random=${category.id}`} alt="Promo" className="rounded-lg" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MegaMenu;
