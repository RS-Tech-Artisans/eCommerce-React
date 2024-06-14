import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';
import { useSession } from '../utils/SessionContext';
import { Cart } from '@commercetools/platform-sdk';
import { fetchGetCartData } from '../utils/api/getLastCart';
import { addProduct } from '../utils/api/addProduct';
import { removeCartData } from '../utils/api/removeCartData';
import ClearCartButton from '../common/ClearCartButton';
import { removeProductFromCart } from '../utils/api/removeProductFromCart';

const Basket: React.FC = () => {
  const [cartItems, setCartItems] = useState<Cart | null>(null);
  //const [cartId, setCartId] = useState<string>();
  const { token } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          await addProduct(
            response.id,
            response.version + 3, // we change verion our cart
            '6ebeb15e-2bc9-4343-aef7-56cfc57c8470'
          );

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
                      {' '}
                      <a href={`/catalog/product/${itemProduct.productId}`}>
                        {itemProduct.name['en-US']}
                      </a>
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
                  <div className="product-actions">
                    <button
                      className="remove-from-cart-button"
                      onClick={() => removeProduct(itemProduct.id)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="total-price">
            Total Price: ${(item.totalPrice?.centAmount / 100).toFixed(2)}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
        <>
          <h1>Basket</h1>
          <div>{renderCartItem(cartItems)}</div>
          <div className="shopping-cart">
            {<ClearCartButton onClearCart={clearCart} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
