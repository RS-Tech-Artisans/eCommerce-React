import React from 'react';
import { Link } from 'react-router-dom';

const CategoryLinks: React.FC = () => {
  return (
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
  );
};

export default CategoryLinks;
