import React from 'react';
import './ClearCartButton.css';
import { ClearCartButtonProps } from '../utils/Interfaces';
import { useCart } from '../utils/CartContext';

const ClearCartButton: React.FC<ClearCartButtonProps> = ({ onClearCart }) => {
  const { setCart } = useCart();
  const handleClick = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your shopping cart? This action cannot be undone.'
      )
    ) {
      onClearCart();

      setCart([]);
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-danger">
      Clear Shopping Cart
    </button>
  );
};

export default ClearCartButton;
