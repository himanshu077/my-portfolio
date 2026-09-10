# HyperLiquid Trading App

**A live perpetuals order book and trade history for the Hyperliquid exchange.**

The app streams the level-2 order book over Hyperliquid's WebSocket API, polls the public info endpoint for market stats, and reconstructs complete trades from raw fills for the history tape. It renders a markets list, a full order book with mark, oracle, volume, open interest, and funding, and a trade-history view, so the screen behaves like a lightweight exchange terminal rather than a static demo.

---

## Features

- **Markets list** — every perpetual with its mark price and 24-hour change, colour-coded, with the selected market highlighted.
- **Order book** — asks and bids side by side with price and size per level, plus a header strip for 24h volume, open interest, funding rate, and oracle price.
- **Live order book over WebSocket** — subscribes to the `l2Book` channel per coin, resubscribes automatically after a reconnect, and unsubscribes when the market changes.
- **Trade history from fills** — a `TradeReconstructor` groups raw user fills by coin and stitches them into complete trades with entry, exit, and PnL.
- **Market stats polling** — the meta and asset-context endpoint is polled every five seconds for mark, oracle, volume, open interest, and funding.
- **Component library** — the UI is built on shadcn/ui primitives (Radix under the hood) with Recharts available for charting and a light/dark theme switch through next-themes.

---

## How it is built

```
src/
├─ app/                     # App Router shell and page
├─ components/
│  ├─ OrderBook/            # markets sidebar + order book panel
│  ├─ TradeHistory/         # recent trades tape
│  └─ ui/                   # shadcn/ui primitives
└─ lib/
   ├─ hyperliquid-api.ts     # typed REST client for the info endpoints
   ├─ websocket.ts           # HyperLiquidWebSocket: subscribe / resubscribe / unsubscribe
   └─ trade-reconstruction.ts# TradeReconstructor: fills → trades
```

- A typed REST client wraps the Hyperliquid info endpoints, and a small WebSocket class owns the `l2Book` subscriptions with a callback map keyed by coin.
- The order book is fed by the socket while market stats come from a `useEffect` + `setInterval` poll, so the book stays live between stat refreshes.
- Prices and sizes are formatted at render time, so the raw API payload is stored untouched and every panel derives from the same data.

---

## Tech Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · shadcn/ui · Radix UI · Recharts · react-hook-form + Zod · next-themes · Hyperliquid REST + WebSocket API
