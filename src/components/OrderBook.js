import React, { useState, useEffect, useContext, useMemo } from "react";
import ProductContext from "../utils/ProductContext";

const OrderBook = ({ processSnapshot, curr }) => {
  const [bids, setBids] = useState(new Map());
  const [asks, setAsks] = useState(new Map());
  const [snapshotProcessed, setSnapshotProcessed] = useState(!processSnapshot); // Track if snapshot has been processed
  const [aggregation, setAggregation] = useState(0.001); // Default aggregation level
  const { l2update, snapshot, setl2UpdateData } = useContext(ProductContext);

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
    //setl2UpdateData({});
  }, [snapshot]);
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
    } else {
      setBids([]);
      setAsks([]);
    }
  }, [l2update, snapshotProcessed]);
  useEffect(() => {
    setBids([]);
    setAsks([]);
  }, [curr]);
  const aggregateEntries = (entries) => {
    const aggregated = new Map();

    entries.forEach((size, price) => {
      const roundedPrice = (
        Math.floor(parseFloat(price) / aggregation) * aggregation
      ).toFixed(3);
      const existingSize = aggregated.get(roundedPrice) || 0;
      aggregated.set(roundedPrice, parseFloat(existingSize) + parseFloat(size));
    });

    return aggregated;
  };

  const getLatestEntries = (entries, isBid = true) => {
    return useMemo(() => {
      const aggregatedEntries = aggregateEntries(entries);
      return Array.from(aggregatedEntries.entries())
        .sort(([aPrice], [bPrice]) =>
          isBid
            ? parseFloat(bPrice) - parseFloat(aPrice)
            : parseFloat(aPrice) - parseFloat(bPrice)
        )
        .slice(0, 10);
    }, [entries, aggregation]);
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
      <div className="p-2 w-full flex flex-row justify-between">
        <label>Aggregation Level: </label>
        <select
          className="w-3/6 bg-transparent dark:text-slate-400 text-xs text-gray-800"
          value={aggregation}
          onChange={(e) => setAggregation(parseFloat(e.target.value))}
        >
          <option value={0.001}>0.001</option>
          <option value={0.01}>0.01</option>
          <option value={1}>1</option>
        </select>
      </div>
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
