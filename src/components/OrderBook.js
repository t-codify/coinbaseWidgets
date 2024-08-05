import React, { useState, useEffect, useRef } from "react";

const OrderBook = () => {
  const [bids, setBids] = useState(new Map());
  const [asks, setAsks] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const ws = useRef(null);

  useEffect(() => {
    // Create WebSocket connection
    ws.current = new WebSocket("wss://ws-feed.exchange.coinbase.com");

    // Handle incoming messages
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "snapshot") {
        // Initialize the order book with snapshot data
        const newBids = new Map();
        const newAsks = new Map();

        data.bids.forEach(([price, size]) => {
          if (parseFloat(size) > 0) {
            newBids.set(price, size);
          }
        });
        data.asks.forEach(([price, size]) => {
          if (parseFloat(size) > 0) {
            newAsks.set(price, size);
          }
        });

        setBids(newBids);
        setAsks(newAsks);
        setLoading(false);
      } else if (data.type === "l2update") {
        // Update the order book with incremental updates
        const newBids = new Map(bids);
        const newAsks = new Map(asks);

        data.changes.forEach(([side, price, size]) => {
          if (side === "buy") {
            if (parseFloat(size) === 0) {
              newBids.delete(price);
            } else {
              newBids.set(price, size);
            }
          } else if (side === "sell") {
            if (parseFloat(size) === 0) {
              newAsks.delete(price);
            } else {
              newAsks.set(price, size);
            }
          }
        });

        setBids(newBids);
        setAsks(newAsks);
      }
    };

    // Send subscription request
    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          type: "subscribe",
          channels: [{ name: "level2_batch", product_ids: ["BTC-USD"] }],
        })
      );
    };

    // Clean up on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [bids, asks]);

  // Get the latest 10 entries for bids and asks
  const getLatestEntries = (entries) => {
    return Array.from(entries.entries())
      .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])) // Sort in descending order for bids
      .slice(0, 10); // Limit to latest 10 entries
  };

  const bidArray = getLatestEntries(bids);
  const askArray = getLatestEntries(asks);

  // Calculate average price based on last ask and first bid
  const calculateAveragePrice = (bidArray, askArray) => {
    const lastAskPrice =
      askArray.length > 0 ? parseFloat(askArray[askArray.length - 1][0]) : 0;
    const firstBidPrice = bidArray.length > 0 ? parseFloat(bidArray[0][0]) : 0;

    return (lastAskPrice + firstBidPrice) / 2 || 0;
  };

  // Calculate spread between last ask and first bid
  const calculateSpread = (bidArray, askArray) => {
    const lastAskPrice =
      askArray.length > 0 ? parseFloat(askArray[askArray.length - 1][0]) : 0;
    const firstBidPrice = bidArray.length > 0 ? parseFloat(bidArray[0][0]) : 0;

    return lastAskPrice - firstBidPrice;
  };

  return (
    <div>
      <h1>Order Book</h1>
      {loading ? (
        <p>Loading snapshot...</p>
      ) : (
        <div>
          <div
            style={{
              marginBottom: "20px",
              overflowY: "auto",
              maxHeight: "400px",
            }}
          >
            <OrderBookSide title="Asks" orders={askArray} fixedHeader />
          </div>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "48%" }}>
              <h2>Statistics</h2>
              <p>
                Average Price:{" "}
                {calculateAveragePrice(bidArray, askArray).toFixed(2)}
              </p>
              <p>Spread: {calculateSpread(bidArray, askArray).toFixed(2)}</p>
            </div>
          </div>
          <div style={{ overflowY: "auto", maxHeight: "400px" }}>
            <OrderBookSide title="Bids" orders={bidArray} fixedHeader />
          </div>
        </div>
      )}
    </div>
  );
};

const OrderBookSide = ({ title, orders, fixedHeader }) => {
  return (
    <div style={{ width: "100%" }}>
      <h2>{title}</h2>
      <div className="table-container">
        <table>
          {fixedHeader && (
            <thead>
              <tr>
                <th>Price</th>
                <th>Size</th>
              </tr>
            </thead>
          )}
          <tbody>
            {orders.map(([price, size], index) => (
              <tr key={index}>
                <td>{parseFloat(price)}</td>
                <td>{parseFloat(size)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBook;
