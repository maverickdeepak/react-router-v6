export const listProducts = async () => {
  const response = await fetch(`/api/products`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Something went wrong!");
};

export const retrievProduct = async (id) => {
  const response = await fetch(`http://localhost:5000/products/${id}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Something went wrong!");
};
