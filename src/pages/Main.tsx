import React from 'react';
import './Main.css';
import CategoryLinks from '../components/CategoryLinks';
import CouponCategory from '../components/CouponCategory';

export const Main: React.FC = () => {
  return (
    <div className="container">
      <div className="main-content">
        <CategoryLinks />

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
          <CouponCategory
            imageSrc="https://rs.school/assets/RsBanner-DN9JLJVH.svg"
            promoCode="RSS-2024"
            description="for getting -20% discount on all cart price"
          />
          <CouponCategory
            imageSrc="https://rs.school/assets/RsBanner-DN9JLJVH.svg"
            promoCode="QLED"
            description="for getting -5% to all cart if total amount cart greater than 5000 USD"
          />
          <h6>*you can use only one promo for your cart</h6>
        </div>
      </div>
    </div>
  );
};
