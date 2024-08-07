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
  const maxPoints = 100;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (ticker?.best_ask && ticker?.best_bid && ticker?.time) {
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

      // Trigger a redraw
      // setRedrawKey((prevKey) => prevKey + 1);
    } else {
      setChartData([]);
    }
  }, [ticker]);

  const yAccessorBid = (d) => d?.bid;
  const yAccessorAsk = (d) => d?.ask;

  const xExtents = [chartData[0]?.x, chartData[chartData.length - 1]?.x];

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

  return (
    <div className="relative w-full h-full overflow-auto">
      <ChartCanvas
        key={true} // Use key to force re-render
        height={height}
        width={width}
        margin={{
          top: 0,
          right: 80,
          bottom: 40,
          left: 20,
        }}
        ratio={1}
        seriesName="Real-Time Data"
        data={chartData}
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
            showGridLines
            tickValues={getXTicks(chartData, 5)} // Display 5 ticks
            tickFormat={formatDate}
            tickStrokeStyle="#ff0000"
            tickLabelFill="#94a3b8"
            gridLinesStrokeStyle="#94a3b8"
            zoomEnabled={true}
            tickSize={5}
          />
          <YAxis
            showGridLines
            tickStrokeStyle="#00ff00"
            tickLabelFill="#94a3b8"
            tickSize={5}
            zoomEnabled={true}
          />
          <LineSeries
            yAccessor={yAccessorBid}
            strokeStyle="#00ff00"
            strokeWidth={2}
          />
          <CurrentCoordinate yAccessor={yAccessorBid} fillStyle="#00ff00" />
          <LineSeries
            yAccessor={yAccessorAsk}
            strokeStyle="#ff0000"
            strokeWidth={2}
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
