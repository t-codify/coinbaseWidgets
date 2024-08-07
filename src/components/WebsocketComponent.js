import React, { useState, useEffect, useContext, useRef } from "react";
import { selectOptions } from "../utils/constants";
import TopOfBookComponent from "./TopOfBookComponent";
import OrderBook from "./OrderBook";
import RealTimePriceChart from "./RealTimePriceChart";
import ProductContext from "../utils/ProductContext";
import useWebSocket from "../utils/customHooks/useWebSocket";

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
  const canvasRef = useRef();
  const { data, isConnected } = useWebSocket(selectedCurr, selectedSubs);

  useEffect(() => {
    if (!data) return;

    try {
      const jsonResponse = JSON.parse(data);

      switch (jsonResponse?.type) {
        case "ticker":
          setTickerData(jsonResponse);
          break;
        case "snapshot":
          console.log("snapshot changed");
          setSnapshotData(jsonResponse);
          break;
        case "l2update":
          setl2UpdateData(jsonResponse);
          break;
        default:
          console.warn("Unhandled message type:", jsonResponse?.type);
          break;
      }
    } catch (error) {
      console.error("Failed to decode JSON response:", data, error);
    }
  }, [data, setTickerData, setSnapshotData, setl2UpdateData]);

  useEffect(() => {
    if (!isConnected) {
      setTickerData({});
    }
  }, [isConnected, setTickerData]);

  if (!ticker || !snapshot || !l2update) return null; // Return null to avoid rendering if data is missing

  return (
    <>
      <div className="flex flex-row mt-5 justify-normal align-middle content-evenly">
        <label className="mx-2 w-3/12 font-bold dark:text-white text-gray-400 ">
          <select
            className="px-3 py-2 w-40 bg-white dark:bg-inherit shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm focus:ring-1"
            value={selectedCurr}
            onChange={(e) => {
              setSelectedCurr(e.target.value);
              setSelectedSubs("subscribe");
            }}
          >
            {selectOptions.map((opts) => (
              <option key={opts} value={opts}>
                {opts}
              </option>
            ))}
          </select>
        </label>
        {/* <button
          className="bg-sky-500 hover:bg-sky-700 text-white rounded-lg px-2 mx-2"
          onClick={() => setSelectedSubs("unsubscribe")}
        >
          Unsubscribe
        </button> */}
        <TopOfBookComponent {...{ ticker }} />
      </div>
      <div className="flex flex-row dark:bg-slate-800 bg-white dark:text-white text-gray-400">
        <div className="flex flex-col w-9/12" ref={canvasRef}>
          {canvasRef.current && (
            <RealTimePriceChart
              width={canvasRef.current.clientWidth}
              height={canvasRef.current.offsetHeight}
            />
          )}
        </div>
        <div className="w-3/12">
          <OrderBook />
        </div>
      </div>
    </>
  );
};

export default WebSocketComponent;
