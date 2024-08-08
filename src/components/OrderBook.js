import React, { useState, useEffect, useContext, useMemo } from "react";
import ProductContext from "../utils/ProductContext";

const OrderBook = ({ processSnapshot, curr }) => {
  const [bids, setBids] = useState(new Map());
  const [asks, setAsks] = useState(new Map());
  const [snapshotProcessed, setSnapshotProcessed] = useState(!processSnapshot); // Track if snapshot has been processed
  const { l2update, snapshot } = useContext(ProductContext);

  useEffect(() => {
    // Initialize the order book with snapshot data
    if (processSnapshot) {
      const newBids = new Map();
      const newAsks = new Map();

      snapshot?.[curr]?.bids?.forEach(([price, size]) => {
        if (parseFloat(size) > 0) {
          newBids.set(price, size);
        }
      });
      snapshot?.[curr]?.asks?.forEach(([price, size]) => {
        if (parseFloat(size) > 0) {
          newAsks.set(price, size);
        }
      });
      setBids(newBids);
      setAsks(newAsks);
      setSnapshotProcessed(true); // Mark snapshot as processed
    }
  }, [snapshot, snapshotProcessed]);
  useEffect(() => {
    // Apply l2 updates
    if (snapshotProcessed && l2update) {
      const newBids = new Map(bids);
      const newAsks = new Map(asks);

      l2update.changes?.forEach(([side, price, size]) => {
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
  }, [l2update, snapshotProcessed]);

  const getLatestEntries = (entries, isBid = true) => {
    return useMemo(() => {
      return Array.from(entries.entries())
        .sort(([aPrice], [bPrice]) =>
          isBid
            ? parseFloat(bPrice) - parseFloat(aPrice)
            : parseFloat(aPrice) - parseFloat(bPrice)
        )
        .slice(0, 10);
    }, [entries]);
  };

  const bidArray = getLatestEntries(bids, true);
  const askArray = getLatestEntries(asks, false);

  const calculateAveragePrice = useMemo(() => {
    const lastAskPrice =
      askArray.length > 0 ? parseFloat(askArray[askArray.length - 1][0]) : 0;
    const firstBidPrice = bidArray.length > 0 ? parseFloat(bidArray[0][0]) : 0;
    return (lastAskPrice + firstBidPrice) / 2 || 0;
  }, [bidArray, askArray]);

  const calculateSpread = useMemo(() => {
    const lastAskPrice =
      askArray.length > 0 ? parseFloat(askArray[askArray.length - 1][0]) : 0;
    const firstBidPrice = bidArray.length > 0 ? parseFloat(bidArray[0][0]) : 0;
    return lastAskPrice - firstBidPrice;
  }, [bidArray, askArray]);

  return (
    <div className="table-container text-xs">
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="bg-inherit">Price</th>
            <th className="bg-transparent">Size</th>
          </tr>
        </thead>
        <tbody>
          {askArray.map(([price, size], index) => (
            <tr key={"ask" + index}>
              <td className="text-[#ff0000]">{parseFloat(price)}</td>
              <td>{parseFloat(size)}</td>
            </tr>
          ))}
          <tr className="dark:text-slate-400 text-xs text-gray-800">
            <td>Average Price: {calculateAveragePrice.toFixed(2)}</td>
            <td>Spread: {calculateSpread.toFixed(2)} </td>
          </tr>
          {bidArray.map(([price, size], index) => (
            <tr key={"bid" + index}>
              <td className="text-[#00ff00]">{parseFloat(price)}</td>
              <td>{parseFloat(size)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;
