export const getExpenseGroupedDataFromArrayOfObjects = data => {
  const modifiedData = data.reduce((acc, curr) => {
    const { category, price } = curr;
    acc[category] = (acc[category] || 0) + price;
    return acc;
  }, {});

  const modifiedArray = Object.entries(modifiedData).map(
    ([category, price]) => ({
      name: category,
      value: price,
    })
  );
  return modifiedArray;
};
