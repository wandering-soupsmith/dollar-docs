---
sidebar_position: 3
title: Time vs Slippage
description: The fundamental tradeoff the protocol makes
---

# Time vs Slippage

Every exchange mechanism makes a tradeoff. The DollarStore protocol's tradeoff is explicit: **perfect price, variable time**.

## The traditional tradeoff

AMMs and order books guarantee execution but not price:

| Mechanism | Users get | Users give up |
|-----------|---------|-------------|
| AMM (Uniswap) | Instant execution | Price (slippage + fees) |
| Order book | Price discovery | Instant execution (may not fill) |
| DollarStore | Exact 1:1 price | Instant execution (may queue) |

## When users get instant execution

Swaps execute instantly when the desired stablecoin is available in supply:

```
USDT in supply: 50,000
User swap: 10,000 USDC → USDT
Result: Instant, 10,000 USDT received
```

## When users wait

If the desired stablecoin isn't available, users have a choice:

```
USDT in supply: 5,000
User swap: 10,000 USDC → USDT

Option 1: Partial fill + queue
  → Receive 5,000 USDT instantly
  → Get in line for remaining 5,000

Option 2: Partial fill + take back remaining USDC
  → Receive 5,000 USDT instantly
  → Take back remaining 5,000 USDC instantly

Option 3: Revert (aggregator mode)
  → Transaction fails
  → Route through different venue
```

## Predictable behavior for integrators

The [`swapExactInput`](/capabilities/functions#swapexactinput) function (for aggregators) never queues. It either executes fully or reverts.

```solidity
// This either gives exactly amountIn of USDT, or reverts
// Never partial fills, never queues
uint256 out = dollarStore.swapExactInput(
    USDC, USDT, amountIn, amountIn, recipient, deadline
);
```

Aggregators check [`getSwapQuote`](/capabilities/functions#getswapquote) first. If it returns the full amount, the protocol will execute the swap. If it returns 0, route elsewhere.
