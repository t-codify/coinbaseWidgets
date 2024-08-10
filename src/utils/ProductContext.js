import { createContext } from "react";

const ProductContext = createContext({
  ticker: {},
  snapshot: {},
  l2update: {},
  isExpanded: { chart: false, order: false },
});

export default ProductContext;
