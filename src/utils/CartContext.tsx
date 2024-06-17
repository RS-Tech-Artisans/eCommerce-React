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
  itemIds: string[];
  setCartData: (cartData: Cart | null) => void;
};

export const CartContext = createContext<CartContextType>({
  cartId: null,
  itemIds: [],
  setCartData: () => {},
});

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [itemIds, setItemIds] = useState<string[]>([]);

  const setCartData = (cartData: Cart | null) => {
    if (cartData) {
      const { id, lineItems } = cartData;
      setCartId(id);
      const ids = lineItems.map((item) => item.id);
      setItemIds(ids);
    } else {
      setCartId(null);
      setItemIds([]);
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cartitems');
    if (savedCart) {
      const parsedCart: Cart = JSON.parse(savedCart);
      setCartData(parsedCart);
    }
  }, []);

  useEffect(() => {
    if (cartId) {
      const cartData = { id: cartId, lineItems: itemIds.map((id) => ({ id })) };
      localStorage.setItem('cartitems', JSON.stringify(cartData));
    }
  }, [cartId, itemIds]);

  return (
    <CartContext.Provider value={{ cartId, itemIds, setCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
