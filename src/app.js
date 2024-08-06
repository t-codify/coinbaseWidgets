import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import WebSocketComponent from "./components/WebsocketComponent";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProductContext from "./utils/ProductContext";
import OrderBook from "./components/OrderBook";

const AppLayout = () => {
  const [tickerData, setTickerData] = useState();
  const [l2UpdateData, setl2UpdateData] = useState();
  const [snapshotData, setSnapshotData] = useState();
  return (
    <ProductContext.Provider
      value={{
        ticker: tickerData,
        setTickerData,
        l2update: l2UpdateData,
        setl2UpdateData,
        snapshot: snapshotData,
        setSnapshotData,
      }}
    >
      <div>
        <WebSocketComponent />
        {/* <OrderBook /> */}
      </div>
    </ProductContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
]);
const rootEle = ReactDOM.createRoot(document.getElementById("root"));
rootEle.render(<RouterProvider router={appRouter} />);
