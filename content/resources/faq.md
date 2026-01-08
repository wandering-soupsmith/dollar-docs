---
sidebar_position: 3
title: FAQ
description: Frequently asked questions
---

# FAQ

## General

### What is DollarStore?

DollarStore is open-source smart contract software that enables zero-fee stablecoin swaps. Users can swap between stablecoins (USDC, USDT) at exactly 1:1, with no slippage and no fees.

### What's the catch?

Time. If reserves are available, the protocol executes swaps instantly. If not, users wait in a queue until someone supplies what they need.

### Why use this instead of Uniswap?

For users swapping stablecoins who care more about price than speed. On a DEX, users lose 0.01-0.3% to slippage and fees. The DollarStore protocol executes at exactly 1:1.

### Is there a token?

DLRS is an internal accounting reference used by the protocol to track liquidity contributions. It's not a governance token, stablecoin, or tradeable asset. Users receive DLRS when supplying stablecoins to the protocol.

---

## Using the Protocol

### How do I swap USDC for USDT?

1. Approve the DollarStore contract to spend USDC
2. Call `swap(USDC, USDT, amount, true)`
3. Protocol transfers USDT instantly (if reserves available) or adds user to queue

### What happens if reserves are empty?

Users have options:
- Queue for what's needed (wait for others to supply)
- Receive DLRS instead (use later within the protocol)
- Revert the transaction (aggregator mode only)

### How long will I wait in queue?

Depends entirely on when someone supplies the stablecoin needed. Could be seconds, could be days. The queue is processed automatically whenever supplies arrive.

### Can I cancel my queue position?

Yes. Calling `cancelQueue(positionId)` exits the queue. The protocol returns the DLRS.

### What if my position is partially filled?

Users receive partial fills as they happen (as stablecoin), and the position updates to reflect the remaining amount. When canceled, the protocol returns any unfilled DLRS.

---

## DLRS

### What is DLRS?

DLRS is a non-transferable, internal accounting reference used by the DollarStore protocol. When a user supplies 1,000 USDC, the system records 1,000 DLRS. It tracks contributions to the liquidity pool.

### Can I transfer or trade DLRS?

No. DLRS is non-transferable. Calls to `transfer()`, `transferFrom()`, and `approve()` revert with `NonTransferable()`. It exists solely as an internal accounting mechanism.

### What can I do with DLRS?

DLRS can be used within the protocol to request stablecoins from reserves or enter the queue.

---

## For integrators

### How do aggregators integrate DollarStore?

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

### What chains is the protocol on?

The contracts are currently deployed on Sepolia testnet only.

### Is the contract upgradeable?

No. The contract is immutable.

### Has it been audited?

No. Use at your own risk.

### Where's the source code?

[github.com/wandering-soupsmith/dollar](https://github.com/wandering-soupsmith/dollar)
