export const formatPrice = (priceInCents) => {
  const dollars = (priceInCents / 100).toFixed(2);
  return `$${dollars}`;
};
