import React, { useState, useMemo, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  promoDiscount: { code: string; type: 'percent' | 'fixed'; value: number } | null;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  promoDiscount,
  onApplyPromo,
  onRemovePromo
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!promoDiscount) return 0;
    if (promoDiscount.type === 'percent') {
      return (subtotal * promoDiscount.value) / 100;
    }
    return promoDiscount.value;
  }, [subtotal, promoDiscount]);

  const total = Math.max(0, subtotal - discountAmount);
  const deliveryCost = total > 50 ? 0 : 5.99;
  const finalTotal = total + deliveryCost;

  const handleApplyPromoClick = () => {
    if (!promoInput.trim()) {
      setPromoError('Моля въведете код');
      return;
    }
    onApplyPromo(promoInput);
    setPromoInput('');
    setPromoError('');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
            <ShoppingBag className="text-emag-blue" />
            Количка ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 opacity-70">
              <ShoppingBag size={64} className="mb-4 text-gray-300" />
              <p className="text-xl font-semibold mb-2">Количката е празна</p>
              <p className="text-sm max-w-xs">Разгледайте нашите предложения и добавете любимите си продукти.</p>
              <button 
                onClick={onClose}
                className="mt-6 bg-emag-blue text-white px-6 py-2 rounded-md font-semibold hover:bg-emag-darkBlue transition-colors"
              >
                Към магазина
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-md p-2 flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 text-gray-600 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 text-gray-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="font-bold text-emag-red">
                        {(item.price * item.quantity).toFixed(2)} лв.
                      </div>
                      {item.quantity > 1 && (
                         <div className="text-[10px] text-gray-400">
                           {item.price.toFixed(2)} лв./бр.
                         </div>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 self-start p-1"
                  title="Премахни"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-4 space-y-4">
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              {promoDiscount ? (
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                     <Tag size={16} />
                     <span>Код <b>{promoDiscount.code}</b> приложен</span>
                   </div>
                   <button onClick={onRemovePromo} className="text-xs text-red-500 underline">Премахни</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Промо код (напр. GENIUS)" 
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-emag-blue"
                  />
                  <button 
                    onClick={handleApplyPromoClick}
                    className="bg-gray-800 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-700"
                  >
                    Приложи
                  </button>
                </div>
              )}
              {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Междинна сума:</span>
                <span className="font-semibold text-gray-800">{subtotal.toFixed(2)} лв.</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span className="font-semibold text-gray-800">
                    {deliveryCost === 0 ? <span className="text-green-600">БЕЗПЛАТНА</span> : `${deliveryCost.toFixed(2)} лв.`}
                </span>
              </div>
              {promoDiscount && (
                <div className="flex justify-between text-emag-red font-medium">
                  <span>Отстъпка:</span>
                  <span>-{discountAmount.toFixed(2)} лв.</span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Общо:</span>
                <span className="text-2xl font-bold text-emag-red">{finalTotal.toFixed(2)} лв.</span>
              </div>
            </div>

            <button className="w-full bg-emag-red text-white py-3 rounded-md font-bold text-lg hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2 group">
              <span>Към плащане</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-gray-400 text-center">
              С натискането на бутона се съгласявате с Общите условия на eMAG.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;