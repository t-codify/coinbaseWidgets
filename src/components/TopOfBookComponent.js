import { useContext } from "react";
import PriceBoxComponent from "./PriceBoxComponent";
import ProductContext from "../utils/ProductContext";
const TopOfBookComponent = () => {
  const { ticker } = useContext(ProductContext);
  if (!ticker) return;
  return (
    // <div className="relative bg-white m-6 shadow-xl ring-1 ring-gray-900/5  sm:rounded-lg">
    <div className="w-full sm:rounded-lg">
      <div className="divide-y divide-gray-300/50">
        <div className="grid grid-flow-col justify-stretch w-full">
          <PriceBoxComponent
            ticker={{
              type: "Bid",
              best: ticker.best_bid,
              size: ticker.best_bid_size,
              price: ticker.price,
            }}
          />
          <PriceBoxComponent
            ticker={{
              type: "Ask",
              best: ticker.best_ask,
              size: ticker.best_ask_size,
              price: ticker.price,
            }}
          />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default TopOfBookComponent;
