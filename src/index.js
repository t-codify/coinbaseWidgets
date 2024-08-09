import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import WebSocketComponent from "./components/WebsocketComponent";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProductContext from "./utils/ProductContext";
const AppLayout = () => {
  const [tickerData, setTickerData] = useState();
  const [l2UpdateData, setl2UpdateData] = useState();
  const [snapshotData, setSnapshotData] = useState();
  return (
    <div>
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
        <WebSocketComponent />
        {/* <OrderBook /> */}
      </ProductContext.Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
  {
    path: "/coinbaseWidgets/",
    element: <AppLayout />,
  },
]);
const rootEle = ReactDOM.createRoot(document.getElementById("root"));
rootEle.render(<RouterProvider router={appRouter} />);
