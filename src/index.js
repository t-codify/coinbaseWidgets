import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import DashboardComponent from "./components/DashboardComponent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductContext from "./utils/ProductContext";
const AppLayout = () => {
  const [tickerData, setTickerData] = useState();
  const [l2UpdateData, setl2UpdateData] = useState();
  const [snapshotData, setSnapshotData] = useState();
  const [isExpanded, setIsExpanded] = useState();
  return (
    <div className="p-0 m-0 min-h-screen">
      <ProductContext.Provider
        value={{
          ticker: tickerData,
          setTickerData,
          l2update: l2UpdateData,
          setl2UpdateData,
          snapshot: snapshotData,
          setSnapshotData,
          isExpanded: isExpanded,
          setIsExpanded,
        }}
      >
        <DashboardComponent />
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
