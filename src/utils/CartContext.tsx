import { Cart } from '@commercetools/platform-sdk';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type CartContextType = {
  cartId: string | null;
  itemIds: number;
  setCartData: (cartData: Cart | null) => void;
};

export const CartContext = createContext<CartContextType>({
  cartId: null,
  itemIds: 0,
  setCartData: () => {},
});

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [itemIds, setItemIds] = useState<number>(0);

  const setCartData = (cartData: Cart | null) => {
    if (cartData) {
      const { id, lineItems } = cartData;
      setCartId(id);
      const ids = lineItems.map((item) => item.id);
      setItemIds(ids.length);
    } else {
      setCartId(null);
      setItemIds(0);
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cartitems');
    if (savedCart) {
      const parsedCart: Cart = JSON.parse(savedCart);
      setCartData(parsedCart);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartId, itemIds, setCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
