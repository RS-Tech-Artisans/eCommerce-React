import { Link, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import LogoutButton from '../components/LogoutButton';
import { useSession } from '../utils/SessionContext';
import { CgProfile } from 'react-icons/cg';

function NavBar() {
  const { token: token } = useSession();
  return (
    <div>
      <Navbar expand="lg" className="bg-dark justify-content-end">
        <Link to="/catalog"> Catalog </Link>
        <Link to="/login"> Login </Link>
        <Link to="/register"> Registration </Link>
        {token && (
          <Link to="/profile">
            <CgProfile />
          </Link>
        )}
        {token && <LogoutButton />}
      </Navbar>
    </div>
  );
}

export default function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
