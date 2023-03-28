import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
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
    console.log(storedCart);
  }, []);

  const handleAddToCart = (product) => {
    // cart.push(product);
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
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
        <Cart cart={cart}></Cart>
      </div>
    </section>
  );
};

export default Shop;
