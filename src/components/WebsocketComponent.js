// src/WebSocketComponent.js
import React, { useState, useEffect } from "react";

const URI = "wss://ws-feed.exchange.coinbase.com";
const CHANNEL = "level2";
const PRODUCT_ID = "ETH-USD";

const WebSocketComponent = () => {
  const [data, setData] = useState(null);
  //product_ids = ["BTC-USD","ETH-USD", "LTC-USD", "BCH-USD"]
  useEffect(() => {
    const ws = new WebSocket(URI);
    const connectWebSocket = async () => {
      ws.onopen = () => {
        const subscribeMessage = JSON.stringify({
          type: "subscribe",
          product_ids: ["ETH-USD"],
          channels: [
            "ticker",
            //"level2_batch",
            // {
            //   name: "ticker",
            //   product_ids: ["ETH-BTC"],
            // },
          ],
        });
        ws.send(subscribeMessage);
        console.log(
          `Subscribed to ${CHANNEL} channel for product ${PRODUCT_ID}`
        );
      };

      ws.onmessage = (event) => {
        try {
          const jsonResponse = JSON.parse(event.data);
          console.log(jsonResponse);
          setData(jsonResponse);
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
  }, []);

  return (
    <div>
      <h2>WebSocket Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default WebSocketComponent;
