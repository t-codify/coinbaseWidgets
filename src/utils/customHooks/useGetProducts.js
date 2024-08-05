import { GET_PRODUCTS_URL } from "../constants";

const useGetProducts = async () => {
  const getProducts = await fetch(GET_PRODUCTS_URL);
  products = await getProducts.json();
  console.log(products);
  return products;
};

export default useGetProducts;
