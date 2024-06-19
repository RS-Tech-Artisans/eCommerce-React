import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';
import { useSession } from '../utils/SessionContext';
import { Cart } from '@commercetools/platform-sdk';
import { fetchGetCartData } from '../utils/api/getLastCart';
import { removeCartData } from '../utils/api/removeCartData';
import ClearCartButton from '../common/ClearCartButton';
import { getDiscountAPI } from '../utils/api/getDiscountApi';
import { removeProductFromCart } from '../utils/api/removeProductFromCart';

import { useCart } from '../utils/CartContext';
import { Button } from 'react-bootstrap';
import { updateQuantityItem } from '../utils/api/updateQuantityItem';
import { usePromoCodes } from '../utils/api/getPromoCodes';
import { getDiscount } from '../utils/api/getDiscountAmount';

const Basket: React.FC = () => {
  const [cartItems, setCartItems] = useState<Cart | null>(null);
  const { token } = useSession();
  const { setCartData } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [promoCode, setPromoCode] = useState('');
  const [showMessage, setShowMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string | null;
  }>({ type: null, text: null });
  const [isApplyPromo, setIsApplyPromo] = useState<boolean>(false);
  const promoCodesList = usePromoCodes();
  const [discounted, setDiscounted] = useState<number | null>(null);

  const fetchCartFromApi = async () => {
    console.log('fetchCartFromApi');
    try {
      const response: Cart = await fetchGetCartData(token);
      console.log('get response fetchGetCartData', response);
      console.log('response.lineItems.length', response.lineItems.length);

      if (response) {
        localStorage.setItem('cartitems', JSON.stringify(response));
        setCartItems(response);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setIsLoading(false);
    }
  };

  const fetchUpdatedCartData = async () => {
    try {
      const updatedCart: Cart = await fetchGetCartData(token);
      localStorage.setItem('cartitems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      setCartData(updatedCart);

      if (updatedCart.lineItems.length === 0) setCartItems(null);
    } catch (error) {
      console.error('Error fetching updated cart data:', error);
    }
  };

  const disResponse = async () => {
    try {
      const discountResponse = await getDiscount(token);
      if (discountResponse) setDiscounted(discountResponse);
    } catch (error) {
      console.error('Error to add discount:', error);
    }
  };

  useEffect(() => {
    localStorage.removeItem('cartitems'); // clear because we every time made new anonym user
    fetchCartFromApi();
    disResponse();
  }, [token]);

  // const loadCardId = () => {
  //   const cartDataString: string | null = localStorage.getItem('cartitems');
  //   if (cartDataString) {
  //     const cartData = JSON.parse(cartDataString);
  //     if (cartData) setCartId(cartData.id);
  //     console.log("cartData.id", cartData.id);
  //   }
  // }

  const applyPromoCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!promoCode) {
      setShowMessage({
        type: 'error',
        text: 'Please enter a promotional code.',
      });
      setTimeout(() => {
        setShowMessage({ type: null, text: null });
      }, 2000);
      return;
    }

    if (promoCode && cartItems) {
      if (promoCodesList.includes(promoCode)) {
        try {
          await getDiscountAPI(promoCode, cartItems);
          setShowMessage({
            type: 'success',
            text: 'Your promocode was successfully applied',
          });
          setIsApplyPromo(true);
          setTimeout(async () => {
            await fetchUpdatedCartData();
            setShowMessage({ type: null, text: null });
            const discountResponse = await getDiscount(token);
            if (discountResponse) setDiscounted(discountResponse);
          }, 2000);
        } catch (error) {
          setShowMessage({
            type: 'error',
            text: `The promotional code ${promoCode} is not valid.`,
          });
          setTimeout(() => {
            setShowMessage({ type: null, text: null });
          }, 2000);
        }
      } else {
        setIsApplyPromo(false);
        setShowMessage({
          type: 'error',
          text: `The promotional code ${promoCode} is not valid.`,
        });
        setTimeout(() => {
          setShowMessage({ type: null, text: null });
        }, 2000);
      }
    }
  };

  const clearCart = async () => {
    try {
      const resultRemoveCartData = await removeCartData(token);
      if (resultRemoveCartData) {
        localStorage.removeItem('cartitems');
        setCartItems(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await removeProductFromCart(token, id);
      setShowMessage({ type: 'success', text: 'Successfully deleted!' });
      setTimeout(async () => {
        setShowMessage({ type: null, text: null });
        await fetchUpdatedCartData();
      }, 1000);
    } catch (error) {
      setShowMessage({ type: 'error', text: 'Failed to remove item.' });
      setTimeout(() => setShowMessage({ type: null, text: null }), 3000);
      console.error('Error removing item from cart:', error);
    }
  };

  const handleMinus = async (id: string, count: number) => {
    try {
      await updateQuantityItem(token, id, count);
      await fetchUpdatedCartData();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handlePlus = async (id: string, count: number) => {
    try {
      await updateQuantityItem(token, id, count);
      await fetchUpdatedCartData();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const renderCartItem = (item: Cart) => {
    return (
      <>
        <div className="cart">
          <div className="cart-items">
            {item.lineItems.map((itemProduct) => (
              <div key={itemProduct.productId} className="cart-item">
                {itemProduct.variant?.images?.[0]?.url && (
                  <img
                    src={itemProduct.variant.images[0].url}
                    alt={itemProduct.name['en-US']}
                    className="product-image"
                  />
                )}
                <div className="product-details">
                  <div className="product-name">
                    <h3>
                      <Link
                        to={`/catalog/product/${itemProduct.productId}`}
                        className="view-details-basket"
                      >
                        {itemProduct.name['en-US']}
                      </Link>
                    </h3>
                  </div>
                  <div className="product-price">
                    {itemProduct.price.discounted ? (
                      <>
                        <span className="original-price">
                          $
                          {(
                            (itemProduct.quantity *
                              itemProduct.price.value.centAmount) /
                            100
                          ).toFixed(2)}
                        </span>
                        <span className="discounted-price">
                          $
                          {(
                            (itemProduct.quantity *
                              itemProduct.price.discounted.value.centAmount) /
                            100
                          ).toFixed(2)}
                        </span>
                        <div className="cost-for-one">
                          {' '}
                          {' ('}
                          {(
                            (itemProduct.quantity *
                              itemProduct.price.discounted.value.centAmount) /
                            100
                          ).toFixed(2)}
                          {' per piece)'}
                        </div>
                      </>
                    ) : (
                      <>
                        <span>
                          $
                          {(
                            (itemProduct.quantity *
                              itemProduct.price.value.centAmount) /
                            100
                          ).toFixed(2)}
                        </span>
                        <span className="cost-for-one">
                          {' '}
                          {' ('}
                          {(itemProduct.price.value.centAmount / 100).toFixed(
                            2
                          )}
                          {' per piece)'}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="control-buttons">
                    <button
                      className="remove-from-cart-button"
                      onClick={() => removeProduct(itemProduct.id)}
                    >
                      Remove from Cart
                    </button>
                    <div className="cart-buttons">
                      <button
                        className="cart-button"
                        onClick={() =>
                          handleMinus(itemProduct.id, itemProduct.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <div className="item-count">
                        <input
                          type="text"
                          id={itemProduct.id + 'input-block'}
                          className="count-input-block"
                          autoComplete="off"
                          value={itemProduct.quantity}
                          readOnly
                        ></input>
                      </div>
                      <button
                        className="cart-button"
                        onClick={() =>
                          handlePlus(itemProduct.id, itemProduct.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    {showMessage.type && (
                      <div
                        className={`toast ${showMessage.type === 'success' ? 'show' : ''}`}
                      >
                        {showMessage.text}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="shopping-cart">
            {<ClearCartButton onClearCart={clearCart} />}
          </div>
          <div>
            <form onSubmit={applyPromoCode} className="discount-form">
              <label htmlFor="promocode" className="label-promocode">
                PROMOCODE:
              </label>
              <input
                type="text"
                id="promocode"
                className="input-promo"
                value={promoCode}
                onChange={(e): void => setPromoCode(e.target.value)}
              />
              <Button type="submit" className="bg-dark" disabled={isApplyPromo}>
                Apply
              </Button>
              {showMessage.type && (
                <div
                  className={`toast ${showMessage.type === 'success' || showMessage.type === 'error' ? 'show' : ''}`}
                >
                  {showMessage.text}
                </div>
              )}
            </form>
            <div className="prices">
              <div className="total-price">
                Total Price: ${(item.totalPrice?.centAmount / 100).toFixed(2)}
              </div>
              {discounted !== null && (
                <div className="total-price-with-discount">
                  $
                  {((discounted + item.totalPrice?.centAmount) / 100).toFixed(
                    2
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="basket-container">
      {!cartItems || cartItems.lineItems.length === 0 ? (
        <div className="empty-cart-message">
          <h2>Your shopping cart is empty. Start shopping now!</h2>
          <p>
            Go to{' '}
            <Link to="/catalog" className="btn btn-primary">
              Product Catalog
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <h1>Basket</h1>
          <div>{renderCartItem(cartItems)}</div>
        </div>
      )}
    </div>
  );
};

export default Basket;
