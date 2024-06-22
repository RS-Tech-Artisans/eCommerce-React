import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import { ProductCardProps } from '../utils/Interfaces';
import { Link } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';
import { addProduct } from '../utils/api/addProduct';
import { fetchGetCartData } from '../utils/api/getLastCart';
import { useSession } from '../utils/SessionContext';
import { useCart } from '../utils/CartContext';
import { checkProductState } from '../utils/checkProductState';

export const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price / 100);
};

const SIZE_DESCRIPTION = 250;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  imageUrl,
  description,
  price,
}) => {
  const originalPrice = price.value.centAmount;
  const discountedPrice = price.discounted?.value.centAmount;
  const currency = price.value.currencyCode;
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [loaderCart, setLoaderCart] = useState<boolean>(false);
  const { token } = useSession();
  const { setCartData } = useCart();

  useEffect(() => {
    //checkCart();
    setIsInCart(checkProductState(id));
  }, [id]);

  const fetchCartFromApi = async () => {
    try {
      const response: Cart = await fetchGetCartData(token);
      setLoaderCart(false);
      if (response) {
        setCartData(response);
      }

      localStorage.setItem('cartitems', JSON.stringify(response));
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const addToCart = async () => {
    setLoaderCart(true);
    const CartItems: Cart = JSON.parse(
      localStorage.getItem('cartitems') || '[]'
    );

    try {
      if (CartItems) {
        await addProduct(CartItems.id, CartItems.version, id);
        await fetchCartFromApi();
        setIsInCart(true);
        setIsInCart(checkProductState(id));
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  return (
    <>
      {loaderCart && <div className="loader"></div>}
      <div className="product-card">
        <div className="product-image-wrapper">
          <img src={imageUrl} alt={name} className="product-image" />
        </div>

        <div className="product-content">
          <div className="product-details">
            <h3 className="product-title">{name}</h3>

            <div className="price-wrapper">
              {discountedPrice ? (
                <div className="prices">
                  <span className="original-price">
                    {formatPrice(originalPrice, currency)}
                  </span>
                  <span className="discounted-price">
                    {formatPrice(discountedPrice, currency)}
                  </span>
                </div>
              ) : (
                <div className="prices">
                  <span>{formatPrice(originalPrice, currency)}</span>
                </div>
              )}
            </div>

            <p>{truncateDescription(description, SIZE_DESCRIPTION)}</p>
          </div>
        </div>
        <div className="buttons-card">
          <Link to={`/catalog/product/${id}`} className="view-details-button">
            View Details
          </Link>
          <button
            onClick={addToCart}
            className="add-to-cart-button"
            disabled={isInCart}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'} 🛒
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
