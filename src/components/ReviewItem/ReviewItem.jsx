import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./ReviewItem.css";

const ReviewItem = ({ product, handleDelete }) => {
  const { _id, img, name, price, quantity } = product;

  return (
    <div className="review-item">
      <img src={img} alt="product image" />
      <div className="review-details">
        <p className="product-title">{name}</p>
        <p>
          Price: <span className="text-orange">${price}</span>
        </p>
        <p>
          Order Quantity: <span className="text-orange">${quantity}</span>
        </p>
      </div>
      <button onClick={() => handleDelete(_id)} className="btn-delete">
        <FontAwesomeIcon className="delete-icon" icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ReviewItem;
