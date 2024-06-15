import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';
import { useSession } from '../utils/SessionContext';
import { Cart } from '@commercetools/platform-sdk';
import { fetchGetCartData } from '../utils/api/getLastCart';
import { addProduct } from '../utils/api/addProduct';
import { removeCartData } from '../utils/api/removeCartData';
import ClearCartButton from '../common/ClearCartButton';
import { getDiscountAPI } from '../utils/api/getDiscountApi';
import { removeProductFromCart } from '../utils/api/removeProductFromCart';
import { Button } from 'react-bootstrap';
import { updateQuantityItem } from '../utils/api/updateQuantityItem';

const Basket: React.FC = () => {
  const [cartItems, setCartItems] = useState<Cart | null>(null);
  //const [cartId, setCartId] = useState<string>();
  const { token } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [promoCode, setPromoCode] = useState('');
  const [successPromo, setSuccessPromo] = useState(false);
  const [showMessage, setShowMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string | null;
  }>({ type: null, text: null });
  const promo: string = "RSS-2024";
  const promo1: string = "QLED";


  const fetchCartFromApi = async () => {
    console.log('fetchCartFromApi');
    try {
      const response: Cart = await fetchGetCartData(token);
      console.log('get response fetchGetCartData', response);
      console.log('response.lineItems.length', response.lineItems.length);
      //setCartId(response.id);
      if (response) {
        if (response.lineItems.length === 0) {
          // we need to be carefull if we clear all product we autocreate new items all time
          await addProduct(
            response.id,
            response.version,
            '02a7b7d0-8e7b-4841-9171-986d1ff8df93'
          );
          await new Promise((resolve) => setTimeout(resolve, 1000));

          await addProduct(
            response.id,
            response.version + 3, // we change verion our cart
            '6ebeb15e-2bc9-4343-aef7-56cfc57c8470'
          );
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await addProduct(
            response.id,
            response.version + 6,
            'd92c62c2-deef-439b-8cf8-940511c02bcb'
          );
        }
      }

      const response2: Cart = await fetchGetCartData(token);
      localStorage.setItem('cartitems', JSON.stringify(response2));

      // const savedCart = JSON.parse(localStorage.getItem('cartitems') || '{}');
      // setCartItems(savedCart);
      setCartItems(response2);

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

      if (updatedCart.lineItems.length === 0) setCartItems(null);
    } catch (error) {
      console.error('Error fetching updated cart data:', error);
    }
  };

  useEffect(() => {
    // const savedCart = JSON.parse(localStorage.getItem('cartitems') || '{}');
    // console.log('savedCart: ', savedCart, typeof savedCart);
    // if (savedCart && Object.keys(savedCart).length > 0) {
    //   setCartItems(savedCart);
    //   setIsLoading(false);
    // } else {
    //   fetchCartFromApi();
    // }
    //setCartExists(savedCart.length > 0);
    // loadCardId();

    localStorage.removeItem('cartitems'); // clear because we every time made new anonym user
    fetchCartFromApi();
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
    if (promoCode && cartItems) {
      if (promoCode === promo || promoCode === promo1) {
        try {
          await getDiscountAPI(promoCode, cartItems);
          setSuccessPromo(true);
          setShowMessage({
            type: 'success',
            text: 'Your promocode was successfully applied',
          });
          setTimeout(async () => {
            await fetchUpdatedCartData();
            setShowMessage({ type: null, text: null });
          }, 2000);
        } catch (error) {
          setSuccessPromo(false);
          setShowMessage({
            type: 'error',
            text: `The promotional code ${promoCode} is not valid.`,
          });
          setTimeout(() => {
            setShowMessage({ type: null, text: null });
          }, 2000);
        }
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
                    width="200px"
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
                          {(itemProduct.price.value.centAmount / 100).toFixed(
                            2
                          )}
                        </span>
                        <span className="discounted-price">
                          $
                          {(
                            itemProduct.price.discounted.value.centAmount / 100
                          ).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span>
                        ${(itemProduct.price.value.centAmount / 100).toFixed(2)}
                      </span>
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
          <div className="total-price">
            Total Price: ${(item.totalPrice?.centAmount / 100).toFixed(2)}
          </div>
          <div className="discount-container">
            <form onSubmit={applyPromoCode} className="discount-form">
              <label
                htmlFor="promocode"
                className='label-promocode'
              >
                PROMOCODE:
              </label>
              <input
                type="text"
                id="promocode"
                className="input-promo"
                value={promoCode}
                onChange={(e): void => setPromoCode(e.target.value)}
              />
              <Button type="submit" className="bg-dark">
                Apply
              </Button>
              {showMessage.type && (
                <div
                  className={`toast ${showMessage.type === 'success' ? 'show' : ''}`}
                >
                  {showMessage.text}
                </div>
              )}
            </form>
            <p className="total-price">
              Total Price with promocode: $
              {(item.totalPrice?.centAmount / 100).toFixed(2)}
            </p>
          </div>
        </div>
        for debug !!! Delete after
        <ul>
          <li>version: {item.version} </li>
          <li> anonymousId: {item.anonymousId} </li>
          <li> customerId: {item.customerId} </li>
          <li> id: {item.id}</li>
          <li>
            {item.totalPrice?.currencyCode} {item.cartState}{' '}
          </li>
          {<li> lineItems.length: {item.lineItems.length}</li>}
        </ul>
      </>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="basket-container">
      {!cartItems ? (
        <div className="empty-cart-message">
          <p>Your shopping cart is empty. Start shopping now!</p>
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
          <div className="shopping-cart">
            {<ClearCartButton onClearCart={clearCart} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
