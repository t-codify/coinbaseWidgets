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
  const [processSnapshot, setProcessSnapshot] = useState(true); // Reset snapshot processing

  const canvasRef = useRef(null);
  const { data, isConnected } = useWebSocket(selectedCurr, selectedSubs);

  // Handle incoming WebSocket data
  useEffect(() => {
    if (!data) return;

    try {
      const jsonResponse = JSON.parse(data);
      switch (jsonResponse?.type) {
        case "ticker": {
          setTickerData(jsonResponse);
          break;
        }
        case "snapshot": {
          const newSnap = {};
          newSnap[selectedCurr] = jsonResponse;
          setSnapshotData((prevState) => ({
            ...prevState,
            [selectedCurr]: jsonResponse,
          }));
          //console.log("Snapshot changed", selectedCurr, Object.keys(snapshot));
          break;
        }
        case "l2update": {
          if (snapshot?.[selectedCurr]) {
            setl2UpdateData(jsonResponse);
          } else {
            console.warn("L2 update received before snapshot");
          }
          break;
        }
        default:
          //console.warn("Unhandled message type:", jsonResponse?.type);
          break;
      }
    } catch (error) {
      console.error("Failed to decode JSON response:", data, error);
    }
  }, [data, setTickerData, setSnapshotData, setl2UpdateData]);

  // Handle WebSocket connection status
  useEffect(() => {
    if (!isConnected) {
      setTickerData({});
      //setSnapshotData({});
      setl2UpdateData({});
      setProcessSnapshot(true); // Reset snapshot processing
    }
  }, [isConnected]);

  // Handle currency change
  useEffect(() => {
    // Reset WebSocket connection when currency changes
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
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white rounded-lg px-2 mx-2"
          onClick={() => handleSubscriptionChange("unsubscribe")}
        >
          Unsubscribe
        </button>
        {ticker && <TopOfBookComponent {...{ ticker }} />}
      </div>
      <div className="flex flex-row dark:bg-slate-800 bg-white dark:text-white text-gray-400">
        <div className="flex flex-col w-9/12" ref={canvasRef}>
          {canvasRef.current && ticker && (
            <RealTimePriceChart
              width={canvasRef.current.clientWidth}
              height={canvasRef.current.offsetHeight}
            />
          )}
        </div>
        <div className="w-3/12">
          {snapshot?.[selectedCurr] && (
            <OrderBook processSnapshot={processSnapshot} />
          )}
        </div>
      </div>
    </>
  );
};

export default WebSocketComponent;
