import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type CartItem = {
  id: string;
  name: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[] | null;
  setCart: (cart: CartItem[]) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
});

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartitems');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
