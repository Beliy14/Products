import React from "react"
import { Link } from "react-router-dom"
import { IoBagHandle } from "react-icons/io5"
import { FaRegSquarePlus } from "react-icons/fa6";
import { IconContext } from "react-icons"
import "../css/navbar.css"

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <h4>Menu</h4>
        <Link to="/products">Products</Link>
        <Link to="/create-product">Create product</Link>
      </div>
      <div className="navbar-mobile">
          <Link to="/products">
            <IconContext.Provider value={{ size: "26px" }}>
              <IoBagHandle />
            </IconContext.Provider>
            Products
          </Link>

          <Link to="/create-product">
            <IconContext.Provider value={{ size: "26px" }}>
              <FaRegSquarePlus />
            </IconContext.Provider>
            Create
          </Link>
      </div>
    </>
  )
}

export default Navbar
