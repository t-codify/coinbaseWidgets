var $bHPwZ$reactjsxruntime = require("react/jsx-runtime");
var $bHPwZ$react = require("react");
var $bHPwZ$reactdomclient = require("react-dom/client");
var $bHPwZ$reactrouterdom = require("react-router-dom");
var $bHPwZ$reactfinancialcharts = require("react-financial-charts");
var $bHPwZ$d3scale = require("d3-scale");
var $bHPwZ$d3timeformat = require("d3-time-format");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}





const $7456ab6997d66078$export$9720603651db00f5 = [
    "BTC-USD",
    "ETH-USD",
    "LTC-USD",
    "BCH-USD"
];
const $7456ab6997d66078$export$d42af4eaacad9c65 = "https://api.exchange.coinbase.com/products?type=online";





const $0c1014aaaa980e55$var$PriceBoxComponent = ({ ticker: ticker })=>{
    const { type: type, best: best, price: price, size: size } = ticker;
    const bgColor = type.toUpperCase() === "ASK" ? "bg-green-800" : "bg-blue-800";
    return /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("div", {
        className: "relative bg-white m-5 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg ",
        children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("div", {
            className: "border-solid border-s-blue-500",
            children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("div", {
                className: "divide-y divide-gray-300/50",
                children: [
                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("div", {
                        className: "bg-blue-800 py-8 w-full text-basetext-gray-600",
                        children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("h2", {
                            className: "px-4 text-lg font-extrabold text-white",
                            children: [
                                "Best ",
                                type,
                                ": ",
                                best
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("div", {
                        className: "flex flex-row pt-4 text-base font-semibold leading-7 justify-between",
                        children: [
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("div", {
                                className: "px-6",
                                children: [
                                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("p", {
                                        className: "text-gray-900",
                                        children: price
                                    }),
                                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("p", {
                                        className: "text-gray-400 text-sm",
                                        children: [
                                            type,
                                            " Price"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("div", {
                                className: "px-6 text-right",
                                children: [
                                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("p", {
                                        className: "text-gray-900",
                                        children: size
                                    }),
                                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("p", {
                                        className: "text-gray-400 text-sm",
                                        children: [
                                            type,
                                            " Quantity"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        })
    });
};
var $0c1014aaaa980e55$export$2e2bcd8739ae039 = $0c1014aaaa980e55$var$PriceBoxComponent;



const $6d31288fe16b7c5f$var$ProductContext = /*#__PURE__*/ (0, $bHPwZ$react.createContext)({
    ticker: {},
    snapshot: {},
    l2update: {}
});
var $6d31288fe16b7c5f$export$2e2bcd8739ae039 = $6d31288fe16b7c5f$var$ProductContext;


const $437d0f34b42132fb$var$TopOfBookComponent = ({ ticker: ticker })=>{
    //const { ticker } = useContext(ProductContext);
    const color = ticker.side === "buy" ? "text-[#00ff00]" : "text-[#ff0000]";
    if (!ticker) return;
    return /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("div", {
        children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("table", {
            className: "table-fixed text-xs border-none w-8/12 ",
            children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("tbody", {
                children: [
                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("tr", {
                        className: "font-semibold dark:text-white text-gray-400",
                        children: [
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: "Best Bid"
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: "Bid Size"
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: "Best Ask"
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: "Ask Size"
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: "Price"
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: "24hr Volume"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("tr", {
                        className: "dark:text-slate-400 border-none text-gray-800",
                        children: [
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: ticker.best_bid
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: ticker.best_bid_size
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: ticker.best_ask
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: ticker.best_ask_size
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: color + " border-none",
                                children: ticker.price
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                className: "border-none",
                                children: ticker.volume_24h
                            })
                        ]
                    })
                ]
            })
        })
    });
};
var $437d0f34b42132fb$export$2e2bcd8739ae039 = $437d0f34b42132fb$var$TopOfBookComponent;





const $439621edc8bc268f$var$OrderBook = ()=>{
    const [bids, setBids] = (0, $bHPwZ$react.useState)(new Map());
    const [asks, setAsks] = (0, $bHPwZ$react.useState)(new Map());
    const [loading, setLoading] = (0, $bHPwZ$react.useState)(true);
    //console.log("initial snapshot: ", snapshot);
    const { l2update: l2update, snapshot: snapshot } = (0, $bHPwZ$react.useContext)((0, $6d31288fe16b7c5f$export$2e2bcd8739ae039));
    (0, $bHPwZ$react.useEffect)(()=>{
        // Initialize the order book with snapshot data
        const newBids = new Map();
        const newAsks = new Map();
        snapshot?.bids?.forEach(([price, size])=>{
            if (parseFloat(size) > 0) newBids.set(price, size);
        });
        snapshot?.asks?.forEach(([price, size])=>{
            if (parseFloat(size) > 0) newAsks.set(price, size);
        });
        setBids(newBids);
        setAsks(newAsks);
    }, [
        snapshot
    ]);
    (0, $bHPwZ$react.useEffect)(()=>{
        // Update the order book with incremental updates
        const newBids = new Map(bids);
        const newAsks = new Map(asks);
        l2update?.changes?.forEach(([side, price, size])=>{
            if (side === "buy") {
                if (parseFloat(size) === 0) newBids.delete(price);
                else newBids.set(price, size);
            } else if (side === "sell") {
                if (parseFloat(size) === 0) newAsks.delete(price);
                else newAsks.set(price, size);
            }
        });
        setBids(newBids);
        setAsks(newAsks);
    //console.log(newBids.size, newAsks.size);
    }, [
        l2update
    ]);
    //console.log(snapshot);
    // Get the latest 10 entries for bids and asks
    const getLatestEntries = (entries)=>{
        return Array.from(entries.entries()).sort((a, b)=>parseFloat(b[0]) - parseFloat(a[0])) // Sort in descending order for bids
        .slice(0, 10); // Limit to latest 10 entries
    };
    const getAskLatestEntries = (entries)=>{
        return Array.from(entries.entries()).sort((a, b)=>parseFloat(a[0]) - parseFloat(b[0])) // Sort in descending order for bids
        .slice(0, 10); // Limit to latest 10 entries
    };
    const bidArray = getLatestEntries(bids);
    const askArray = getAskLatestEntries(asks);
    // Calculate average price based on last ask and first bid
    const calculateAveragePrice = (bidArray, askArray)=>{
        const lastAskPrice = askArray.length > 0 ? parseFloat(askArray[askArray.length - 1][0]) : 0;
        const firstBidPrice = bidArray.length > 0 ? parseFloat(bidArray[0][0]) : 0;
        return (lastAskPrice + firstBidPrice) / 2 || 0;
    };
    // Calculate spread between last ask and first bid
    const calculateSpread = (bidArray, askArray)=>{
        const lastAskPrice = askArray.length > 0 ? parseFloat(askArray[askArray.length - 1][0]) : 0;
        const firstBidPrice = bidArray.length > 0 ? parseFloat(bidArray[0][0]) : 0;
        return lastAskPrice - firstBidPrice;
    };
    return /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("div", {
        className: "table-container text-xs",
        children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("table", {
            className: "table-fixed",
            children: [
                /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("thead", {
                    children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("tr", {
                        children: [
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("th", {
                                className: "bg-inherit",
                                children: "Price"
                            }),
                            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("th", {
                                className: "bg-transparent",
                                children: "Size"
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("tbody", {
                    children: [
                        askArray.map(([price, size], index)=>/*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("tr", {
                                children: [
                                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                        className: "text-[#ff0000]",
                                        children: parseFloat(price)
                                    }),
                                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                        children: parseFloat(size)
                                    })
                                ]
                            }, "ask" + index)),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("tr", {
                            className: "dark:text-slate-400 text-xs text-gray-800",
                            children: [
                                /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("td", {
                                    children: [
                                        "Average Price:",
                                        " ",
                                        calculateAveragePrice(bidArray, askArray).toFixed(2)
                                    ]
                                }),
                                /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("td", {
                                    children: [
                                        "Spread: ",
                                        calculateSpread(bidArray, askArray).toFixed(2),
                                        " "
                                    ]
                                })
                            ]
                        }),
                        bidArray.map(([price, size], index)=>/*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("tr", {
                                children: [
                                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                        className: "text-[#00ff00]",
                                        children: parseFloat(price)
                                    }),
                                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("td", {
                                        children: parseFloat(size)
                                    })
                                ]
                            }, "bid" + index))
                    ]
                })
            ]
        })
    });
};
var $439621edc8bc268f$export$2e2bcd8739ae039 = $439621edc8bc268f$var$OrderBook;








const $283f108f3ea60570$var$formatDate = (0, $bHPwZ$d3timeformat.timeFormat)("%Y-%m-%d %H:%M:%S");
const $283f108f3ea60570$var$RealTimePriceChart = ({ width: width, height: height })=>{
    const { ticker: ticker } = (0, $bHPwZ$react.useContext)((0, $6d31288fe16b7c5f$export$2e2bcd8739ae039));
    const maxPoints = 100;
    const [chartData, setChartData] = (0, $bHPwZ$react.useState)([]);
    (0, $bHPwZ$react.useEffect)(()=>{
        if (ticker?.best_ask && ticker?.best_bid && ticker?.time) {
            const newData = [
                ...chartData,
                {
                    ask: parseFloat(ticker.best_ask),
                    bid: parseFloat(ticker.best_bid),
                    x: new Date(ticker.time)
                }
            ];
            // Keep only the most recent `maxPoints` data points
            if (newData.length > maxPoints) newData.shift(); // Remove the oldest data point
            setChartData(newData);
        // Trigger a redraw
        // setRedrawKey((prevKey) => prevKey + 1);
        } else setChartData([]);
    }, [
        ticker
    ]);
    const yAccessorBid = (d)=>d?.bid;
    const yAccessorAsk = (d)=>d?.ask;
    const xExtents = [
        chartData[0]?.x,
        chartData[chartData.length - 1]?.x
    ];
    const getXTicks = (data, tickCount)=>{
        if (data.length === 0) return [];
        const [minDate, maxDate] = [
            Math.min(...data.map((d)=>d?.x)),
            Math.max(...data.map((d)=>d?.x))
        ];
        const step = (maxDate - minDate) / (tickCount - 1);
        return Array.from({
            length: tickCount
        }, (_, i)=>new Date(minDate + i * step));
    };
    return /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("div", {
        className: "relative w-full h-full overflow-auto",
        children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)((0, $bHPwZ$reactfinancialcharts.ChartCanvas), {
            height: height,
            width: width,
            margin: {
                top: 0,
                right: 80,
                bottom: 40,
                left: 20
            },
            ratio: 1,
            seriesName: "Real-Time Data",
            data: chartData,
            xAccessor: (d)=>d?.x,
            xScale: (0, $bHPwZ$d3scale.scaleTime)(),
            yScale: (0, $bHPwZ$d3scale.scaleLinear)(),
            xExtents: xExtents,
            maintainPointsPerPixelOnResize: true,
            zoomMultiplier: 2,
            zoomAnchor: (0, $bHPwZ$reactfinancialcharts.lastVisibleItemBasedZoomAnchor),
            children: [
                /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)((0, $bHPwZ$reactfinancialcharts.Chart), {
                    id: 1,
                    yExtents: (d)=>[
                            d.bid,
                            d.ask
                        ],
                    children: [
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.XAxis), {
                            showGridLines: true,
                            tickValues: getXTicks(chartData, 5),
                            tickFormat: $283f108f3ea60570$var$formatDate,
                            tickStrokeStyle: "#ff0000",
                            tickLabelFill: "#94a3b8",
                            gridLinesStrokeStyle: "#94a3b8",
                            zoomEnabled: true,
                            tickSize: 5
                        }),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.YAxis), {
                            showGridLines: true,
                            tickStrokeStyle: "#00ff00",
                            tickLabelFill: "#94a3b8",
                            tickSize: 5,
                            zoomEnabled: true
                        }),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.LineSeries), {
                            yAccessor: yAccessorBid,
                            strokeStyle: "#00ff00",
                            strokeWidth: 2
                        }),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.CurrentCoordinate), {
                            yAccessor: yAccessorBid,
                            fillStyle: "#00ff00"
                        }),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.LineSeries), {
                            yAccessor: yAccessorAsk,
                            strokeStyle: "#ff0000",
                            strokeWidth: 2
                        }),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.CurrentCoordinate), {
                            yAccessor: yAccessorAsk,
                            fillStyle: "#ff0000"
                        }),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.MouseCoordinateX), {
                            displayFormat: $283f108f3ea60570$var$formatDate
                        }),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.MouseCoordinateY), {
                            displayFormat: (d)=>d.toFixed(2)
                        }),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.MovingAverageTooltip), {
                            origin: [
                                8,
                                24
                            ],
                            textFill: "#94a3b8",
                            options: [
                                {
                                    yAccessor: yAccessorBid,
                                    type: "Bid",
                                    stroke: "#00ff00",
                                    windowSize: 2
                                },
                                {
                                    yAccessor: yAccessorAsk,
                                    type: "Ask",
                                    stroke: "#ff0000",
                                    windowSize: 2
                                }
                            ]
                        }),
                        /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.ZoomButtons), {})
                    ]
                }),
                /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactfinancialcharts.CrossHairCursor), {})
            ]
        }, true)
    });
};
var $283f108f3ea60570$export$2e2bcd8739ae039 = $283f108f3ea60570$var$RealTimePriceChart;





const $85f59c64bae5b6fe$var$URI = "wss://ws-feed.exchange.coinbase.com";
const $85f59c64bae5b6fe$var$useWebSocket = (selectedCurr, selectedSubs)=>{
    const [data, setData] = (0, $bHPwZ$react.useState)(null);
    const [isConnected, setIsConnected] = (0, $bHPwZ$react.useState)(false);
    const wsRef = (0, $bHPwZ$react.useRef)(null);
    (0, $bHPwZ$react.useEffect)(()=>{
        // Initialize WebSocket connection
        wsRef.current = new WebSocket($85f59c64bae5b6fe$var$URI);
        const ws = wsRef.current;
        // Handle WebSocket events directly
        ws.onopen = ()=>{
            const subscriptionType = selectedSubs;
            const subscribeMessage = JSON.stringify({
                type: subscriptionType,
                product_ids: [
                    selectedCurr ?? selectedCurr
                ],
                channels: [
                    "ticker",
                    "level2_batch"
                ]
            });
            ws.send(subscribeMessage);
            console.log(`${subscriptionType} to ticker and l2Batch channel for product ${selectedCurr}`);
            setIsConnected(true);
        };
        ws.onclose = ()=>{
            console.log("WebSocket disconnected");
            setIsConnected(false);
        };
        ws.onmessage = (event)=>{
            if (selectedSubs === "unsubscribe") {
                setIsConnected(false);
                ws.close();
            }
            setData(event.data);
        };
        ws.onerror = (error)=>{
            console.error("WebSocket error", error);
        };
        // Clean up WebSocket connection on component unmount
        return ()=>{
            if (wsRef.current) wsRef.current.close();
        };
    }, [
        selectedCurr,
        selectedSubs
    ]);
    return {
        data: data,
        isConnected: isConnected
    };
};
var $85f59c64bae5b6fe$export$2e2bcd8739ae039 = $85f59c64bae5b6fe$var$useWebSocket;


const $fc4788e3aec3cdb5$var$WebSocketComponent = ()=>{
    const { ticker: ticker, setTickerData: setTickerData, l2update: l2update, setl2UpdateData: setl2UpdateData, snapshot: snapshot, setSnapshotData: setSnapshotData } = (0, $bHPwZ$react.useContext)((0, $6d31288fe16b7c5f$export$2e2bcd8739ae039));
    const [selectedCurr, setSelectedCurr] = (0, $bHPwZ$react.useState)("BTC-USD");
    const [selectedSubs, setSelectedSubs] = (0, $bHPwZ$react.useState)("subscribe");
    const canvasRef = (0, $bHPwZ$react.useRef)();
    const { data: data, isConnected: isConnected } = (0, $85f59c64bae5b6fe$export$2e2bcd8739ae039)(selectedCurr, selectedSubs);
    (0, $bHPwZ$react.useEffect)(()=>{
        if (!data) return;
        try {
            const jsonResponse = JSON.parse(data);
            switch(jsonResponse?.type){
                case "ticker":
                    setTickerData(jsonResponse);
                    break;
                case "snapshot":
                    console.log("snapshot changed");
                    setSnapshotData(jsonResponse);
                    break;
                case "l2update":
                    setl2UpdateData(jsonResponse);
                    break;
                default:
                    console.warn("Unhandled message type:", jsonResponse?.type);
                    break;
            }
        } catch (error) {
            console.error("Failed to decode JSON response:", data, error);
        }
    }, [
        data,
        setTickerData,
        setSnapshotData,
        setl2UpdateData
    ]);
    (0, $bHPwZ$react.useEffect)(()=>{
        if (!isConnected) setTickerData({});
    }, [
        isConnected,
        setTickerData
    ]);
    if (!ticker || !snapshot || !l2update) return null; // Return null to avoid rendering if data is missing
    return /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)((0, $bHPwZ$reactjsxruntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("div", {
                className: "flex flex-row mt-5 justify-normal align-middle content-evenly",
                children: [
                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("label", {
                        className: "mx-2 w-3/12 font-bold dark:text-white text-gray-400 ",
                        children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("select", {
                            className: "px-3 py-2 w-40 bg-white dark:bg-inherit shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm focus:ring-1",
                            value: selectedCurr,
                            onChange: (e)=>{
                                setSelectedCurr(e.target.value);
                                setSelectedSubs("subscribe");
                            },
                            children: (0, $7456ab6997d66078$export$9720603651db00f5).map((opts)=>/*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("option", {
                                    value: opts,
                                    children: opts
                                }, opts))
                        })
                    }),
                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $437d0f34b42132fb$export$2e2bcd8739ae039), {
                        ticker: ticker
                    })
                ]
            }),
            /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsxs)("div", {
                className: "flex flex-row dark:bg-slate-800 bg-white dark:text-white text-gray-400",
                children: [
                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("div", {
                        className: "flex flex-col w-9/12",
                        ref: canvasRef,
                        children: canvasRef.current && /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $283f108f3ea60570$export$2e2bcd8739ae039), {
                            width: canvasRef.current.clientWidth,
                            height: canvasRef.current.offsetHeight
                        })
                    }),
                    /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("div", {
                        className: "w-3/12",
                        children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $439621edc8bc268f$export$2e2bcd8739ae039), {})
                    })
                ]
            })
        ]
    });
};
var $fc4788e3aec3cdb5$export$2e2bcd8739ae039 = $fc4788e3aec3cdb5$var$WebSocketComponent;






const $449aaa0721dc4137$var$AppLayout = ()=>{
    const [tickerData, setTickerData] = (0, $bHPwZ$react.useState)();
    const [l2UpdateData, setl2UpdateData] = (0, $bHPwZ$react.useState)();
    const [snapshotData, setSnapshotData] = (0, $bHPwZ$react.useState)();
    return /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)("div", {
        children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $6d31288fe16b7c5f$export$2e2bcd8739ae039).Provider, {
            value: {
                ticker: tickerData,
                setTickerData: setTickerData,
                l2update: l2UpdateData,
                setl2UpdateData: setl2UpdateData,
                snapshot: snapshotData,
                setSnapshotData: setSnapshotData
            },
            children: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $fc4788e3aec3cdb5$export$2e2bcd8739ae039), {})
        })
    });
};
const $449aaa0721dc4137$var$appRouter = (0, $bHPwZ$reactrouterdom.createBrowserRouter)([
    {
        path: "/",
        element: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)($449aaa0721dc4137$var$AppLayout, {})
    },
    {
        path: "/coinbaseWidgets/",
        element: /*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)($449aaa0721dc4137$var$AppLayout, {})
    }
]);
const $449aaa0721dc4137$var$rootEle = (0, ($parcel$interopDefault($bHPwZ$reactdomclient))).createRoot(document.getElementById("root"));
$449aaa0721dc4137$var$rootEle.render(/*#__PURE__*/ (0, $bHPwZ$reactjsxruntime.jsx)((0, $bHPwZ$reactrouterdom.RouterProvider), {
    router: $449aaa0721dc4137$var$appRouter
}));


//# sourceMappingURL=index.js.map
