// src/components/RealTimePriceChart.js
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
} from "react-financial-charts";
import { scaleTime, scaleLinear } from "d3-scale";
import { timeFormat } from "d3-time-format";
import ProductContext from "../utils/ProductContext";
// Format for X Axis labels
const formatDate = timeFormat("%Y-%m-%d %H:%M:%S");
//const pricesDisplayFormat = format(".2f");

const RealTimePriceChart = () => {
  const { ticker } = useContext(ProductContext);
  const [chartData, setChartData] = useState([
    {
      ask: parseFloat(ticker?.best_ask),
      bid: parseFloat(ticker?.best_bid),
      x: new Date(ticker?.time),
    },
  ]);
  const interval = 500;
  const maxPoints = 100;
  // Simulate live data update
  useEffect(() => {
    const addData = () => {
      const newData = [
        ...chartData,
        {
          ask: parseFloat(ticker.best_ask),
          bid: parseFloat(ticker.best_bid),
          x: new Date(ticker.time),
        },
      ];

      // Keep only the most recent `maxPoints` data points
      if (newData.length > maxPoints) {
        newData.shift(); // Remove the oldest data point
      }

      setChartData(newData);
    };

    const intervalId = setInterval(addData, interval);

    return () => clearInterval(intervalId);
  }, [chartData, interval, maxPoints]);

  // Define accessors for y-values
  const yAccessorBid = (d) => d?.bid;
  const yAccessorAsk = (d) => d?.ask;

  // Define the extent of data to be displayed based on the current view
  const xExtents = [chartData[0]?.x, chartData[chartData.length - 1]?.x];

  // Calculate X-axis ticks manually
  const getXTicks = (data, tickCount) => {
    if (data.length === 0) return [];
    const [minDate, maxDate] = [
      Math.min(...data.map((d) => d.x)),
      Math.max(...data.map((d) => d.x)),
    ];
    const step = (maxDate - minDate) / (tickCount - 1);
    const ticks = [];
    for (let i = 0; i < tickCount; i++) {
      ticks.push(new Date(minDate + i * step));
    }
    return ticks;
  };
  if (!chartData) return;
  return (
    // <div className="relative w-full h-full overflow-auto">
    <ChartCanvas
      height={400}
      width={800}
      ratio={3}
      seriesName="Real-Time Data"
      data={chartData}
      xAccessor={(d) => d?.x}
      xScale={scaleTime()}
      yScale={scaleLinear()}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={(d) => [d.bid, d.ask]}>
        <XAxis
          showGridLines
          tickValues={getXTicks(chartData, 5)} // Display 5 ticks
          tickFormat={formatDate}
        />
        <YAxis showGridLines tickPadding={2} />
        <LineSeries
          yAccessor={yAccessorBid}
          strokeStyle="#ff0000"
          strokeWidth={1}
        />
        <CurrentCoordinate yAccessor={yAccessorBid} fillStyle="#ff0000" />
        <LineSeries
          yAccessor={yAccessorAsk}
          strokeStyle="#00ff00"
          strokeWidth={1}
        />
        <CurrentCoordinate yAccessor={yAccessorAsk} fillStyle="#00ff00" />

        <MouseCoordinateX
          displayFormat={formatDate} // Format mouse X coordinate display
        />
        <MouseCoordinateY
          displayFormat={(d) => d.toFixed(2)} // Format mouse Y coordinate display
        />
        <MovingAverageTooltip
          origin={[8, 24]}
          options={[
            {
              yAccessor: yAccessorBid,
              type: "Bid",
              stroke: "#ff0000",
              windowSize: 2,
            },
            {
              yAccessor: yAccessorAsk,
              type: "Ask",
              stroke: "#00ff00",
              windowSize: 2,
            },
          ]}
        />
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
};

export default RealTimePriceChart;
