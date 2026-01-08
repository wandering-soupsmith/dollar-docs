---
sidebar_position: 4
title: How Swaps Resolve
description: The complete flow of a swap transaction
---

# How Swaps Resolve

This page explains the complete lifecycle of a swap, from input to output.

## Direct swap flow

When calling [`swap`](/capabilities/functions#swap)`(fromStablecoin, toStablecoin, amount, queueIfUnavailable)`:

```
1. Protocol transfers fromStablecoin from user to contract

2. Process fromStablecoin queue (FIFO)
   → Fill waiting positions with incoming tokens
   → Add remainder to supply

3. Check toStablecoin supply

4a. If supply >= amount:
    → Protocol transfers toStablecoin to user
    → Done (instant swap)

4b. If supply < amount:
    → If some supply available (partial fill):
      - Protocol transfers available amount to user
      - Remaining either queued (if queueIfUnavailable = true)
        or user takes back their remaining fromStablecoin (if false)
    → If zero supply:
      - Queue entire amount (if queueIfUnavailable = true)
      - REVERT (if queueIfUnavailable = false)
```

**Note:** For "all or nothing" behavior, use `queueIfUnavailable = false` and rely on the revert when supply is insufficient.

## Example: Full instant swap

```
State before:
  USDC in supply: 10,000
  USDT in supply: 5,000
  USDC queue: empty

User swaps 3,000 USDC → USDT:

1. 3,000 USDC transferred to contract
2. USDC queue is empty, so 3,000 added to supply
3. USDT in supply (5,000) >= 3,000 ✓
4. 3,000 USDT transferred to user

State after:
  USDC in supply: 13,000
  USDT in supply: 2,000
```

## Example: Partial fill with queue

```
State before:
  USDC in supply: 10,000
  USDT in supply: 1,000
  USDT queue: empty

User swaps 3,000 USDC → USDT (queueIfUnavailable = true):

1. 3,000 USDC transferred to contract
2. USDC queue empty, 3,000 added to supply
3. USDT in supply (1,000) < 3,000
4. 1,000 USDT transferred to user (partial)
5. User gets in line for remaining 2,000 USDT

State after:
  USDC in supply: 13,000
  USDT in supply: 0
  USDT queue: [User: 2,000]
```

## Example: Queue gets filled

Continuing from above:

```
State:
  USDT in supply: 0
  USDT queue: [User: 2,000]

Someone supplies 5,000 USDT:

1. 5,000 USDT transferred to contract
2. Process USDT queue:
   → User receives 2,000 USDT (leaves queue)
3. Remaining 3,000 added to supply

State after:
  USDT in supply: 3,000
  USDT queue: empty
```

## Aggregator flow

The [`swapExactInput`](/capabilities/functions#swapexactinput) function follows a simpler flow:

```
1. Check deadline hasn't passed
2. Check toStablecoin supply >= amountIn
   → If not, REVERT (no partial fills, no queue)
3. Transfer fromStablecoin from user
4. Process fromStablecoin queue
5. Add remainder to fromStablecoin supply
6. Deduct from toStablecoin supply
7. Transfer toStablecoin to recipient
```

This guarantees: either full execution or complete failure. No intermediate states.
