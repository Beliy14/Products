import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IProduct } from "../../models/IProduct"

interface ProductsState {
  products: IProduct[]
  favorites: IProduct[]
}

const initialState: ProductsState = {
  products: [],
  favorites: [],
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload
    },

    toggleFavorite(state, action: PayloadAction<number>) {
      const productId = action.payload
      const product = state.products.find((p) => p.id === productId)
      product.favorite = !product.favorite

      if (product.favorite) {
        state.favorites.push(product)
      } else {
        state.favorites = state.favorites.filter((p) => p.id !== productId)
      }
    },

    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload)
      state.favorites = state.favorites.filter((p) => p.id !== action.payload)
    },

    createProduct(state, action: PayloadAction<IProduct>) {
      state.products.push(Object(action.payload))
    },

    updateProduct(state, action: PayloadAction<IProduct>) {
      const product = state.products.find((p) => p.id === action.payload.id)
      Object.assign(product, action.payload)
    },
  },
})

export const { setProducts, toggleFavorite, deleteProduct, createProduct, updateProduct } = productsSlice.actions
export default productsSlice.reducer
