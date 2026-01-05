---
sidebar_position: 3
title: FAQ
description: Frequently asked questions
---

# FAQ

## General

### What is DollarStore?

DollarStore is a zero-fee stablecoin swap protocol. It lets you swap between stablecoins (USDC, USDT) at exactly 1:1, with no slippage and no fees.

### What's the catch?

Time. If reserves are available, swaps are instant. If not, you wait in a queue until someone deposits what you need.

### Why would I use this instead of Uniswap?

If you're swapping stablecoins and care more about price than speed. On a DEX, you lose 0.01-0.3% to slippage and fees. On DollarStore, you get exactly 1:1.

### Is there a token?

Yes, DLRS. But it's not a governance token—it's a receipt token that represents your claim on the reserve pool. You can't buy it; you get it by depositing stablecoins.

---

## Using DollarStore

### How do I swap USDC for USDT?

1. Approve DollarStore to spend your USDC
2. Call `swap(USDC, USDT, amount, true)`
3. Receive USDT instantly (if reserves available) or join queue

### What happens if reserves are empty?

You have options:
- Queue for what you want (wait for deposits)
- Receive DLRS instead (redeem later for any stablecoin)
- Revert the transaction (aggregator mode only)

### How long will I wait in queue?

Depends entirely on when someone deposits the stablecoin you want. Could be seconds, could be days. The queue is processed automatically whenever deposits arrive.

### Can I cancel my queue position?

Yes. Call `cancelQueue(positionId)` to exit the queue and receive your DLRS back.

### What if my position is partially filled?

You receive partial fills as they happen (as stablecoin), and your position updates to reflect the remaining amount. When you cancel, you get back any unfilled DLRS.

---

## DLRS Token

### What is DLRS?

DLRS is a receipt token. When you deposit 1,000 USDC, you receive 1,000 DLRS. It represents a 1:1 claim on the reserve pool.

### Can I trade DLRS?

It's an ERC-20 token, so technically yes. But it's designed as a receipt token, not a speculative asset.

### Is DLRS always worth $1?

DLRS is redeemable 1:1 for any supported stablecoin (subject to reserve availability). Its value depends on the underlying stablecoins maintaining their peg.

---

## For integrators

### How do I integrate DollarStore as an aggregator?

1. Call `getSwapQuote(from, to, amount)` to check fillability
2. If quote > 0, call `swapExactInput(...)` to execute
3. If quote = 0, route elsewhere

### Does `swapExactInput` ever partially fill?

No. It either fills completely or reverts. This makes aggregator integration predictable.

### What's the gas cost?

Varies by operation and queue state. Rough estimates:
- Simple swap (no queue): ~100k gas
- Swap that fills queue positions: ~100k + ~50k per position filled
- Join queue: ~150k gas

---

## Technical

### What chains is DollarStore on?

Currently Sepolia testnet only. Mainnet deployment TBD.

### Is the contract upgradeable?

No. The contract is immutable.

### Has it been audited?

No. Use at your own risk.

### Where's the source code?

[github.com/wandering-soupsmith/dollar](https://github.com/wandering-soupsmith/dollar)
