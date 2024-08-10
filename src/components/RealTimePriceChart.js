import React, { useState, useEffect, useContext, useRef } from "react";
import {
  ChartCanvas,
  Chart,
  XAxis,
  YAxis,
  LineSeries,
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  MovingAverageTooltip,
  CurrentCoordinate,
  lastVisibleItemBasedZoomAnchor,
  ZoomButtons,
} from "react-financial-charts";
import { scaleTime, scaleLinear } from "d3-scale";
import { timeFormat } from "d3-time-format";
import ProductContext from "../utils/ProductContext";

const formatDate = timeFormat("%H:%M:%S");

const RealTimePriceChart = ({ width, height }) => {
  const { ticker } = useContext(ProductContext);
  const maxPoints = 100;
  const historyBuffer = 100; // Buffer size for historical data
  const [chartData, setChartData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [redrawKey, setRedrawKey] = useState(false);
  const canvasRef = useRef(null);
  useEffect(() => {
    if (ticker?.best_ask && ticker?.best_bid && ticker?.time) {
      setRedrawKey(false);
      const newPoint = {
        ask: parseFloat(ticker.best_ask),
        bid: parseFloat(ticker.best_bid),
        x: new Date(ticker.time),
      };

      setChartData((prevData) => {
        const updatedData = [...prevData, newPoint];

        // Keep a buffer of historical data
        if (updatedData.length > historyBuffer) {
          updatedData.shift();
        }

        return updatedData;
      });
    } else {
      setChartData([]);
      setRedrawKey(true);
    }
  }, [ticker]);

  useEffect(() => {
    if (chartData.length > 0) {
      // Update displayData to show only the most recent `maxPoints` data points
      setDisplayData((prevData) => {
        const endIndex = chartData.length;
        const startIndex = Math.max(endIndex - maxPoints, 0);
        return chartData.slice(startIndex, endIndex);
      });
    }
  }, [chartData]);

  const yAccessorBid = (d) => d?.bid;
  const yAccessorAsk = (d) => d?.ask;

  const xExtents =
    displayData.length > 0
      ? [
          displayData[0].x, // No padding on the left
          new Date(
            displayData[displayData.length - 1].x.getTime() +
              (displayData[displayData.length - 1].x.getTime() -
                displayData[0].x.getTime()) *
                0.1
          ), // Add padding on the right
        ]
      : [new Date(), new Date()]; // Fallback to current date if no data

  return (
    <div ref={canvasRef} className="relative w-full h-full">
      {canvasRef.current && (
        <ChartCanvas
          key={redrawKey} // Use key to force re-render
          height={canvasRef.current.offsetHeight}
          width={canvasRef.current.clientWidth}
          margin={{
            top: 10,
            right: 80,
            bottom: 40,
            left: 20,
          }}
          ratio={1}
          seriesName="Real-Time Data"
          data={displayData}
          xAccessor={(d) => d?.x}
          xScale={scaleTime()}
          yScale={scaleLinear()}
          xExtents={xExtents}
        >
          <Chart id={1} yExtents={(d) => [d.bid, d.ask]}>
            <XAxis
              showGridLines={true}
              gridLinesStrokeWidth={0.15}
              tickFormat={formatDate}
              tickLabelFill="#94a3b8"
              gridLinesStrokeStyle="#94a3b8"
              fontSize={11}

              //ticks={5}
            />
            <YAxis
              showGridLines={true}
              gridLinesStrokeWidth={0.15}
              tickLabelFill="#94a3b8"
              ticks={8}
              fontSize={11}
            />
            <LineSeries
              yAccessor={yAccessorBid}
              strokeStyle="#00ff00"
              strokeWidth={1}
            />
            <CurrentCoordinate yAccessor={yAccessorBid} fillStyle="#00ff00" />
            <LineSeries
              yAccessor={yAccessorAsk}
              strokeStyle="#ff0000"
              strokeWidth={1}
            />
            <CurrentCoordinate yAccessor={yAccessorAsk} fillStyle="#ff0000" />
            <MouseCoordinateX
              displayFormat={formatDate} // Format mouse X coordinate display
            />
            <MouseCoordinateY
              displayFormat={(d) => d.toFixed(2)} // Format mouse Y coordinate display
            />
            <MovingAverageTooltip
              origin={[8, 24]}
              textFill="#94a3b8"
              options={[
                {
                  yAccessor: yAccessorBid,
                  type: "Bid",
                  stroke: "#00ff00",
                  windowSize: 2,
                },
                {
                  yAccessor: yAccessorAsk,
                  type: "Ask",
                  stroke: "#ff0000",
                  windowSize: 2,
                },
              ]}
            />
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>
      )}
    </div>
  );
};

export default RealTimePriceChart;
