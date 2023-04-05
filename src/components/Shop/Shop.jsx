import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
      const addedProduct = products.find((product) => product.id === id);

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
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product.id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <section className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
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
    </section>
  );
};

export default Shop;
