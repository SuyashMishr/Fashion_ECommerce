import api from './api';

class WishlistService {
  async getWishlist() {
    const response = await api.get('/wishlist');
    return response.data;
  }

  async addToWishlist(productId: string) {
    const response = await api.post('/wishlist', { productId });
    return response.data;
  }

  async removeFromWishlist(productId: string) {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data;
  }

  async clearWishlist() {
    const response = await api.delete('/wishlist');
    return response.data;
  }

  async isInWishlist(productId: string) {
    const response = await api.get(`/wishlist/check/${productId}`);
    return response.data;
  }
}

export default new WishlistService();
