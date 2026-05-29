import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // فرض بر اینکه اسلایس کارت را دارید

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// تعریف تایپ‌های RootState و AppDispatch برای استفاده در هوک‌ها
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
