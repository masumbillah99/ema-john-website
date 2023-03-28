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
    // console.log("products", products);
    const storedCart = getShoppingCart();
    const savedCart = [];

    // 1. get id
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
