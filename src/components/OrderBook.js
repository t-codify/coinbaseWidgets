import React, { useState, useEffect, useContext } from "react";
import ProductContext from "../utils/ProductContext";

const OrderBook = ({ l2update, snapshot }) => {
  const [bids, setBids] = useState(new Map());
  const [asks, setAsks] = useState(new Map());
  const [loading, setLoading] = useState(true);
  //console.log("initial snapshot: ", snapshot);
  //const { l2update, snapshot } = useContext(ProductContext);
  useEffect(() => {
    // Initialize the order book with snapshot data
    const newBids = new Map();
    const newAsks = new Map();

    snapshot?.bids?.forEach(([price, size]) => {
      if (parseFloat(size) > 0) {
        newBids.set(price, size);
      }
    });
    snapshot?.asks?.forEach(([price, size]) => {
      if (parseFloat(size) > 0) {
        newAsks.set(price, size);
      }
    });

    setBids(newBids);
    setAsks(newAsks);
    setLoading(false);
  }, []);
  useEffect(() => {
    // Update the order book with incremental updates
    const newBids = new Map(bids);
    const newAsks = new Map(asks);

    l2update?.changes?.forEach(([side, price, size]) => {
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
  }, [l2update]);
  //console.log(snapshot);
  // Get the latest 10 entries for bids and asks
  const getLatestEntries = (entries) => {
    return Array.from(entries.entries())
      .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])) // Sort in descending order for bids
      .slice(0, 10); // Limit to latest 10 entries
  };
  const getAskLatestEntries = (entries) => {
    return Array.from(entries.entries())
      .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])) // Sort in descending order for bids
      .slice(0, 10); // Limit to latest 10 entries
  };

  const bidArray = getLatestEntries(bids);
  const askArray = getAskLatestEntries(asks);

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
            <td>
              Average Price:{" "}
              {calculateAveragePrice(bidArray, askArray).toFixed(2)}
            </td>
            <td>Spread: {calculateSpread(bidArray, askArray).toFixed(2)} </td>
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
