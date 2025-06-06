import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color?: string;
  quantity: number;
  stock: number;
  seller: {
    _id: string;
    name: string;
  };
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  totalItems: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,
};

// Calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalItems, totalAmount };
};

// Update initial state with calculated totals
const { totalItems, totalAmount } = calculateTotals(initialState.items);
initialState.totalItems = totalItems;
initialState.totalAmount = totalAmount;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const { productId, size, color, quantity = 1, ...itemData } = action.payload;
      
      const existingItemIndex = state.items.findIndex(
        item => item.productId === productId && item.size === size && item.color === color
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const existingItem = state.items[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        
        if (newQuantity <= existingItem.stock) {
          state.items[existingItemIndex].quantity = newQuantity;
        } else {
          state.error = 'Not enough stock available';
          return;
        }
      } else {
        // Add new item
        if (quantity <= itemData.stock) {
          state.items.push({
            productId,
            size,
            color,
            quantity,
            ...itemData,
          });
        } else {
          state.error = 'Not enough stock available';
          return;
        }
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;

      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
      state.error = null;
    },

    removeFromCart: (state, action: PayloadAction<{ productId: string; size: string; color?: string }>) => {
      const { productId, size, color } = action.payload;
      
      state.items = state.items.filter(
        item => !(item.productId === productId && item.size === size && item.color === color)
      );

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;

      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    updateQuantity: (state, action: PayloadAction<{ 
      productId: string; 
      size: string; 
      color?: string; 
      quantity: number 
    }>) => {
      const { productId, size, color, quantity } = action.payload;
      
      const itemIndex = state.items.findIndex(
        item => item.productId === productId && item.size === size && item.color === color
      );

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items.splice(itemIndex, 1);
        } else if (quantity <= item.stock) {
          // Update quantity if within stock limits
          state.items[itemIndex].quantity = quantity;
        } else {
          state.error = 'Not enough stock available';
          return;
        }

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;

        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(state.items));
        state.error = null;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },

    clearError: (state) => {
      state.error = null;
    },

    syncCartWithServer: (state, action: PayloadAction<CartItem[]>) => {
      // Sync cart with server data (for logged-in users)
      state.items = action.payload;
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    updateItemStock: (state, action: PayloadAction<{ productId: string; size: string; color?: string; stock: number }>) => {
      const { productId, size, color, stock } = action.payload;
      
      const itemIndex = state.items.findIndex(
        item => item.productId === productId && item.size === size && item.color === color
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].stock = stock;
        
        // If current quantity exceeds new stock, adjust it
        if (state.items[itemIndex].quantity > stock) {
          state.items[itemIndex].quantity = stock;
          
          // Recalculate totals
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.totalAmount = totals.totalAmount;

          // Update localStorage
          localStorage.setItem('cart', JSON.stringify(state.items));
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  clearError,
  syncCartWithServer,
  updateItemStock,
} = cartSlice.actions;

export default cartSlice.reducer;
