---
sidebar_position: 1
title: DLRS Token
description: The receipt token that represents claims on the reserve pool
---

# DLRS Token

DLRS is a receipt token that represents a 1:1 claim on the DollarStore reserve pool.

## How it works

When you deposit a stablecoin into DollarStore, you receive DLRS at a 1:1 ratio:

```
Deposit 1,000 USDC → Receive 1,000 DLRS
Deposit 500 USDT  → Receive 500 DLRS
```

DLRS is fungible regardless of which stablecoin was deposited. 1,000 DLRS from a USDC deposit is identical to 1,000 DLRS from a USDT deposit.

## Redeeming DLRS

DLRS can be redeemed for any supported stablecoin, subject to reserve availability:

```
Burn 1,000 DLRS → Receive 1,000 USDC (if reserves available)
Burn 1,000 DLRS → Receive 1,000 USDT (if reserves available)
```

If reserves are insufficient, you can either:
1. Join the queue and wait for deposits
2. Receive a different stablecoin that has reserves

## Technical details

| Property | Value |
|----------|-------|
| Standard | ERC-20 |
| Decimals | 6 (matches USDC/USDT) |
| Minting | Only by DollarStore contract |
| Burning | Only by DollarStore contract |

DLRS cannot be minted or burned by anyone except the DollarStore contract. This ensures the 1:1 backing is always maintained.

## Contract

See [Addresses](/resources/addresses) for the deployed DLRS token address.
