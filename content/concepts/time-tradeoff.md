---
sidebar_position: 3
title: Time vs Slippage
description: The fundamental tradeoff DollarStore makes
---

# Time vs Slippage

Every exchange mechanism makes a tradeoff. DollarStore's tradeoff is explicit: **perfect price, variable time**.

## The traditional tradeoff

AMMs and order books guarantee execution but not price:

| Mechanism | You get | You give up |
|-----------|---------|-------------|
| AMM (Uniswap) | Instant execution | Price (slippage + fees) |
| Order book | Price discovery | Instant execution (may not fill) |
| DollarStore | Exact 1:1 price | Instant execution (may queue) |

## When you get instant execution

Swaps execute instantly when reserves are sufficient:

```
USDC reserves: 50,000
Your swap: 10,000 USDC → USDT
Result: Instant, 10,000 USDT received
```

## When you wait

If reserves are insufficient, you have a choice:

```
USDC reserves: 5,000
Your swap: 10,000 USDC → USDT

Option 1: Partial fill + queue
  → Receive 5,000 USDT instantly
  → Queue for remaining 5,000

Option 2: Partial fill + DLRS
  → Receive 5,000 USDT instantly
  → Receive 5,000 DLRS (redeem later)

Option 3: Revert (aggregator mode)
  → Transaction fails
  → Route through different venue
```

## Predictable behavior for integrators

The `swapExactInput` function (for aggregators) never queues—it either executes fully or reverts. This makes integration predictable:

```solidity
// This either gives you exactly amountIn of USDT, or reverts
// Never partial fills, never queues
uint256 out = dollarStore.swapExactInput(
    USDC, USDT, amountIn, amountIn, recipient, deadline
);
```

Aggregators check `getSwapQuote` first. If it returns the full amount, the swap will succeed. If it returns 0, route elsewhere.

## Why this works

Stablecoin demand is cyclical. USDC holders sometimes want USDT; USDT holders sometimes want USDC. Over time, flows roughly balance.

DollarStore doesn't try to incentivize balance through fees or rates. It just processes swaps fairly: first come, first served, always 1:1.
