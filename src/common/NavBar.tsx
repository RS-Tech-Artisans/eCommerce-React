import { Link, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import LogoutButton from '../components/LogoutButton';

function NavBar() {

  return (
    <div>
      <Navbar expand="lg" className="bg-dark justify-content-end">
        <Link to="/main"> Main </Link>
        <Link to="/login"> Login </Link>
        <Link to="/register"> Registration </Link>
        <LogoutButton />
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
