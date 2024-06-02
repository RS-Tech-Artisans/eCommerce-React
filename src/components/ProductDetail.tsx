import { Link, useParams } from 'react-router-dom';
import { getProductDetailById } from '../utils/api/getProductsDetail';
import { ProductCardProps, ProductImages } from '../utils/Interfaces';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { mapProducts } from '../utils/productMapper';
import { MdArrowBackIos } from 'react-icons/md';
import { getBrandsFromAPI } from '../utils/api/getBrands';
import { getSizesFromAPI } from '../utils/api/getSizes';
import './ProductCard.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import React from 'react';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const fetchedBrands = await getBrandsFromAPI();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();

    const fetchSizes = async () => {
      try {
        const fetchedSizes = await getSizesFromAPI();
        setSizes(fetchedSizes);
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    };

    fetchSizes();
  }, []);

  useEffect(() => {
    const getProductData = async () => {
      if (id) {
        try {
          const fetchProducts = await getProductDetailById(id);
          const productDetail = mapProducts([fetchProducts]);
          const images1 = fetchProducts?.masterVariant?.images?.map(
            (image: ProductImages) => image.url
          );
          console.log('Fetched data detail product:', fetchProducts);

          setProduct(productDetail[0]);
          setImages(images1 || []);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };
    getProductData();
  }, [id]);

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
                <p>
                  <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
                    Brand:
                  </span>
                  {brands}
                </p>
                <p>
                  <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
                    Size:
                  </span>
                  {sizes}
                </p>
                <p>
                  <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
                    Display:
                  </span>
                </p>
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
