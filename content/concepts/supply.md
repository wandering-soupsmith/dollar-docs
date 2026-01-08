---
sidebar_position: 1
title: Supply
description: How supplying and withdrawing stablecoins works
---

# Supply

Users can supply stablecoins to the protocol and withdraw them at any time.

## Supplying stablecoins

When a user supplies a stablecoin, the protocol records the contribution at 1:1:

```
Supply 1,000 USDC → Protocol records 1,000
Supply 500 USDT  → Protocol records 500
```

Contributions are fungible regardless of which stablecoin was supplied. 1,000 from a USDC supply is identical to 1,000 from a USDT supply.

## Withdrawing stablecoins

Users can withdraw any stablecoin that's available in the protocol's supply:

```
Withdraw 1,000 USDC → Receive 1,000 USDC (if available)
Withdraw 1,000 USDT → Receive 1,000 USDT (if available)
```

If a specific stablecoin isn't available, users can either:
1. Withdraw a different stablecoin that is available
2. Enter the queue to wait for the one they want

## Implementation detail

Internally, the protocol uses a non-transferable ERC-20 called DLRS to track contributions. This is an accounting mechanism—DLRS cannot be transferred, traded, or used outside the protocol.

See [Addresses](/resources/addresses) for contract addresses.
