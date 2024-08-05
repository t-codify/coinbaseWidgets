// src/WebSocketComponent.js
import React, { useState, useEffect, useContext } from "react";
import { selectOptions } from "../utils/constants";
import useGetProducts from "../utils/customHooks/useGetProducts";
import TopOfBookComponent from "./TopOfBookComponent";
import OrderBook from "./OrderBook";
import RealTimePriceChart from "./RealTimePriceChart";
import ProductContext from "../utils/ProductContext";
const URI = "wss://ws-feed.exchange.coinbase.com";
const CHANNEL = "level2";
const PRODUCT_ID = "ETH-USD";
/**
 * 
 * {
  "type": "ticker",
  "sequence": 64723489703,
  "product_id": "ETH-USD",
  "price": "2989.97",
  "open_24h": "3150.85",
  "volume_24h": "125009.93698097",
  "low_24h": "2909.35",
  "high_24h": "3180.09",
  "volume_30d": "2516276.95279955",
  "best_bid": "2989.82",
  "best_bid_size": "1.08000006",
  "best_ask": "2989.97",
  "best_ask_size": "0.47637109",
  "side": "buy",
  "time": "2024-08-03T11:19:04.968123Z",
  "trade_id": 543009615,
  "last_size": "0.00052825"
} 
 * 
 */

const WebSocketComponent = () => {
  const { ticker, setTickerData, l2update, setl2UpdateData } =
    useContext(ProductContext);
  const [selectedCurr, setSelectedCurr] = useState("BTC-USD");
  const [selectedSubs, setSelectedSubs] = useState("subscribe");
  //const product_ids = useGetProducts();
  //product_ids = ["BTC-USD","ETH-USD", "LTC-USD", "BCH-USD"]

  useEffect(() => {
    const ws = new WebSocket(URI);
    const subscriptionType = selectedSubs;
    const connectWebSocket = async () => {
      ws.onopen = () => {
        const subscribeMessage = JSON.stringify({
          type: subscriptionType,
          product_ids: [selectedCurr ?? selectedCurr],
          channels: ["ticker"], //level2_batch
        });
        ws.send(subscribeMessage);
        console.log(
          `${subscriptionType} to ticker and l2Batch channel for product ${selectedCurr}`
        );
      };

      ws.onmessage = (event) => {
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
      ws.close();
    };
  }, [selectedCurr, selectedSubs]);

  if (!ticker) return;
  return (
    <div>
      <h2>WebSocket Data</h2>
      <div className="flex flex-row mt-2">
        <label>
          <select
            className=" px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block  rounded-md sm:text-sm focus:ring-1"
            value={selectedCurr} // ...force the select's value to match the state variable...
            onChange={(e, preVal) => {
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
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white rounded-lg px-2 mx-2"
          onClick={(e) => setSelectedSubs("unsubscribe")}
        >
          unsubscribe
        </button>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-9/12">
          <TopOfBookComponent />
          <RealTimePriceChart />
        </div>
        <div>{/* <OrderBook /> */}</div>
      </div>
    </div>
  );
};

export default WebSocketComponent;
