import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { selectOptions } from "../utils/constants";
import TopOfBookComponent from "./TopOfBookComponent";
import OrderBook from "./OrderBook";
import RealTimePriceChart from "./RealTimePriceChart";
import ProductContext from "../utils/ProductContext";
import useWebSocket from "../utils/customHooks/useWebSocket";
import WidgetBoxComponent from "./WidgetBoxComponent";

const WebSocketComponent = () => {
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
    setProcessSnapshot(true);
    if (selectedCurr) {
      setSelectedSubs("subscribe");
    }
  }, [selectedCurr]);

  // Handle subscription/unsubscription
  const handleSubscriptionChange = useCallback((action) => {
    setSelectedSubs(action);
  }, []);

  if (!ticker && !snapshot && !l2update) return null; // Avoid rendering if data is missing

  return (
    <>
      <div className="flex flex-row mt-5 justify-normal align-middle content-evenly">
        <label className="mx-2 w-3/12 font-bold dark:text-white text-gray-400">
          <select
            className="px-3 py-2 w-40 bg-white dark:bg-inherit shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm focus:ring-1"
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
            className="rounded-md px-3 py-2 w-40 bg-sky-500 hover:bg-sky-700"
            onChange={(e) => {
              const selected = e.target.value;
              selected === "Chart"
                ? setIsChartVisible(true)
                : setIsOrderBookVisible(true);
              //setIsChartVisible(selected === "Chart");
              //setIsOrderBookVisible(selected === "Order Book");
            }}
          >
            {["Chart", "Order Book"].map((opts) => (
              <option key={opts} value={opts}>
                {opts}
              </option>
            ))}
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
              <RealTimePriceChart />
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
              <OrderBook
                processSnapshot={processSnapshot}
                curr={selectedCurr}
              />
            )}
          </WidgetBoxComponent>
        </div>
      </div>
    </>
  );
};

export default WebSocketComponent;
