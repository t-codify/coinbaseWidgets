const TopOfBookComponent = ({ ticker }) => {
  //const { ticker } = useContext(ProductContext);
  const color = ticker.side === "buy" ? "text-[#00ff00]" : "text-[#ff0000]";
  return (
    <div>
      <table className="table-fixed text-xs border-none w-9/12 ">
        <tbody>
          <tr className="font-semibold dark:text-white text-gray-400">
            <td className="border-none">Best Bid</td>
            <td className="border-none">Bid Size</td>
            <td className="border-none">Best Ask</td>
            <td className="border-none">Ask Size</td>
            <td className="border-none">Price</td>
            <td className="border-none">24hr Volume</td>
          </tr>
          <tr className="dark:text-slate-400 border-none text-gray-800">
            <td className="border-none">{ticker.best_bid}</td>
            <td className="border-none">{ticker.best_bid_size}</td>
            <td className="border-none">{ticker.best_ask}</td>
            <td className="border-none">{ticker.best_ask_size}</td>
            <td className={color + " border-none"}>{ticker.price}</td>
            <td className="border-none">{ticker.volume_24h}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopOfBookComponent;
