import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./slices/productsSlice"
import successAlertReducer from "./slices/successAlertSlice"
import { productsApi } from "../api/productsApi"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    successAlert: successAlertReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
