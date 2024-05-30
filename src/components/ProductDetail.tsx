import { useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <div>Product Page for ID: {id}</div>;
};

export default ProductDetail;
