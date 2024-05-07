import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./common/Navbar";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import './styles.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="Registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
