import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
  // destructuring
  // const { cart } = props;
  // console.log(cart);

  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    // if (product.quantity === 0) {
    //   product.quantity = 1;
    // }
    // product.quantity = product.quantity || 1;

    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping * product.quantity;
    quantity = quantity + product.quantity;
  }

  // tax charge 7%
  const tax = (totalPrice * 7) / 100;

  // grand total
  const grandTotal = totalPrice + totalShipping + tax;
  // console.log(typeof grandTotal);

  return (
    <div className="cart">
      <h1>Order Summary</h1>
      {/* <p>Selected Items: {cart.length}</p> */}
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping Charge: ${totalShipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
