import React, { useState, useEffect } from 'react';
import { customerApi } from '../../api/customerApi';
import { productApi } from '../../api/productApi';
import { X, ShoppingBag, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

export default function OrderCreateModal({ isOpen, onClose, onSave }) {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [orderItems, setOrderItems] = useState([
    { productId: '', quantity: 1, availableStock: 0, price: 0 },
  ]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load customers and available products
      customerApi.getCustomers({ size: 100 }).then((res) => setCustomers(res.content || []));
      productApi.getProducts({ size: 100 }).then((res) => setProducts(res.content || []));
      setSelectedCustomerId('');
      setOrderItems([{ productId: '', quantity: 1, availableStock: 0, price: 0 }]);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setOrderItems((prev) => [
      ...prev,
      { productId: '', quantity: 1, availableStock: 0, price: 0 },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (orderItems.length === 1) return;
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...orderItems];
    if (field === 'productId') {
      const selectedProd = products.find((p) => p.id === Number(value));
      updated[index].productId = value;
      updated[index].availableStock = selectedProd ? selectedProd.stock : 0;
      updated[index].price = selectedProd ? selectedProd.price : 0;
    } else if (field === 'quantity') {
      updated[index].quantity = parseInt(value, 10) || 1;
    }
    setOrderItems(updated);
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedCustomerId) {
      setError('Please select a customer.');
      return;
    }

    // Validate items
    for (let item of orderItems) {
      if (!item.productId) {
        setError('Please select a product for all items.');
        return;
      }
      if (item.quantity > item.availableStock) {
        setError(`Requested quantity (${item.quantity}) exceeds available stock (${item.availableStock}) for item.`);
        return;
      }
    }

    setLoading(true);
    try {
      await onSave({
        customerId: parseInt(selectedCustomerId, 10),
        items: orderItems.map((item) => ({
          productId: parseInt(item.productId, 10),
          quantity: item.quantity,
        })),
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-800">Place New Order</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Select Customer */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Select Customer <span className="text-rose-500">*</span>
            </label>
            <select
              required
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            >
              <option value="">-- Choose a Customer --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-slate-700">Order Items</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Product Item
              </button>
            </div>

            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <select
                    required
                    value={item.productId}
                    onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
                  >
                    <option value="">-- Select Product --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id} disabled={p.stock === 0}>
                        {p.name} - ${Number(p.price).toFixed(2)} (Stock: {p.stock})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-24">
                  <input
                    type="number"
                    min="1"
                    max={item.availableStock || 999}
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-center"
                    placeholder="Qty"
                  />
                </div>

                <div className="w-24 text-right font-semibold text-sm text-slate-800">
                  ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                </div>

                <button
                  type="button"
                  disabled={orderItems.length === 1}
                  onClick={() => handleRemoveItem(index)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Total Calculation */}
          <div className="flex items-center justify-between p-4 bg-indigo-50/60 rounded-lg border border-indigo-100">
            <span className="font-semibold text-slate-700 text-sm">Estimated Total Amount:</span>
            <span className="text-xl font-bold text-indigo-700">${calculateTotal().toFixed(2)}</span>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg flex items-center gap-2 transition-colors shadow-xs"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{loading ? 'Processing Order...' : 'Confirm & Place Order'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
