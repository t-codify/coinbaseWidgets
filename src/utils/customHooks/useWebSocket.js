import { GET_PRODUCTS_URL } from "../constants";
const URI = "wss://ws-feed.exchange.coinbase.com";

// const useWebSocket = async () => {
//   const ws = new WebSocket(URI);

//   //const connectWebSocket = async () => {
//   ws.onopen = ({ selectedCurr, selectedSubs }) => {
//     const subscriptionType = selectedSubs;
//     const subscribeMessage = JSON.stringify({
//       type: subscriptionType,
//       product_ids: [selectedCurr ?? selectedCurr],
//       channels: ["ticker", "level2_batch"],
//     });
//     ws.send(subscribeMessage);
//     console.log(
//       `${subscriptionType} to ticker and l2Batch channel for product ${selectedCurr}`
//     );
//   };

//   ws.onmessage = (event) => {
//     if (selectedSubs === "unsubscribe") {
//       ws.close();
//     }
//     try {
//       const jsonResponse = JSON.parse(event.data);
//       switch (jsonResponse.type) {
//         case "ticker": {
//           setTickerData(jsonResponse);
//           break;
//         }
//         case "l2update": {
//           setl2UpdateData(jsonResponse);
//           break;
//         }
//         case "snapshot": {
//           setSnapshotData(jsonResponse);
//           break;
//         }
//         default:
//           break;
//       }
//     } catch (error) {
//       console.error("Failed to decode JSON response:", event.data);
//     }
//   };

//   ws.onclose = () => {
//     console.warn("Connection closed, retrying...");
//     setTimeout(connectWebSocket, 1000);
//   };

//   ws.onerror = (error) => {
//     console.error("Unexpected error:", error);
//     setTimeout(connectWebSocket, 1000);
//   };
//   //connectWebSocket();

//   return ws;
// };

import { useState, useEffect, useRef } from "react";

const useWebSocket = (selectedCurr, selectedSubs) => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    wsRef.current = new WebSocket(URI);

    const ws = wsRef.current;

    // Handle WebSocket events directly
    ws.onopen = () => {
      const subscriptionType = selectedSubs;
      const subscribeMessage = JSON.stringify({
        type: subscriptionType,
        product_ids: [selectedCurr ?? selectedCurr],
        channels: ["ticker", "level2_batch"],
      });
      ws.send(subscribeMessage);
      console.log(
        `${subscriptionType} to ticker and l2Batch channel for product ${selectedCurr}`
      );
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.onmessage = (event) => {
      if (selectedSubs === "unsubscribe") {
        setIsConnected(false);
        ws.close();
      }
      setData(event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [selectedCurr, selectedSubs]);

  return { data, isConnected };
};

export default useWebSocket;
