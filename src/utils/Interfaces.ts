export interface ProductGridProps {
  products: ProductInfo[];
}

export interface Price {
  value: {
    centAmount: number;
    currencyCode: string;
  };
  discounted?: {
    value: {
      centAmount: number;
      currencyCode: string;
    };
  };
}

export interface ProductInfo {
  discountedPrice: number;
  name: string;
  imageUrl: string;
  description: string;
  price: Price;
}

export interface ProductCardProps {
  name: string;
  imageUrl: string;
  description: string;
  price: Price;
}
