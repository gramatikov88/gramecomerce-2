import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6 mt-12 text-sm text-gray-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Клиенти</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emag-blue">Акаунт</a></li>
              <li><a href="#" className="hover:text-emag-blue">Поръчки</a></li>
              <li><a href="#" className="hover:text-emag-blue">Любими</a></li>
              <li><a href="#" className="hover:text-emag-blue">Връщане на продукти</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4">eMAG</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emag-blue">За нас</a></li>
              <li><a href="#" className="hover:text-emag-blue">Кариери</a></li>
              <li><a href="#" className="hover:text-emag-blue">Контакти</a></li>
              <li><a href="#" className="hover:text-emag-blue">eMAG Marketplace</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Услуги</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emag-blue">Genius</a></li>
              <li><a href="#" className="hover:text-emag-blue">Застраховки</a></li>
              <li><a href="#" className="hover:text-emag-blue">Изплащане</a></li>
              <li><a href="#" className="hover:text-emag-blue">Доставка</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Следете ни</h4>
            <div className="flex space-x-4 mb-4">
               {/* Social Icons Placeholder */}
               <div className="w-8 h-8 bg-gray-200 rounded-full hover:bg-blue-600 cursor-pointer"></div>
               <div className="w-8 h-8 bg-gray-200 rounded-full hover:bg-blue-400 cursor-pointer"></div>
               <div className="w-8 h-8 bg-gray-200 rounded-full hover:bg-pink-600 cursor-pointer"></div>
            </div>
            <p className="text-xs">Абонирайте се за нашия бюлетин за най-новите оферти.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2024 eMAG. Всички права запазени.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Visa_Brand_Mark_Blue_2021.svg/640px-Visa_Brand_Mark_Blue_2021.svg.png" className="h-4" alt="Visa"/>
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/616px-Mastercard-logo.svg.png" className="h-4" alt="Mastercard"/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
