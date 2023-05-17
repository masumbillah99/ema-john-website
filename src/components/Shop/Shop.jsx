import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // const itemPerPage = 10; // TODO: make it dynamic
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  const pageNumbers = [...Array(totalPages).keys()];

  /**
   * D-1. determine the total number of items
   * TODO-2. decide on the number of items per page
   * 3. Calculate the total number of pages
   * 4. determine the current page
   * 5. load the appropriate data
   */

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  // get item from local storage
  // 1. get id from object by looping(for in) object
  // 2. find Product with id
  // 3. Product.quantity set in our product quantity
  // 4. set in a [{}, {}] Array of objects
  // 5. set it in setCart. (retrieve)

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // 1. get id of the added product
    for (const id in storedCart) {
      // 2. find Product by using id
      const addedProduct = products.find((product) => product._id === id);

      if (addedProduct) {
        // 3. get Product quantity of the product
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // 4. set in a array of objects (add the added product to the saved cart)
        savedCart.push(addedProduct);
      }
    }
    // set it in setCart. (retrieve)
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    // cart.push(product);
    let newCart = [];
    // const newCart = [...cart, product];

    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1
    /** 
      ১. একটি ভেরিয়েবল নিলাম এক্সিট নামে এবং ফাইন্ড করলাম যে আমাদের প্রোডাক্টটির আইডি কার্টে আছে কি না,
        যদি না থাকে তাহলে -- প্রোডাক্ট পরিমাণ সেট করো ১  ..এবং নিউকার্টে এড করো আগের যে কার্ট ও নতুন প্রোডাক্ট।
      ২. আর যদি প্রোডাক্ট যদি এক্সিস্ট করে বা থাকে তাহলে তুমি তার পরিমান ১ বাড়াও ও ফিল্টার করে দেখতেছি যে, প্রোডাক্টটি কার্টে আছে কি না: 
        যদি না থাকে তাহলে বাকিগুলো ও সেটা এড করো।
    */
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  // handle select changes
  const options = [5, 10, 15, 20];
  const handleSelectChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to="/orders" className="link-btn-proceed">
              <button className="btn-proceed">
                <span>Review Order</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* pagination */}
      <div className="pagination">
        <p>current page: {currentPage}</p>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "active" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <select
          className="selected"
          value={itemsPerPage}
          onChange={handleSelectChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
