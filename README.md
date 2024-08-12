
# Coinbase Widgets



## Demo

https://t-codify.github.io/coinbaseWidgets/
## Features

- User can select Currency from the Dropdown

- Top of Book - This header displays the best bid and ask / quantity of the selected currency pair in real time along with 24-hour volume
    
- Real-Time Price Chart -
        Widget created using [react-financial-charts] library to display the current price of the chart

- Order Book (Ladder) -
        Widget that displays an order book and handles real-time updates.
        Displays the SPREAD as well as aggregates data as per the value selected in the dropdown

- Expand/Collapse each widget
- Remove the Widget using the cross icon (removed widget can be added back from the Add Widget dropdown)
- If a widget is expanded and another is added back, the added widget is displayed only after the expanded widget is collapsed
- Light/dark mode implemented, As per the user device theme the CSS is updated accordingly


## API Reference

#### Get Ticker and Level2 Snapshot and l2Update data

```websocket
  WEBSOCKET wss://ws-feed.exchange.coinbase.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Required**. "subscribe"/ "unsubscribe"  |
| `product_ids` | `string[]` | **Required**. Currency  |
| `channels` | `string[]` | **Required**. "level2_Batch","ticker"  |




## Deployment

To deploy this project run

```bash
npm run build
npm run start
npm run deploy
```


## 🛠 Skills

ReactJS, TailwindCSS, Javascript, HTML, CSS.

Libraries Used:
- react
- react-dom
- tailwindcss
- @react-financial-charts
- @fortawesome/free-solid-svg-icons
