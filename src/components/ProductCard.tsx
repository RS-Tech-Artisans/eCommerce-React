import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import { ProductCardProps } from '../utils/Interfaces';
import { Link } from 'react-router-dom';
//import { useCart } from '../utils/CartContext';
import { Cart } from '@commercetools/platform-sdk';
//import { fetchGetCartData } from '../utils/api/getLastCart';
//import { useSession } from '../utils/SessionContext';
import { addProduct } from '../utils/api/addProduct';

export const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price / 100);
};

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
  //const { setCart } = useCart();
  //const [cartItems, setCartItems] = useState<Cart | null>(null);
  //const { token } = useSession();
  //const [product, setProduct] = useState<ProductCardProps | null>(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setIsInCart(cart.some((item: { id: string }) => item.id === id));

  }, [id]);
  /*
    useEffect(() => {
      const fetchCartFromApi = async () => {
        console.log('fetchCartFromApi');
        try {
          const response: Cart = await fetchGetCartData(token);
          console.log('get response fetchGetCartData', response);
          console.log('response.lineItems.length', response.lineItems.length);
  
          if (response) {
            setCartItems(response);
          }
  
          localStorage.setItem('cartitems', JSON.stringify(response));
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      };
      fetchCartFromApi();
    });
  */
  const addToCart = async () => {
    console.log(JSON.parse(localStorage.getItem('cartitems') || '[]'));
    const CartItems: Cart = JSON.parse(localStorage.getItem('cartitems') || '[]')

    console.log('cartItems', CartItems)
    console.log('cartItems.id', CartItems.id)
    console.log('cartItems.version', CartItems.version)
    console.log('id', id)
    try {
      if (CartItems) {
        await addProduct(CartItems.id, CartItems.version, id);
        console.log(JSON.parse(localStorage.getItem('cartitems') || '[]'));
        localStorage.setItem('cartitems', JSON.stringify(CartItems));
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
    /*
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, { id, name, price }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setIsInCart(true);
    setCart(updatedCart);
    */
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={name} className="product-image" />
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

      <div className="product-content">
        <div className="product-details">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
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
      </div>
    </div>
  );
};

export default ProductCard;
