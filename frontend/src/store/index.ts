import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
// import productSlice from './slices/productSlice';
// import cartSlice from './slices/cartSlice';
// import wishlistSlice from './slices/wishlistSlice';
// import orderSlice from './slices/orderSlice';

// Simple cart slice for now
const cartSlice = {
  name: 'cart',
  reducer: (state = { items: [], totalItems: 0, totalAmount: 0 }) => state,
};

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice.reducer,
    // products: productSlice,
    // wishlist: wishlistSlice,
    // orders: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
