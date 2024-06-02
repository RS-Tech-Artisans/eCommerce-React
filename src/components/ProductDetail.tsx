import { Link, useParams } from 'react-router-dom';
import { getProductDetailById } from '../utils/api/getProductsDetail';
import { ProductCardProps } from '../utils/Interfaces';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { mapProducts } from '../utils/productMapper';
import { MdArrowBackIos } from 'react-icons/md';
import { getBrandsFromAPI } from '../utils/api/getBrands';
import { getSizesFromAPI } from '../utils/api/getSizes';
import './ProductCard.css';

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [color] = useState<string[]>([]);
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
          console.log('Fetched data detail product:', fetchProducts);
          const productDetail = mapProducts([fetchProducts]);
          setProduct(productDetail[0]);
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
      {/* <div>Product Page for ID: {id} </div> */}
      <Container
        className="bg-light text-dark bg-gradient"
        style={{ marginTop: '40px' }}
      >
        <Link to={`/catalog`} style={{ fontSize: '20px' }}>
          <MdArrowBackIos /> To Catalog
        </Link>
        {product ? (
          <Container className="d-flex p-2 flex-row">
            <div style={{ marginRight: '20px' }}>
              <img src={product.imageUrl} alt="" />
            </div>
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <span style={{ fontWeight: 'bold' }}>Brand:</span> {brands}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>Size:</span> {sizes}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>Color:</span> {color}
              </p>
            </div>
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
          </Container>
        ) : (
          <p>Loading product details...</p>
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
