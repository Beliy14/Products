import React, { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { IProduct } from "../models/IProduct"
import { IconContext } from "react-icons"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { CgCloseO } from "react-icons/cg"
import { CiEdit } from "react-icons/ci"
import { IoChevronBack } from "react-icons/io5"
import { deleteProduct, toggleFavorite } from "../redux/slices/productsSlice"
import EditProduct from "../components/EditProduct"
import "../css/productPage.css"

const ProductPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { products } = useAppSelector((state) => state.products)

  const [noFoundProduct, setNoFoundProduct] = useState<boolean>(false)
  const [loadingProduct, setLoadingProduct] = useState<boolean>(true)
  const [editMode, setEditMode] = useState<boolean>(false)

  const product = products.find((product: IProduct) => product.id === Number(id))

  const handleFavorite = (productId: number) => {
    dispatch(toggleFavorite(productId))
  }

  const onDeleteProduct = (productId: number) => {
    dispatch(deleteProduct(productId))
    setTimeout(() => navigate("/products"), 0)
  }

  const onExit = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (editMode) {
          setEditMode(false)
        } else {
          navigate("/products")
        }
      }
    },
    [navigate, editMode]
  )

  const clickBackBtn = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      navigate("/products")
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onExit)

    return () => {
      window.removeEventListener("keydown", onExit)
    }
  }, [onExit])

  useEffect(() => {
    let timer: any

    timer = setTimeout(() => {
      if (!product) {
        setNoFoundProduct(true)
        setLoadingProduct(false)
      }
    }, 3000)

    if (product) {
      clearTimeout(timer)
      setLoadingProduct(false)
    }

    return () => clearTimeout(timer)
  }, [product])

  if (loadingProduct) return <div className="loading">Loading...</div>
  if (noFoundProduct) return <div className="error">Product not found</div>

  return (
    <>
      <button className="back-btn" onClick={clickBackBtn}>
        <IconContext.Provider value={{ color: "#555", size: "30px" }}>
          <IoChevronBack />
        </IconContext.Provider>
      </button>
      {editMode ? (
        <EditProduct productId={Number(id)} setEditMode={setEditMode} />
      ) : (
        <div className="product-page">
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            <IconContext.Provider value={{ color: "#333", size: "30px" }}>
              <CiEdit />
            </IconContext.Provider>
          </button>
          <img src={product?.images[0]} alt={product?.title} />
          <div className="product-controls">
            <button onClick={() => handleFavorite(product?.id)}>
              {product?.favorite ? (
                <IconContext.Provider value={{ color: "#f55a5a", size: "26px" }}>
                  <GoHeartFill />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ color: "#333", size: "26px" }}>
                  <GoHeart />
                </IconContext.Provider>
              )}
            </button>
            <button onClick={() => onDeleteProduct(product?.id)}>
              <IconContext.Provider value={{ color: "#333", size: "26px" }}>
                <CgCloseO />
              </IconContext.Provider>
            </button>
          </div>
          <h2 className="product-title">
            {product?.title}
            <span> - {product?.brand}</span>
          </h2>
          <p className="product-description">{product?.description}</p>
          <p className="product-price">Price: ${product?.price}</p>
          {product?.rating && <p className="product-rating">Rating: {product.rating}</p>}
        </div>
      )}
    </>
  )
}

export default ProductPage
