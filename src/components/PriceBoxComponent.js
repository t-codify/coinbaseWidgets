const PriceBoxComponent = ({ ticker }) => {
  const { type, best, price, size } = ticker;
  const bgColor = type.toUpperCase() === "ASK" ? "bg-green-800" : "bg-blue-800";
  return (
    <div className="relative bg-white m-5 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg ">
      <div className="border-solid border-s-blue-500">
        <div className="divide-y divide-gray-300/50">
          <div className="bg-blue-800 py-8 w-full text-basetext-gray-600">
            <h2 className="px-4 text-lg font-extrabold text-white">
              Best {type}: {best}
            </h2>
          </div>
          <div className="flex flex-row pt-4 text-base font-semibold leading-7 justify-between">
            <div className="px-6">
              <p className="text-gray-900">{price}</p>
              <p className="text-gray-400 text-sm">{type} Price</p>
            </div>
            <div className="px-6 text-right">
              <p className="text-gray-900">{size}</p>
              <p className="text-gray-400 text-sm">{type} Quantity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceBoxComponent;
