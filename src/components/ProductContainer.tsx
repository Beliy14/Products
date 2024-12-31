import React from "react"
import { deleteProduct, toggleFavorite } from "../redux/slices/productsSlice"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { CgCloseO } from "react-icons/cg"
import { IconContext } from "react-icons"
import { useAppDispatch } from "../redux/hooks"
import { IProduct } from "../models/IProduct"
import { Link } from "react-router-dom"
import "../css/products.css"

interface IProductContainerProps {
  product: IProduct
}

const ProductContainer: React.FC<IProductContainerProps> = ({ product }) => {
  const dispatch = useAppDispatch()

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(productId))
  }

  const onDeleteProduct = (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteProduct(productId))
  }

  return (
    <Link to={`/products/${product.id}`} className="card-container">
      <div className="controls">
        <button onClick={(e) => handleFavorite(e, product.id)}>
          {product.favorite ? (
            <IconContext.Provider value={{ color: "#f55a5a", size: "26px" }}>
              <GoHeartFill />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#333", size: "26px" }}>
              <GoHeart />
            </IconContext.Provider>
          )}
        </button>
        <button onClick={(e) => onDeleteProduct(e, product.id)}>
          <IconContext.Provider value={{ color: "#333", size: "26px" }}>
            <CgCloseO />
          </IconContext.Provider>
        </button>
      </div>
      <img src={product.images[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <span>${product.price}</span>
    </Link>
  )
}

export default ProductContainer
