export const formatPrice = (price, sale) => {
    return (Number(price) - (Number(price) * Number(sale)) / 100).toLocaleString(
      "de-DE"
    );
  };
  
  export const price = (price) => {
    return Number(price).toLocaleString("de-DE");
  };
  