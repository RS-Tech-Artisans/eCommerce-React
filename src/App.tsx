import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './common/NavBar';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Catalog from './pages/Catalog';
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';
import './styles.css';
import { SessionProvider } from './utils/SessionContext';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import { Main } from './pages/Main';
import About from './pages/About';
import Basket from './pages/Basket';
import { CartProvider } from './utils/CartContext';

const App: React.FC = () => {
  return (
    <SessionProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="about" element={<About />} />
              <Route index element={<Main />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Registration />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/catalog/product/:id" element={<ProductDetail />} />
              <Route path="/category/*" element={<CategoryPage />} />
              <Route path="basket" element={<Basket />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </SessionProvider>
  );
};

export default App;
