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

export interface Description {
  en: string;
}

export interface ProductInfo {
  name: string;
  imageUrl: string;
  description: string;
  price: Price; // Используем тип Price
  discountedPrice: number;
}

export interface ProductCardProps {
  name: string;
  imageUrl: string;
  description: string;
  price: Price;
}

export interface ProductGridProps {
  products: ProductInfo[];
  setProducts: React.Dispatch<React.SetStateAction<ProductInfo[]>>;
}

export interface MyApiError {
  message: string;
}
