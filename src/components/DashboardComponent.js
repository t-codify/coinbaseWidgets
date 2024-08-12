import React, { useState, useEffect, useContext, useRef } from "react";
import { selectOptions } from "../utils/constants";
import TopOfBookComponent from "./TopOfBookComponent";
import OrderBookComponent from "./OrderBookComponent";
import PriceChartComponent from "./PriceChartComponent";
import ProductContext from "../utils/ProductContext";
import useWebSocket from "../utils/customHooks/useWebSocket";
import WidgetBoxComponent from "./WidgetBoxComponent";
const DashboardComponent = () => {
  const {
    ticker,
    setTickerData,
    l2update,
    setl2UpdateData,
    snapshot,
    setSnapshotData,
  } = useContext(ProductContext);

  const [selectedCurr, setSelectedCurr] = useState("BTC-USD");
  const [selectedSubs, setSelectedSubs] = useState("subscribe");
  const [processSnapshot, setProcessSnapshot] = useState(true);

  const [isChartVisible, setIsChartVisible] = useState(true);
  const [isOrderBookVisible, setIsOrderBookVisible] = useState(true);
  const canvasRef = useRef(null);

  const { data, isConnected } = useWebSocket(selectedCurr, selectedSubs);

  // Handle incoming WebSocket data
  useEffect(() => {
    if (!data) return;

    try {
      const jsonResponse = JSON.parse(data);
      switch (jsonResponse?.type) {
        case "ticker":
          setTickerData(jsonResponse);
          break;
        case "snapshot":
          setSnapshotData((prevState) => ({
            ...prevState,
            [selectedCurr]: jsonResponse,
          }));
          break;
        case "l2update":
          if (snapshot?.[selectedCurr]) {
            setl2UpdateData(jsonResponse);
          } else {
            console.warn("L2 update received before snapshot");
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Failed to decode JSON response:", data, error);
    }
  }, [data]);

  // Handle currency change
  useEffect(() => {
    setTickerData({});
    setSnapshotData((prevState) => ({
      ...prevState,
      [selectedCurr]: {},
    }));
    setl2UpdateData({});
    //setProcessSnapshot(true);
    if (selectedCurr) {
      setSelectedSubs("subscribe");
    }
  }, [selectedCurr]);

  if (!ticker && !snapshot && !l2update) return null; // Avoid rendering if data is missing

  return (
    <>
      <div className="flex flex-row justify-normal align-middle content-evenly">
        <label className="mx-2 w-3/12 font-bold dark:text-white text-gray-400">
          <select
            className="px-3 py-2 w-40 bg-white dark:bg-inherit shadow-lg border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm focus:ring-1"
            value={selectedCurr}
            onChange={(e) => {
              setSelectedCurr(e.target.value);
            }}
          >
            {selectOptions.map((opts) => (
              <option key={opts} value={opts}>
                {opts}
              </option>
            ))}
          </select>
        </label>
        {ticker && <TopOfBookComponent {...{ ticker }} />}
        <label className="mx-2 w-3/12 text-sm dark:text-white text-gray-400">
          <select
            className="px-3 py-2 w-40 bg-white dark:bg-inherit shadow-lg border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm focus:ring-1"
            defaultValue={"add"}
            onChange={(e) => {
              const selected = e.target.value;
              selected === "Chart"
                ? setIsChartVisible(true)
                : setIsOrderBookVisible(true);
            }}
          >
            <option value="add">Add Widget..</option>
            {!isChartVisible && (
              <option key="Chart" value="Chart">
                Chart
              </option>
            )}
            {!isOrderBookVisible && (
              <option key="Order" value="Order">
                Order-Book
              </option>
            )}
          </select>
        </label>
      </div>

      <div
        ref={canvasRef}
        className="w-full h-[calc(100vh-100px)] md:flex items-start justify-center gap-2 dark:bg-slate-800 bg-white dark:text-white text-gray-400"
      >
        <div
          className={`relative ${isChartVisible ? "block" : "hidden"} ${
            isChartVisible ? "md:w-9/12 xs:w-full" : "w-full"
          } h-full`}
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
          {canvasRef.current && (
            <WidgetBoxComponent
              heading="Chart"
              id="chart"
              layoutHeight="100%"
              isVisible={isChartVisible}
              setIsVisible={setIsChartVisible}
            >
              <PriceChartComponent />
            </WidgetBoxComponent>
          )}
        </div>
        <div
          className={`relative ${isOrderBookVisible ? "block" : "hidden"} ${
            isOrderBookVisible ? "md:!w-3/12 w-full md:m-0 my-2" : "w-full"
          }`}
        >
          <WidgetBoxComponent
            heading="Order Book"
            id="order"
            layoutHeight="100%"
            isVisible={isOrderBookVisible}
            setIsVisible={setIsOrderBookVisible}
          >
            {snapshot?.[selectedCurr] && (
              <OrderBookComponent curr={selectedCurr} />
            )}
          </WidgetBoxComponent>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
