import React, { useState, useEffect, useContext } from "react";
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

const formatDate = timeFormat("%Y-%m-%d %H:%M:%S");

const RealTimePriceChart = ({ width, height }) => {
  const { ticker } = useContext(ProductContext);
  const maxPoints = 50;
  const historyBuffer = 100; // Buffer size for historical data
  const [chartData, setChartData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [redrawKey, setRedrawKey] = useState(false);

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

  const getXTicks = (data, tickCount) => {
    if (data.length === 0) return [];
    const [minDate, maxDate] = [
      Math.min(...data.map((d) => d?.x)),
      Math.max(...data.map((d) => d?.x)),
    ];
    const step = (maxDate - minDate) / (tickCount - 1);
    const ticks = [];
    for (let i = 0; i < tickCount; i++) {
      ticks.push(new Date(minDate + i * step));
    }
    return ticks;
  };

  const getYTicks = (data, tickCount) => {
    if (data.length === 0) return [];
    const [minPrice, maxPrice] = [
      Math.min(...data.map((d) => d?.ask)),
      Math.max(...data.map((d) => d?.bid)),
    ];
    const step = (maxPrice - minPrice) / (tickCount - 1);
    const ticks = [];
    for (let i = 0; i < tickCount; i++) {
      ticks.push(minPrice + i * step);
    }
    return ticks;
  };

  return (
    <div className="relative w-full h-full overflow-auto">
      <ChartCanvas
        key={redrawKey} // Use key to force re-render
        height={height}
        width={width}
        margin={{
          top: height ? 10 : 0,
          right: 80,
          bottom: height ? 40 : 0,
          left: 20,
        }}
        ratio={1}
        seriesName="Real-Time Data"
        data={displayData}
        xAccessor={(d) => d?.x}
        xScale={scaleTime()}
        yScale={scaleLinear()}
        xExtents={xExtents}
        maintainPointsPerPixelOnResize={true}
        zoomMultiplier={2}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart id={1} yExtents={(d) => [d.bid, d.ask]}>
          <XAxis
            tickValues={getXTicks(displayData, 5)} // Display 5 ticks
            tickFormat={formatDate}
            tickStrokeStyle="#ff0000"
            tickLabelFill="#94a3b8"
            gridLinesStrokeStyle="#94a3b8"
            zoomEnabled={true}
            tickSize={5}
          />
          <YAxis
            tickStrokeStyle="#00ff00"
            tickLabelFill="#94a3b8"
            tickValues={getYTicks(displayData, 5)}
            zoomEnabled={true}
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
          <ZoomButtons />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </div>
  );
};

export default RealTimePriceChart;
