import { Category } from '@commercetools/platform-sdk';

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
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: Price; // Используем тип Price
  discountedPrice: number;
}

export interface ProductCardProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: Price;
  discounted?: Price;
  images?: ProductImages[];
  attributes?: ProductAttributes[];
}

export interface ProductImages {
  dimensions: {
    w: number;
    h: number;
  };
  url: string;
}

export interface ProductAttributes {
  name: string;
  value: string;
}

export interface ProductGridProps {
  products: ProductInfo[];
  setProducts: React.Dispatch<React.SetStateAction<ProductInfo[]>>;
  catID: string | undefined;
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
  displayFilter: string | null;
  setDisplayFilter: (value: string | null) => void;
  displays: string[];
  sizeFilter: string | null;
  setSizeFilter: (value: string | null) => void;
  sizes: string[];
  priceFilter: { minPrice: string; maxPrice: string };
  setPriceFilter: (value: { minPrice: string; maxPrice: string }) => void;
  setSortFilter: (value: string | null) => void;
  handleResetFilters: () => void;
  categories: Category[];
  setCategoryFilter: (value: string | undefined) => void;
}

export interface ClearCartButtonProps {
  onClearCart: () => void;
}

export interface AuthorCardProps {
  name: string;
  gitName: string;
  linkToGit: string;
  role: string;
  img: string;
  about: string;
  contribution: string;
}

export interface AboutData {
  name: string;
  gitName: string;
  linkToGit: string;
  role: string;
  img: string;
  about: string;
  contribution: string;
}

export interface ToastMessageProps {
  type: 'success' | 'error' | null;
  text: string | null;
}

export interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailErr: string;
  setEmailErr: React.Dispatch<React.SetStateAction<string>>;
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  passwordErr: string;
}

export interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordErr: string;
  setPasswordErr: React.Dispatch<React.SetStateAction<string>>;
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  emailErr: string;
}

export interface CouponCategoryProps {
  imageSrc: string;
  promoCode: string;
  description: string;
}
