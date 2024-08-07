import { createContext } from "react";

const ProductContext = createContext({
  ticker: {},
  snapshot: {},
  l2update: {},
});

export default ProductContext;
