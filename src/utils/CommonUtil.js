export const range = (start, end) => {
  let length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

export const formatAmount=(amount)=> {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(2) + 'M';
  } else {
    return amount.toString();
  }
}