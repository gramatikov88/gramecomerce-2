import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, Grid, ShoppingBag, Tag, 
  Plus, Edit, Trash2, X, Save, Check, ArrowLeft, MoreHorizontal, User
} from 'lucide-react';
import { Product, Category, Order, PromoCode, OrderStatus } from '../types';

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  promos: PromoCode[];
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: number) => void;
  onAddCategory: (c: Category) => void;
  onDeleteCategory: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
  onAddPromo: (p: PromoCode) => void;
  onDeletePromo: (id: string) => void;
  onTogglePromoStatus: (id: string) => void;
  onExitAdmin: () => void;
}

type Tab = 'dashboard' | 'products' | 'categories' | 'orders' | 'promos';

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products, categories, orders, promos,
  onAddProduct, onUpdateProduct, onDeleteProduct,
  onAddCategory, onDeleteCategory,
  onUpdateOrderStatus,
  onAddPromo, onDeletePromo, onTogglePromoStatus,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // --- STATS CALCULATIONS ---
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  // --- PRODUCT HANDLERS ---
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsProductModalOpen(true);
  };

  const handleAddNewProduct = () => {
    setEditingProduct({
      id: Date.now(),
      title: '',
      price: 0,
      image: 'https://picsum.photos/400/400?random=' + Date.now(),
      rating: 0,
      reviews: 0,
      isGenius: false,
      category: categories[0]?.name || 'Други',
      description: '',
      features: [],
      specs: {}
    });
    setIsProductModalOpen(true);
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    const exists = products.find(p => p.id === editingProduct.id);
    if (exists) {
      onUpdateProduct(editingProduct);
    } else {
      onAddProduct(editingProduct);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // --- CATEGORY HANDLERS ---
  const [newCatName, setNewCatName] = useState('');
  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    onAddCategory({
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      name: newCatName,
      icon: 'box',
      subcategories: []
    });
    setNewCatName('');
  };

  // --- PROMO HANDLERS ---
  const [newPromo, setNewPromo] = useState<Partial<PromoCode>>({
    code: '', type: 'percent', value: 0, isActive: true
  });
  const handleAddPromo = () => {
    if (!newPromo.code || !newPromo.value) return;
    onAddPromo({
      id: Date.now().toString(),
      code: newPromo.code,
      type: newPromo.type as 'percent' | 'fixed',
      value: newPromo.value,
      isActive: newPromo.isActive || false
    });
    setNewPromo({ code: '', type: 'percent', value: 0, isActive: true });
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-slate-700 flex items-center gap-3">
          <div className="bg-emag-blue p-2 rounded-lg">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-xl font-bold">eMAG CMS</h1>
        </div>
        
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-emag-blue text-white' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <LayoutDashboard size={20} /> Табло
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-emag-blue text-white' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <Package size={20} /> Продукти
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'categories' ? 'bg-emag-blue text-white' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <Grid size={20} /> Категории
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-emag-blue text-white' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <ShoppingBag size={20} /> Поръчки
          </button>
          <button 
            onClick={() => setActiveTab('promos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'promos' ? 'bg-emag-blue text-white' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <Tag size={20} /> Промо кодове
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-700">
           <button 
             onClick={onExitAdmin}
             className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors text-slate-300"
           >
             <ArrowLeft size={16} /> Обратно в магазина
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        
        {/* TAB: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Общ преглед</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="text-gray-500 text-sm font-medium mb-1">Общо продажби</div>
                 <div className="text-3xl font-bold text-gray-800">{totalSales.toFixed(2)} лв.</div>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="text-gray-500 text-sm font-medium mb-1">Поръчки</div>
                 <div className="text-3xl font-bold text-gray-800">{totalOrders}</div>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="text-gray-500 text-sm font-medium mb-1">Чакащи</div>
                 <div className="text-3xl font-bold text-orange-500">{pendingOrders}</div>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="text-gray-500 text-sm font-medium mb-1">Продукти</div>
                 <div className="text-3xl font-bold text-blue-600">{products.length}</div>
               </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <h3 className="font-bold text-gray-700 mb-4">Последни поръчки</h3>
                 <div className="space-y-3">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                         <div>
                           <div className="font-medium text-gray-800">#{order.id}</div>
                           <div className="text-xs text-gray-500">{order.customerName}</div>
                         </div>
                         <div className="text-right">
                           <div className="font-bold">{order.total.toFixed(2)} лв.</div>
                           <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                             order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                             order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                             'bg-yellow-100 text-yellow-700'
                           }`}>
                             {order.status}
                           </span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-bold text-gray-800">Управление на продукти</h2>
               <button 
                 onClick={handleAddNewProduct}
                 className="bg-emag-blue text-white px-4 py-2 rounded-lg hover:bg-emag-darkBlue flex items-center gap-2"
               >
                 <Plus size={18} /> Нов продукт
               </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-4 w-16">Снимка</th>
                    <th className="p-4">Име</th>
                    <th className="p-4">Категория</th>
                    <th className="p-4">Цена</th>
                    <th className="p-4 text-center">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <img src={product.image} alt="" className="w-10 h-10 object-contain rounded bg-white border border-gray-200" />
                      </td>
                      <td className="p-4 font-medium text-gray-800 max-w-xs truncate" title={product.title}>
                        {product.title}
                      </td>
                      <td className="p-4 text-gray-600">{product.category}</td>
                      <td className="p-4 font-bold text-gray-800">{product.price.toFixed(2)} лв.</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                           <button 
                             onClick={() => handleEditProduct(product)}
                             className="p-1.5 hover:bg-blue-100 text-blue-600 rounded"
                           >
                             <Edit size={16} />
                           </button>
                           <button 
                             onClick={() => {
                               if(window.confirm('Сигурни ли сте?')) onDeleteProduct(product.id);
                             }}
                             className="p-1.5 hover:bg-red-100 text-red-600 rounded"
                           >
                             <Trash2 size={16} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: CATEGORIES */}
        {activeTab === 'categories' && (
           <div className="space-y-6">
             <h2 className="text-2xl font-bold text-gray-800">Категории</h2>
             
             <div className="flex gap-4 items-end bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Име на категория</label>
                  <input 
                    type="text" 
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Напр. Спортни стоки"
                  />
                </div>
                <button 
                  onClick={handleAddCategory}
                  className="bg-emag-blue text-white px-6 py-2 rounded-md font-bold h-[42px]"
                >
                  Добави
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {categories.map(cat => (
                 <div key={cat.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                        <Package size={20} />
                      </div>
                      <span className="font-semibold text-gray-800">{cat.name}</span>
                    </div>
                    <button 
                      onClick={() => {
                        if(window.confirm(`Изтриване на категория "${cat.name}"?`)) onDeleteCategory(cat.id);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                 </div>
               ))}
             </div>
           </div>
        )}

        {/* TAB: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Поръчки</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                   <tr>
                     <th className="p-4">ID</th>
                     <th className="p-4">Клиент</th>
                     <th className="p-4">Дата</th>
                     <th className="p-4">Сума</th>
                     <th className="p-4">Статус</th>
                   </tr>
                 </thead>
                 <tbody>
                   {orders.map(order => (
                     <tr key={order.id} className="border-b border-gray-100">
                        <td className="p-4 font-mono text-gray-500">{order.id}</td>
                        <td className="p-4">
                          <div className="font-medium text-gray-800">{order.customerName}</div>
                          <div className="text-xs text-gray-500">{order.email}</div>
                        </td>
                        <td className="p-4 text-gray-600">{order.date}</td>
                        <td className="p-4 font-bold">{order.total.toFixed(2)} лв.</td>
                        <td className="p-4">
                           <select 
                             value={order.status}
                             onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                             className={`px-3 py-1 rounded-full text-xs font-bold border-0 cursor-pointer outline-none ${
                               order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                               order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                               order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                               'bg-gray-100 text-gray-700'
                             }`}
                           >
                             <option value="pending">Чакаща</option>
                             <option value="processing">Обработва се</option>
                             <option value="shipped">Изпратена</option>
                             <option value="delivered">Доставена</option>
                             <option value="cancelled">Отказ</option>
                           </select>
                        </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        )}

        {/* TAB: PROMOS */}
        {activeTab === 'promos' && (
           <div className="space-y-6">
             <h2 className="text-2xl font-bold text-gray-800">Промо кодове</h2>
             
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-1/4">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Код</label>
                  <input 
                    type="text" 
                    value={newPromo.code}
                    onChange={e => setNewPromo({...newPromo, code: e.target.value.toUpperCase()})}
                    className="w-full border border-gray-300 rounded-md p-2 uppercase"
                    placeholder="SUMMER20"
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Стойност</label>
                  <input 
                    type="number" 
                    value={newPromo.value || ''}
                    onChange={e => setNewPromo({...newPromo, value: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="20"
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Тип</label>
                  <select 
                     value={newPromo.type}
                     onChange={e => setNewPromo({...newPromo, type: e.target.value as 'percent' | 'fixed'})}
                     className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="percent">Процент (%)</option>
                    <option value="fixed">Фиксирана сума (лв)</option>
                  </select>
                </div>
                <button 
                  onClick={handleAddPromo}
                  className="bg-emag-blue text-white px-6 py-2 rounded-md font-bold h-[42px]"
                >
                  Създай
                </button>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="p-4">Код</th>
                      <th className="p-4">Отстъпка</th>
                      <th className="p-4">Статус</th>
                      <th className="p-4 text-center">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promos.map(promo => (
                      <tr key={promo.id} className="border-b border-gray-100">
                        <td className="p-4 font-mono font-bold text-gray-800">{promo.code}</td>
                        <td className="p-4 text-green-600 font-bold">
                           -{promo.value}{promo.type === 'percent' ? '%' : ' лв.'}
                        </td>
                        <td className="p-4">
                           <button 
                             onClick={() => onTogglePromoStatus(promo.id)}
                             className={`px-3 py-1 rounded-full text-xs font-bold ${promo.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                           >
                             {promo.isActive ? 'Активен' : 'Неактивен'}
                           </button>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => onDeletePromo(promo.id)}
                            className="text-gray-400 hover:text-red-500 p-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>
        )}
      </main>

      {/* PRODUCT MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">
                {editingProduct.id ? 'Редактиране на продукт' : 'Нов продукт'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={saveProduct} className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Заглавие</label>
                 <input 
                   required
                   type="text" 
                   value={editingProduct.title}
                   onChange={e => setEditingProduct({...editingProduct, title: e.target.value})}
                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emag-blue focus:outline-none"
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Цена (лв.)</label>
                   <input 
                     required
                     type="number" 
                     min="0"
                     step="0.01"
                     value={editingProduct.price}
                     onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                     className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emag-blue focus:outline-none"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Стара Цена (опция)</label>
                   <input 
                     type="number" 
                     min="0"
                     step="0.01"
                     value={editingProduct.oldPrice || ''}
                     onChange={e => setEditingProduct({...editingProduct, oldPrice: parseFloat(e.target.value) || undefined})}
                     className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emag-blue focus:outline-none"
                   />
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Категория</label>
                   <select 
                     value={editingProduct.category}
                     onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                     className="w-full border border-gray-300 rounded-md p-2 bg-white"
                   >
                     {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                   </select>
                 </div>
                 <div className="flex items-center pt-6">
                   <label className="flex items-center gap-2 cursor-pointer">
                     <input 
                       type="checkbox" 
                       checked={editingProduct.isGenius}
                       onChange={e => setEditingProduct({...editingProduct, isGenius: e.target.checked})}
                       className="w-5 h-5 text-emag-blue rounded"
                     />
                     <span className="font-bold text-gray-700">Genius продукт</span>
                   </label>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">URL на снимка</label>
                 <input 
                   type="text" 
                   value={editingProduct.image}
                   onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                   className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500"
                 />
               </div>

               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Описание</label>
                 <textarea 
                   rows={3}
                   value={editingProduct.description || ''}
                   onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emag-blue focus:outline-none"
                 />
               </div>

               <div className="pt-4 flex justify-end gap-3">
                 <button 
                   type="button" 
                   onClick={() => setIsProductModalOpen(false)}
                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                 >
                   Отказ
                 </button>
                 <button 
                   type="submit" 
                   className="px-6 py-2 bg-emag-blue text-white rounded-lg font-bold hover:bg-emag-darkBlue shadow-md"
                 >
                   Запази
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;