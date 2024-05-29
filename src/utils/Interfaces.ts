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

export interface SidebarFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  brandFilter: string | null;
  setBrandFilter: (value: string | null) => void;
  brands: string[];
  colorFilter: string | null;
  setColorFilter: (value: string | null) => void;
  colors: string[];
  sizeFilter: string | null;
  setSizeFilter: (value: string | null) => void;
  sizes: string[];
  priceFilter: { minPrice: string; maxPrice: string };
  setPriceFilter: (value: { minPrice: string; maxPrice: string }) => void;
  handleResetFilters: () => void;
}