import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faMinus, faX } from "@fortawesome/free-solid-svg-icons";
//import "./index.css";
import ProductContext from "../utils/ProductContext";

const WidgetBoxComponent = ({
  heading,
  children,
  id,
  layoutHeight,
  isVisible,
  setIsVisible,
}) => {
  const { isExpanded, setIsExpanded } = useContext(ProductContext);
  const setExpandedValue = (id, value) => {
    setIsExpanded(() => {
      return { ...isExpanded, [id]: value };
    });
  };

  if (!isVisible) return null;

  return (
    <div
      className={` shadow-lg dark:bg-slate-800 bg-white dark:text-white text-gray-400 layout-container ${
        isExpanded?.[id] ? "expanded" : ""
      }`}
      style={{
        height: isExpanded?.[id] ? layoutHeight : "",
        maxHeight: "calc(-100px + 100vh)",
      }} //max-height: calc(-150px + 100vh);
    >
      <div className="layout-header dark:bg-[#2C3A52] bg-slate-500">
        <div className="flex items-center justify-center gap-1 w-fit">
          <span
            className="icon cursor-pointer text-[10px]"
            onClick={() => setIsVisible(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </span>
          <span className="text-white text-sm font-normal">{heading}</span>
        </div>
        {isExpanded?.[id] ? (
          <span
            className="icon cursor-pointer text-sm"
            onClick={() => setExpandedValue(id, false)}
          >
            <FontAwesomeIcon
              className="dark:bg-[#2C3A52] bg:white"
              icon={faMinus}
            />
          </span>
        ) : (
          <span
            className="icon cursor-pointer text-sm"
            onClick={() => setExpandedValue(id, true)}
          >
            <FontAwesomeIcon icon={faExpand} />
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default WidgetBoxComponent;
