// src/WebSocketComponent.js
import React, { useState, useEffect, useContext } from "react";
import { selectOptions } from "../utils/constants";
import TopOfBookComponent from "./TopOfBookComponent";
import OrderBook from "./OrderBook";
import RealTimePriceChart from "./RealTimePriceChart";
import ProductContext from "../utils/ProductContext";
import { useRef } from "react";
const URI = "wss://ws-feed.exchange.coinbase.com";
const WebSocketComponent = () => {
  const [ticker, setTickerData] = useState({});
  const [l2update, setl2UpdateData] = useState({});
  const [snapshot, setSnapshotData] = useState({});
  const [selectedCurr, setSelectedCurr] = useState("BTC-USD");
  const [selectedSubs, setSelectedSubs] = useState("subscribe");
  const canvasRef = useRef();
  useEffect(() => {
    const ws = new WebSocket(URI);
    const subscriptionType = selectedSubs;
    const connectWebSocket = async () => {
      ws.onopen = () => {
        const subscribeMessage = JSON.stringify({
          type: subscriptionType,
          product_ids: [selectedCurr ?? selectedCurr],
          channels: ["ticker", "level2_batch"],
        });
        ws.send(subscribeMessage);
        console.log(
          `${subscriptionType} to ticker and l2Batch channel for product ${selectedCurr}`
        );
      };

      ws.onmessage = (event) => {
        if (selectedSubs === "unsubscribe") {
          ws.close();
        }
        try {
          const jsonResponse = JSON.parse(event.data);
          switch (jsonResponse.type) {
            case "ticker": {
              setTickerData(jsonResponse);
              break;
            }
            case "l2update": {
              setl2UpdateData(jsonResponse);
              break;
            }
            case "snapshot": {
              setSnapshotData(jsonResponse);
              break;
            }
            default:
              break;
          }
        } catch (error) {
          console.error("Failed to decode JSON response:", event.data);
        }
      };

      ws.onclose = () => {
        console.warn("Connection closed, retrying...");
        setTimeout(connectWebSocket, 1000);
      };

      ws.onerror = (error) => {
        console.error("Unexpected error:", error);
        setTimeout(connectWebSocket, 1000);
      };
    };

    connectWebSocket();

    return () => {
      // Clean up the WebSocket connection on component unmount
      //setSelectedSubs("unsubscribe");
      ws.close();
    };
  }, [selectedCurr, selectedSubs]);

  if (!ticker || !snapshot || !l2update) return;
  return (
    <>
      <div className="flex flex-row mt-5 justify-normal align-middle content-evenly">
        <label className="mx-2 w-3/12 font-bold dark:text-white text-gray-400 ">
          <select
            className=" px-3 py-2 w-40 bg-white dark:bg-inherit shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block  rounded-md sm:text-sm focus:ring-1"
            value={selectedCurr} // ...force the select's value to match the state variable...
            onChange={(e) => {
              setSelectedCurr(e.target.value);
              setSelectedSubs("subscribe");
            }} // ... and update the state variable on any change!
          >
            {selectOptions.map((opts) => {
              return (
                <option key={opts} value={opts}>
                  {opts}
                </option>
              );
            })}
          </select>
        </label>
        {/* <button
          className="bg-sky-500 hover:bg-sky-700 text-white rounded-lg px-2 mx-2"
          onClick={(e) => setSelectedSubs("unsubscribe")}
        >
          unsubscribe
        </button> */}
        <TopOfBookComponent {...{ ticker }} />
      </div>
      <div className="flex flex-row  dark:bg-slate-800 bg-white  dark:text-white text-gray-400">
        <div className="flex flex-col w-9/12" ref={canvasRef}>
          {canvasRef.current ? (
            <RealTimePriceChart
              ticker={ticker}
              width={canvasRef.current.clientWidth}
              height={canvasRef.current.offsetHeight}
            />
          ) : null}
        </div>
        <div className="w-3/12">
          <OrderBook {...{ snapshot: snapshot, l2update: l2update }} />
        </div>
      </div>
    </>
  );
};

export default WebSocketComponent;
