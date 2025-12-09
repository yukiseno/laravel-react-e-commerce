export const formatPrice = (cents, currency = "USD") => {
  if (typeof cents !== "number") return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
};
