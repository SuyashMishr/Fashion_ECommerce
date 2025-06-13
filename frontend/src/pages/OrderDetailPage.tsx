import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import OrderStatusTracker from '../components/OrderStatusTracker';
import orderService from '../services/orderService';

interface OrderItem {
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderDetail {
  _id: string;
  orderNumber: string;
  status: string;
  statusHistory: Array<{
    status: string;
    changedAt: string;
    note?: string;
  }>;
  placedAt: string;
  items: OrderItem[];
  pricing: {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    phoneNumber?: string;
  };
  payment: {
    method: string;
    status: string;
  };
}

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        if (!orderId) throw new Error('Order ID is required');
        const data = await orderService.getOrderById(orderId);
        setOrder(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const copyOrderNumber = () => {
    if (order?.orderNumber) {
      navigator.clipboard.writeText(order.orderNumber);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error || 'Order not found'}</p>
            <Link
              to="/orders"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/orders"
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Order #{order.orderNumber}</h1>
            <button
              onClick={copyOrderNumber}
              className="inline-flex items-center text-white hover:text-blue-100"
              title="Copy Order Number"
            >
              <ClipboardDocumentIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 py-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-500">Placed on</div>
              <div className="text-sm font-medium">{formatDate(order.placedAt)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Payment</div>
              <div className="text-sm font-medium flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  order.payment.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></span>
                {order.payment.method} • {order.payment.status}
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <OrderStatusTracker 
              currentStatus={order.status} 
              statusHistory={order.statusHistory} 
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Items</h2>
          </div>
          <div className="divide-y">
            {order.items.map((item, index) => (
              <div key={index} className="px-6 py-4 flex items-center">
                <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden mr-4">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-medium">
                  {formatCurrency(item.price)}
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(order.pricing.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{formatCurrency(order.pricing.shipping)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">{formatCurrency(order.pricing.tax)}</span>
            </div>
            {order.pricing.discount > 0 && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">-{formatCurrency(order.pricing.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium text-base mt-4 pt-4 border-t">
              <span>Total</span>
              <span>{formatCurrency(order.pricing.total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Shipping Address</h2>
          </div>
          <div className="px-6 py-4">
            <address className="not-italic text-sm text-gray-600">
              <p className="mb-1">{order.shippingAddress.street}</p>
              <p className="mb-1">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pinCode}
              </p>
              <p className="mb-1">{order.shippingAddress.country}</p>
              {order.shippingAddress.phoneNumber && (
                <p className="mt-2">Phone: {order.shippingAddress.phoneNumber}</p>
              )}
            </address>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;