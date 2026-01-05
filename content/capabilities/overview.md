---
sidebar_position: 1
title: Overview
description: Contract architecture and integration points
---

# Capabilities Overview

DollarStore consists of two contracts:

| Contract | Purpose |
|----------|---------|
| **DollarStore** | Main protocol logic—deposits, withdrawals, swaps, queue |
| **DLRS** | ERC-20 receipt token (deployed by DollarStore) |

## Supported stablecoins

Currently supported:

| Token | Decimals |
|-------|----------|
| USDC | 6 |
| USDT | 6 |

The admin can add or remove supported stablecoins.

## Integration paths

### For aggregators

Use `getSwapQuote` to check if a swap is fillable, then `swapExactInput` to execute:

```solidity
// Check quote (returns 0 if not fillable)
uint256 quote = dollarStore.getSwapQuote(USDC, USDT, amountIn);

if (quote > 0) {
    // Execute swap (reverts if reserves depleted between quote and execution)
    uint256 out = dollarStore.swapExactInput(
        USDC,           // fromStablecoin
        USDT,           // toStablecoin
        amountIn,       // amount in
        amountIn,       // min out (1:1, so same as in)
        recipient,      // where to send output
        block.timestamp + 300  // 5 min deadline
    );
}
```

### For direct users

Use `swap` with the queue option for maximum flexibility:

```solidity
// Swap with queue fallback
(uint256 received, uint256 positionId) = dollarStore.swap(
    USDC,   // from
    USDT,   // to
    amount, // how much
    true    // queue if not fully fillable
);

// received = amount filled instantly
// positionId = queue position (0 if fully filled)
```

### For DLRS holders

Convert DLRS to any stablecoin:

```solidity
(uint256 received, uint256 positionId) = dollarStore.swapFromDLRS(
    USDT,       // which stablecoin you want
    dlrsAmount, // how much DLRS to convert
    true        // queue if needed
);
```

## Key invariants

1. **1:1 ratio**: All operations preserve 1:1 between DLRS and stablecoins
2. **No fees**: Zero protocol fees on any operation
3. **FIFO ordering**: Queue positions processed strictly first-in-first-out
4. **Atomic operations**: Each transaction either fully completes or reverts (for aggregator functions)

## Next steps

- [Functions](/capabilities/functions) — Complete function reference
- [Events](/capabilities/events) — Events for monitoring
- [Errors](/capabilities/errors) — Error conditions and handling
