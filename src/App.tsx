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

const App: React.FC = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Catalog />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
};

export default App;
