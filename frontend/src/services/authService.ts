import api from './api'; // ✅ Make sure this import is uncommented and points to your Axios setup file

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'buyer' | 'seller';
  businessInfo?: {
    businessName: string;
    businessType: string;
    taxId?: string;
    businessAddress?: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  password: string;
}

class AuthService {
  async login(credentials: LoginCredentials) {
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return { data };
  }

  async register(userData: RegisterData) {
    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return { data };
  }

  async logout(refreshToken: string | null) {
    const response = await api.post('/auth/logout', { refreshToken });
    return response.data;
  }

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordData) {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  }

  async resetPassword(token: string, data: ResetPasswordData) {
    const response = await api.put(`/auth/reset-password/${token}`, data); // ✅ fixed
    return response.data;
  }

  async verifyEmail(token: string) {
    const response = await api.get(`/auth/verify-email/${token}`); // ✅ fixed
    return response.data;
  }

  async refreshToken(refreshToken: string) {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  }

  async updateProfile(userData: Partial<{
    firstName: string;
    lastName: string;
    phone: string;
    avatar: File;
  }>) {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'avatar' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      }
    });

    const response = await api.put('/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    const response = await api.put('/users/change-password', data);
    return response.data;
  }

  async addAddress(addressData: {
    type: 'home' | 'work' | 'other';
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
    isDefault?: boolean;
  }) {
    const response = await api.post('/users/addresses', addressData);
    return response.data;
  }

  async updateAddress(addressId: string, addressData: any) {
    const response = await api.put(`/users/addresses/${addressId}`, addressData); // ✅ fixed
    return response.data;
  }

  async deleteAddress(addressId: string) {
    const response = await api.delete(`/users/addresses/${addressId}`); // ✅ fixed
    return response.data;
  }

  async updatePreferences(preferences: {
    newsletter?: boolean;
    smsNotifications?: boolean;
    pushNotifications?: boolean;
  }) {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  }
}

export default new AuthService();
