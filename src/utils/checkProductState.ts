export const checkProductState = (id: string) => {
  const cartData = JSON.parse(localStorage.getItem('cartitems') || '{}');
  const lineItems = cartData.lineItems || [];
  return lineItems.some((item: { productId: string }) => item.productId === id);
};
