import { configureStore } from "@reduxjs/toolkit"

import cartReducer from "./slices/cartSlice"
import nametagBuilderReducer from "./slices/nametagBuilderSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    nametagBuilder: nametagBuilderReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
