import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Products from "./pages/Products"
import Navbar from "./components/Navbar"
import CreateProduct from "./pages/CreateProduct"
import { useGetProductsQuery } from "./api/productsApi"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { setProducts } from "./redux/slices/productsSlice"
import ProductPage from "./pages/ProductPage"
import SuccessAlert from "./components/SuccessAlert"
import "./css/app.css"
import { setSuccessAlert } from "./redux/slices/successAlertSlice"

function App() {
  const dispatch = useAppDispatch()
  const showSuccessAlert = useAppSelector((state) => state.successAlert.show)
  const { data, error, isLoading } = useGetProductsQuery("")

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data.products))
    }
  }, [data, dispatch])

  useEffect(() => {
    if (showSuccessAlert) {
      setTimeout(() => {
        dispatch(setSuccessAlert({show: false, text: ""}))
      }, 2500)
    }
  }, [dispatch, showSuccessAlert])

  return (
    <div className="app">
      {showSuccessAlert && <SuccessAlert />}
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/products" element={<Products isError={error} isLoading={isLoading} />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/create-product" element={<CreateProduct />} />

          <Route path="*" element={<Products isError={error} isLoading={isLoading} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
