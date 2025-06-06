import api from './api';

interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
    size: string;
    color?: string;
    price: number;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
    sameAsShipping?: boolean;
  };
  paymentMethod: string;
  couponCode?: string;
  notes?: string;
}

interface OrderParams {
  page?: number;
  limit?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

class OrderService {
  async getOrders(params: OrderParams = {}) {
    const { page = 1, limit = 10, ...filters } = params;
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    });

    const response = await api.get(`/orders?${queryParams}`);
    return response.data;
  }

  async getOrderById(orderId: string) {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  }

  async createOrder(orderData: CreateOrderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  }

  async cancelOrder(orderId: string, reason: string) {
    const response = await api.patch(`/orders/${orderId}/cancel`, { reason });
    return response.data;
  }

  async returnOrder(orderId: string, reason: string, items?: string[]) {
    const response = await api.patch(`/orders/${orderId}/return`, { reason, items });
    return response.data;
  }

  async trackOrder(orderNumber: string) {
    const response = await api.get(`/orders/track/${orderNumber}`);
    return response.data;
  }

  async getOrderInvoice(orderId: string) {
    const response = await api.get(`/orders/${orderId}/invoice`, {
      responseType: 'blob',
    });
    return response.data;
  }

  // Seller methods
  async getSellerOrders(params: OrderParams = {}) {
    const { page = 1, limit = 10, ...filters } = params;
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    });

    const response = await api.get(`/orders/seller/my-orders?${queryParams}`);
    return response.data;
  }

  async updateOrderStatus(orderId: string, status: string, note?: string) {
    const response = await api.patch(`/orders/${orderId}/status`, { status, note });
    return response.data;
  }

  async updateOrderShipping(orderId: string, shippingData: {
    carrier?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
  }) {
    const response = await api.patch(`/orders/${orderId}/shipping`, shippingData);
    return response.data;
  }

  async getOrderStats(dateRange?: { start: string; end: string }) {
    const queryParams = dateRange 
      ? new URLSearchParams({
          startDate: dateRange.start,
          endDate: dateRange.end,
        })
      : '';

    const response = await api.get(`/orders/seller/stats?${queryParams}`);
    return response.data;
  }

  async exportOrders(params: OrderParams & { format: 'csv' | 'excel' }) {
    const queryParams = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    );

    const response = await api.get(`/orders/export?${queryParams}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export default new OrderService();
