import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import orderService from '../services/orderService';

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  placedAt: string;
  pricing: {
    total: number;
  };
  items: Array<{
    title: string;
    quantity: number;
  }>;
}

const OrderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let colorClass = '';
  
  switch (status) {
    case 'pending':
      colorClass = 'bg-yellow-100 text-yellow-800';
      break;
    case 'confirmed':
      colorClass = 'bg-blue-100 text-blue-800';
      break;
    case 'processing':
      colorClass = 'bg-purple-100 text-purple-800';
      break;
    case 'shipped':
      colorClass = 'bg-indigo-100 text-indigo-800';
      break;
    case 'delivered':
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'cancelled':
      colorClass = 'bg-red-100 text-red-800';
      break;
    case 'returned':
      colorClass = 'bg-orange-100 text-orange-800';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrders();
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // Filter orders based on search term
  const filteredOrders = searchTerm
    ? orders.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : orders;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            {searchTerm ? (
              <p className="text-gray-600">No orders match your search criteria.</p>
            ) : (
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <li key={order._id}>
                  <Link to={`/orders/${order._id}`} className="block hover:bg-gray-50">
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600 truncate">Order #{order.orderNumber}</p>
                          <OrderStatusBadge status={order.status} />
                        </div>
                        <div className="mt-2 flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <span>Placed on {formatDate(order.placedAt)}</span>
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 truncate">
                          {order.items.slice(0, 2).map(item => `${item.quantity}x ${item.title}`).join(', ')}
                          {order.items.length > 2 ? ` and ${order.items.length - 2} more...` : ''}
                        </p>
                      </div>
                      <div className="ml-6 flex-shrink-0 flex items-center">
                        <p className="text-sm font-medium text-gray-900 mr-4">
                          {formatCurrency(order.pricing.total)}
                        </p>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
