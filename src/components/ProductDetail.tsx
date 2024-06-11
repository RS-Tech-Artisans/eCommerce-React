import { Link, useParams } from 'react-router-dom';
import { getProductDetailById } from '../utils/api/getProductsDetail';
import {
  ProductAttributes,
  ProductCardProps,
  ProductImages,
} from '../utils/Interfaces';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { mapProducts } from '../utils/productMapper';
import { MdArrowBackIos } from 'react-icons/md';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import React from 'react';
import './ProductDetail.css';
import { useCart } from '../utils/CartContext';

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [attributes, setAttributes] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const [isInCart, setIsInCart] = useState(false);
  const { setCart } = useCart();

  useEffect(() => {
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

          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          setIsInCart(cart.some((item: { id: string }) => item.id === id));
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };
    getProductData();
  }, [id]);

  const addToCart = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [
        ...cart,
        { id: product.id, name: product.name, price: product.price },
      ];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setIsInCart(true);
      setCart(updatedCart);
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

  return (
    <>
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
                  <img src={product.imageUrl} alt="" width={400} height={400} />
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
                <button
                  onClick={addToCart}
                  className="add-to-cart-button"
                  disabled={isInCart}
                >
                  {isInCart ? 'In Cart' : 'Add to Cart'} 🛒
                </button>
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
      </Container>
    </>
  );
};

export default ProductDetail;
