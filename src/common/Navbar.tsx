import { Link, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';

function NavBar() {
  return (
    <div>
      <Navbar className="navbar">
        <Link to="/"> Main </Link>
        <Link to="/login"> Login </Link>
        <Link to="/Registration"> Registration </Link>
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
