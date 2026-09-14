import React, { useState } from 'react';
import CustomerList from './components/Customers/CustomerList';
import ProductList from './components/Products/ProductList';
import OrderList from './components/Orders/OrderList';
import { Users, Package, ShoppingBag, Store, ShieldCheck, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('orders'); // 'customers' | 'products' | 'orders'
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStockChange = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header / Navigation */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md font-bold">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-tight">Order Management Dashboard</h1>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Connected to Spring Boot API (Port 8080)
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 bg-slate-800/60 p-1.5 rounded-xl border border-slate-700/50">
              <button
                onClick={() => setActiveTab('customers')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'customers'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'products'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Products & Stock</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'orders'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Banner */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {activeTab === 'customers' && 'Customer Management'}
              {activeTab === 'products' && 'Product Inventory & Stock'}
              {activeTab === 'orders' && 'Order Processing & Transaction History'}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {activeTab === 'customers' && 'Manage registered customers, address profiles, and contact details.'}
              {activeTab === 'products' && 'Track item prices, available inventory levels, and stock status.'}
              {activeTab === 'orders' && 'Process live orders, automatic stock depletion, and status updates.'}
            </p>
          </div>

          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'customers' && <CustomerList key={`c-${refreshKey}`} />}
        {activeTab === 'products' && <ProductList key={`p-${refreshKey}`} />}
        {activeTab === 'orders' && <OrderList key={`o-${refreshKey}`} onProductStockChange={handleStockChange} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Order Management System • React Frontend + Spring Boot 3 Backend
      </footer>
    </div>
  );
}
