import { Link, useParams } from 'react-router-dom';
import { getProductDetailById } from '../utils/api/getProductsDetail';
import { ProductCardProps } from '../utils/Interfaces';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { mapProducts } from '../utils/productMapper';
import { MdArrowBackIos } from 'react-icons/md';

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getProductData = async () => {
      if (id) {
        try {
          const fetchProducts = await getProductDetailById(id);
          console.log('Fetched dataaaaaaaaa:', fetchProducts);
          const productDetail = mapProducts([fetchProducts]);
          setProduct(productDetail[0]);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };
    getProductData();
  }, [id]);

  return (
    <>
      <div>Product Page for ID: {id} </div>
      <Container>
        <Link to={`/catalog`} style={{ fontSize: '20px' }}>
          <MdArrowBackIos /> To Catalog
        </Link>
        {product ? (
          <Container className="d-flex p-2 flex-row">
            <div style={{ marginRight: '20px' }}>
              <img src={product.imageUrl} alt="" width={400} height={400} />
            </div>
            <div>
              <h3>{product.name}</h3>
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
