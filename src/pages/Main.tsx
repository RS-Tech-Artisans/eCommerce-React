import './Main.css';
import { Link } from 'react-router-dom';

export const Main = () => {
  return (
    <div className="container">
      <div className="main-content">
        <div className="rectangle-container">
          <div className="rectangle">
            <Link
              to="/category/a8ffbf68-e7fd-4860-96d5-40deb9032836/e1e60148-a824-49dc-a3ba-f69ba66c8609"
              className="rectangle-text"
            >
              LED & LCD
            </Link>
          </div>
          <div className="rectangle">
            <Link
              to="/category/a8ffbf68-e7fd-4860-96d5-40deb9032836/be9dbd44-1e90-4f09-a198-ee5478eaa088"
              className="rectangle-text"
            >
              OLED
            </Link>
          </div>
          <div className="rectangle">
            <Link
              to="/category/a8ffbf68-e7fd-4860-96d5-40deb9032836/0fd5260d-11a8-490b-b543-6da919547c61"
              className="rectangle-text"
            >
              QLED
            </Link>
          </div>
        </div>

        <h1 className="header-main">
          WELCOME TO TechArtisansTV – YOUR RELIABLE ELECTRONICS STORE!
        </h1>
        <div className="description-store">
          Over the years, we have earned the trust of thousands of customers by
          partnering with leading suppliers and manufacturers. Our mission is to
          offer you the best products at competitive prices and to provide
          quality service at every stage of your selection. Our consultants are
          always ready to help you make the right choice and ensure a pleasant
          shopping experience.
        </div>

        <div className="container-main_promo">
          <div className="coupon-category">
            <img
              className="image-coupon"
              src="https://rs.school/assets/RsBanner-DN9JLJVH.svg"
              alt="Promo Banner"
            />
            <div className="promo">
              <div className="header-main">
                Use this PromoCode: <span className="code">RSS-2024</span>
              </div>
              <div className="description-store">
                for getting -20% discount on all cart price
              </div>
            </div>
          </div>
          <div className="coupon-category">
            <img
              className="image-coupon"
              src="https://rs.school/assets/RsBanner-DN9JLJVH.svg"
              alt="Promo Banner"
            />
            <div className="promo">
              <div className="header-main">
                Use promoCode: <span className="code">QLED</span>
              </div>
              <div className="description-store">
                for getting -5% to all cart if total amount cart greating than
                5000 USD
              </div>
            </div>
          </div>
          <h6>*you can use only one promo for your cart</h6>
        </div>
      </div>
    </div>
  );
};
