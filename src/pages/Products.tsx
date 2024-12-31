import React, { useState, useEffect } from "react"
import { useAppSelector } from "../redux/hooks"
import ProductContainer from "../components/ProductContainer"
import { IProduct } from "../models/IProduct"
import { useDebounce } from "../hooks/useDebounce"
import "../css/products.css"

interface IProductProps {
  isError: any
  isLoading: boolean
}

const Products: React.FC<IProductProps> = ({ isError, isLoading }) => {
  const { products, favorites } = useAppSelector((state) => state.products)

  const [productType, setProductType] = useState("")
  const [searchValue, setSearchValue] = useState<string>("")
  const [filteredProducts, setFilteredProducts] = useState<Array<IProduct>>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const debouncedSearchTerm = useDebounce(searchValue, 300)

  const productsPerPage: number = 15
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const noFavorites = productType === "favorites" && !isLoading && !isError && !favorites.length
  const noFilteredProducts = !filteredProducts.length && !isLoading && !isError

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const displayProducts = React.useMemo(() => {
    switch (productType) {
      case "products":
        return products
      case "favorites":
        return favorites
      case "alphabetically":
        return [...products].sort((a: IProduct, b: IProduct) => a.title.localeCompare(b.title))
      case "price":
        return [...products].sort((a: IProduct, b: IProduct) => a.price - b.price)
      default:
        return products
    }
  }, [productType, products, favorites])

  useEffect(() => {
    const filtered = displayProducts.filter((product) => product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    setFilteredProducts(filtered)
    if (debouncedSearchTerm || productType === "favorites") {
      setCurrentPage(1)
    }
  }, [displayProducts, debouncedSearchTerm, productType])

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <h1>Products</h1>

      <div className="type-product">
        <span>Filter: </span>
        <select value={productType} onChange={(e) => setProductType(e.target.value)}>
          <option value="">No filter</option>
          <option value="favorites">Favorites</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="price">Price</option>
        </select>
      </div>

      <input className="search-products" type="text" value={searchValue} onChange={handleSearchProduct} placeholder="Search by title..." />

      <div className="cards">
        {currentProducts?.map((product) => (
          <ProductContainer product={product} key={product.id} />
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
            {i + 1}
          </button>
        ))}
      </div>

      {noFavorites && <p className="no-found-product">Add your favorite products!</p>}
      {noFilteredProducts && <p className="no-found-product">Products not found</p>}

      {isLoading && <div className="loading">Loading...</div>}
      {isError && <div className="error">{isError.error}</div>}
    </>
  )
}

export default Products