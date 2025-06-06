import api from './api';

interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  rating?: number;
  sort?: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'rating' | 'popular';
  search?: string;
}

interface ProductParams {
  page?: number;
  limit?: number;
  filters?: ProductFilters;
}

class ProductService {
  async getProducts(params: ProductParams = {}) {
    const { page = 1, limit = 12, filters = {} } = params;
    
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

    const response = await api.get(`/products?${queryParams}`);
    return response.data;
  }

  async getProductById(id: string) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  async searchProducts(query: string, page = 1, limit = 12) {
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    return response.data;
  }

  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  }

  async getCategoryById(id: string) {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  }

  async getFeaturedProducts(limit = 8) {
    const response = await api.get(`/products?featured=true&limit=${limit}`);
    return response.data;
  }

  async getTrendingProducts(limit = 8) {
    const response = await api.get(`/products?trending=true&limit=${limit}`);
    return response.data;
  }

  async getNewArrivals(limit = 8) {
    const response = await api.get(`/products?newArrival=true&limit=${limit}`);
    return response.data;
  }

  async getOnSaleProducts(limit = 8) {
    const response = await api.get(`/products?onSale=true&limit=${limit}`);
    return response.data;
  }

  async getRelatedProducts(productId: string, limit = 4) {
    const response = await api.get(`/products/${productId}/related?limit=${limit}`);
    return response.data;
  }

  async getBrands() {
    const response = await api.get('/products/brands');
    return response.data;
  }

  async getProductReviews(productId: string, page = 1, limit = 10) {
    const response = await api.get(`/products/${productId}/reviews?page=${page}&limit=${limit}`);
    return response.data;
  }

  async addProductReview(productId: string, reviewData: {
    rating: number;
    comment: string;
    title?: string;
  }) {
    const response = await api.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  }

  async updateProductReview(productId: string, reviewId: string, reviewData: {
    rating?: number;
    comment?: string;
    title?: string;
  }) {
    const response = await api.put(`/products/${productId}/reviews/${reviewId}`, reviewData);
    return response.data;
  }

  async deleteProductReview(productId: string, reviewId: string) {
    const response = await api.delete(`/products/${productId}/reviews/${reviewId}`);
    return response.data;
  }

  // Seller methods
  async createProduct(productData: FormData) {
    const response = await api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updateProduct(productId: string, productData: FormData) {
    const response = await api.put(`/products/${productId}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteProduct(productId: string) {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  }

  async getSellerProducts(params: ProductParams = {}) {
    const { page = 1, limit = 12, filters = {} } = params;
    
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

    const response = await api.get(`/products/seller/my-products?${queryParams}`);
    return response.data;
  }

  async updateProductStatus(productId: string, status: 'draft' | 'active' | 'inactive' | 'archived') {
    const response = await api.patch(`/products/${productId}/status`, { status });
    return response.data;
  }

  async bulkUpdateProducts(productIds: string[], updates: {
    status?: string;
    featured?: boolean;
    trending?: boolean;
  }) {
    const response = await api.patch('/products/bulk-update', {
      productIds,
      updates,
    });
    return response.data;
  }

  async uploadProductImages(productId: string, images: File[]) {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    const response = await api.post(`/products/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteProductImage(productId: string, imageId: string) {
    const response = await api.delete(`/products/${productId}/images/${imageId}`);
    return response.data;
  }
}

export default new ProductService();
