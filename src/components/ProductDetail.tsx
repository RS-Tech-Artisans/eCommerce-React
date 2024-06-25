import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import { MdArrowBackIos } from 'react-icons/md';
import 'react-image-gallery/styles/css/image-gallery.css';

import { getProductDetailById } from '../utils/api/getProductsDetail';
import { removeProductFromCart } from '../utils/api/removeProductFromCart';
import { fetchGetCartData } from '../utils/api/getLastCart';
import { addProduct } from '../utils/api/addProduct';

import { useCart } from '../utils/CartContext';
import { useSession } from '../utils/SessionContext';

import { mapProducts } from '../utils/productMapper';
import {
  ProductAttributes,
  ProductCardProps,
  ProductImages,
} from '../utils/Interfaces';

import './ProductDetail.css';
import { Cart } from '@commercetools/platform-sdk';
import ToastMessage from '../common/ToastMessage';

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [attributes, setAttributes] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const [isInCart, setIsInCart] = useState(false);
  const { setCartData } = useCart();
  const { token } = useSession();
  const [IdRecord, setIdRecord] = useState<string>('');
  const [cartItems, setCartItems] = useState<Cart | null>(null);
  const [loaderCart, setLoaderCart] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string | null;
  }>({ type: null, text: null });

  const fetchCartFromApi = async () => {
    try {
      const response: Cart = await fetchGetCartData(token);
      setLoaderCart(false);
      if (response) {
        setCartItems(response);
        setCartData(response);
      }

      localStorage.setItem('cartitems', JSON.stringify(response));
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const checkProductState = () => {
    const cartData = JSON.parse(localStorage.getItem('cartitems') || '{}');
    const lineItems = cartData.lineItems || [];
    const foundItem = lineItems.find(
      (item: { productId: string }) => item.productId === id
    );

    if (foundItem) {
      setIdRecord(foundItem.id);
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  };

  const getProductData = async () => {
    if (id) {
      try {
        const fetchProducts = await getProductDetailById(id);
        const productDetail = mapProducts([fetchProducts]);
        const images1 = fetchProducts?.masterVariant?.images?.map(
          (image: ProductImages) => image.url
        );
        const atributesArray = fetchProducts?.masterVariant?.attributes?.map(
          (brand: ProductAttributes) => brand.value
        );

        setAttributes(atributesArray || []);
        setProduct(productDetail[0]);
        setImages(images1 || []);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
  };

  useEffect(() => {
    fetchCartFromApi();
    getProductData();
    checkProductState();
  }, [id]);

  const addToCart = async () => {
    setLoaderCart(true);

    try {
      if (cartItems && product) {
        await addProduct(cartItems.id, cartItems.version, product.id);
        await fetchCartFromApi();
        setIsInCart(true);
        checkProductState();
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const formatPrice = (
    priceObject: { centAmount: number; currencyCode: string } | undefined
  ) => {
    if (priceObject) {
      const formattedPrice =
        (priceObject.centAmount / 100).toFixed(2) +
        ' ' +
        priceObject.currencyCode;
      return formattedPrice;
    }
    return 'No price available';
  };

  const discountedPrice = product?.price?.discounted?.value.centAmount;
  const typeAttribute: string[] = ['Brand: ', 'Size: ', 'Display: '];

  const removeProduct = async (record: string) => {
    try {
      await removeProductFromCart(token, record);
      setShowMessage({ type: 'success', text: 'Successfully deleted!' });
      setTimeout(async () => {
        setShowMessage({ type: null, text: null });
      }, 1000);
      await fetchCartFromApi();
      setIsInCart(false);
      checkProductState();
    } catch (error) {
      setShowMessage({ type: 'error', text: 'Failed to remove item.' });
      setTimeout(() => setShowMessage({ type: null, text: null }), 3000);
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <>
      {loaderCart && <div className="loader"></div>}
      <Container
        className="bg-light pt-3 rounded shadow-lg"
        style={{ marginTop: '40px' }}
      >
        <Link
          to={`/catalog`}
          style={{ fontSize: '20px', fontWeight: 'bold' }}
          className="text-dark"
        >
          <MdArrowBackIos /> To Catalog
        </Link>
        {product ? (
          <Container className="d-flex flex-column mt-4">
            <div className="container-detail">
              <div className="slide-container">
                {images.length > 0 ? (
                  <ImageGallery
                    items={images.map((url) => ({
                      original: url,
                      thumbnail: url,
                    }))}
                  />
                ) : (
                  <img
                    src={product.imageUrl}
                    alt="image"
                    width={400}
                    height={400}
                  />
                )}
              </div>
              <div>
                <h3 style={{ marginBottom: '20px' }}>{product.name}</h3>
                {attributes.length > 0 && (
                  <div className="attributes">
                    {attributes.map((attribute, index) => (
                      <p key={attribute}>
                        <span
                          style={{ fontWeight: 'bold', marginRight: '20px' }}
                        >
                          {typeAttribute[index]}
                        </span>
                        {attribute}
                      </p>
                    ))}
                  </div>
                )}
                <div className="price">
                  {discountedPrice !== undefined && discountedPrice > 0 ? (
                    <>
                      <div className="original-price ">
                        {formatPrice(product.price?.value)}
                      </div>
                      <div className="discounted-price">
                        {formatPrice(product.price?.discounted?.value)}
                      </div>
                    </>
                  ) : (
                    <div>{formatPrice(product.price?.value)}</div>
                  )}
                </div>
                <div className="button-container">
                  <button
                    onClick={addToCart}
                    className="add-to-cart-button"
                    disabled={isInCart}
                  >
                    {isInCart ? 'In Cart' : 'Add to Cart'} 🛒
                  </button>
                  {isInCart && (
                    <button
                      className="remove-from-cart"
                      onClick={() => removeProduct(IdRecord!)}
                    >
                      Remove from Cart
                    </button>
                  )}
                </div>
                <ToastMessage type={showMessage.type} text={showMessage.text} />
              </div>
            </div>
            <div>
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>
          </Container>
        ) : (
          <p>Loading product details...</p>
        )}
        <ToastMessage type={showMessage.type} text={showMessage.text} />
      </Container>
    </>
  );
};

export default ProductDetail;
