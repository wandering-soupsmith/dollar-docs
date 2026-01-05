---
sidebar_position: 2
title: The Queue
description: How the FIFO queue system works
---

# The Queue

When you want a stablecoin that isn't available in reserves, you join a queue. The queue is processed in strict FIFO (First In, First Out) order.

## Joining the queue

To join a queue, you lock DLRS as escrow:

```solidity
// Lock 1,000 DLRS to wait for 1,000 USDC
uint256 positionId = dollarStore.joinQueue(USDC_ADDRESS, 1000e6);
```

Your DLRS is burned when you join. If the position is filled, you receive the stablecoin. If you cancel, your DLRS is minted back.

## Queue processing

When someone deposits a stablecoin, the queue for that stablecoin is processed automatically:

1. The first position in queue receives funds (or partial fill)
2. If fully filled, the position is removed
3. Process continues until deposit is exhausted or queue is empty
4. Any remainder goes to reserves

```
Queue for USDC (before deposit):
  Position 1: Alice wants 500 USDC
  Position 2: Bob wants 1,000 USDC
  Position 3: Carol wants 200 USDC

Someone deposits 800 USDC:
  → Alice receives 500 USDC (position removed)
  → Bob receives 300 USDC (position updated to 700 remaining)
  → Carol still waiting

Queue for USDC (after deposit):
  Position 1: Bob wants 700 USDC (partially filled)
  Position 2: Carol wants 200 USDC
```

## Partial fills

Positions can be partially filled. When this happens:
- You receive the partial amount immediately
- Your position remains in queue for the rest
- The `QueueFilled` event shows both filled and remaining amounts

## Queue limits

| Parameter | Value | Purpose |
|-----------|-------|---------|
| Max positions | 150 | Prevents unbounded gas costs |
| Min order (base) | $100 | Prevents spam at low queue depth |
| Min order scaling | 10x per 25 positions | Higher minimums as queue grows |

### Minimum order scaling

The minimum order size increases as the queue gets deeper:

| Queue positions | Minimum order |
|-----------------|---------------|
| 0-24 | $100 |
| 25-49 | $1,000 |
| 50-74 | $10,000 |
| 75-99 | $100,000 |
| 100-124 | $1,000,000 |
| 125-149 | $10,000,000 |

This prevents queue spam and ensures positions are meaningful at scale.

## Canceling a position

You can cancel your queue position at any time:

```solidity
uint256 dlrsReturned = dollarStore.cancelQueue(positionId);
```

If your position was partially filled, you receive the remaining DLRS (not the already-filled portion, which you already received as stablecoin).
