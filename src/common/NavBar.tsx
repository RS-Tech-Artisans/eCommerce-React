import { Link, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import { useSession } from '../utils/SessionContext';
import { CgProfile } from 'react-icons/cg';
import LogoutButton from './LogoutButton';
import { SlBasket } from 'react-icons/sl';
import { useCart } from '../utils/CartContext';
import { useEffect, useState } from 'react';

function NavBar() {
  const { token } = useSession();
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    if (cart) {
      setCartCount(cart.length);
    }
  }, [cart]);

  useEffect(() => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.menu-block');

    const handleBurgerClick = () => {
      if (burger) burger.classList.toggle('active');
      if (nav) nav.classList.toggle('open');
    };

    if (burger) {
      burger.addEventListener('click', handleBurgerClick);
    }

    return () => {
      if (burger) {
        burger.removeEventListener('click', handleBurgerClick);
      }
    };
  }, []);

  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-dark justify-content-end"
        style={{ zIndex: 1000 }}
      >
        <div className="menu-block">
          <Link className="about-us" to="/about">
            About Us
          </Link>
          <Link to="/"> Main </Link>
          <Link to="/catalog"> Catalog </Link>
          {!token && (
            <>
              <Link to="/login"> Login </Link>
              <Link to="/register"> Registration </Link>
            </>
          )}
          {token && (
            <Link to="/profile">
              <CgProfile />
            </Link>
          )}
          <Link to="/basket" className="basket-link">
            <SlBasket />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          {token && <LogoutButton />}
        </div>
        <div className="burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
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
