import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
  // destructuring
  // const { cart } = props;
  console.log(cart);

  let totalPrice = 0;
  let totalShipping = 0;
  for (const product of cart) {
    totalPrice = totalPrice + product.price;
    totalShipping = totalShipping + product.shipping;
  }

  // tax charge 7%
  const tax = ((totalPrice * 7) / 100).toFixed(2);

  // grand total
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart">
      <h1>Order Summary</h1>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping Charge: ${totalShipping}</p>
      <p>Tax: ${tax}</p>
      <h3>Grand Total: ${grandTotal}</h3>
    </div>
  );
};

export default Cart;
