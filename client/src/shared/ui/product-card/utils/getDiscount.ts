export const getDiscount = (discountPrice: number, price: number): number => {
  const discount = Math.round((price * 100) / discountPrice) - 100;
  return discount;
};
