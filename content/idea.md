---
slug: /
sidebar_position: 1
title: Idea
description: Understanding the DollarStore protocol
---

# The Idea

> **1:1 stablecoin swaps, executed by autonomous smart contracts.**

Users can swap USDC for USDT at exactly 1:1. No slippage. No fees.

When supply is available, swaps execute instantly. Users can always withdraw any stablecoin that's in supply—no restrictions, no waiting. The only time users queue is when requesting a specific stablecoin that isn't currently available.

## Why this matters

Stablecoins are supposed to be worth $1. Yet swapping between them on a DEX costs 0.01-0.3% in slippage and fees. On a $1M swap, that's up to $3,000 lost to solve a problem that doesn't exist—price discovery between identical values.

Large swaps on AMMs require splitting orders, monitoring execution, and managing slippage—complexity that adds time and risk. The DollarStore protocol is simpler: exact 1:1, single transaction, no slippage management.

## Who this is for

- **Aggregators** integrating stablecoin routes (1inch, CowSwap, 0x)
- **Protocols** needing predictable stablecoin conversion
- **Anyone** moving stablecoins at scale
