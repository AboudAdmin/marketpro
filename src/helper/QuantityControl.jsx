import React, { useState } from 'react';

const QuantityControl = ({ initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <div className="quantity-control flex-align gap-12">
      <button
        className="w-32 h-32 flex-center border border-gray-200 rounded-6"
        onClick={handleDecrease}
      >
        -
      </button>
      <span className="text-lg fw-medium">{quantity}</span>
      <button
        className="w-32 h-32 flex-center border border-gray-200 rounded-6"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;