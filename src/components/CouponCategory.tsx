import React from 'react';
import { CouponCategoryProps } from '../utils/Interfaces';

const CouponCategory: React.FC<CouponCategoryProps> = ({
  imageSrc,
  promoCode,
  description,
}) => {
  return (
    <div className="coupon-category">
      <img className="image-coupon" src={imageSrc} alt="Promo Banner" />
      <div className="promo">
        <div className="header-main">
          {promoCode.startsWith('RSS') ? (
            <>
              Use this PromoCode: <span className="code">{promoCode}</span>
            </>
          ) : (
            <>
              Use promoCode: <span className="code">{promoCode}</span>
            </>
          )}
        </div>
        <div className="description-store">{description}</div>
      </div>
    </div>
  );
};

export default CouponCategory;
