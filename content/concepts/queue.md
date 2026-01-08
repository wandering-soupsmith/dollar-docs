---
sidebar_position: 2
title: The Queue
description: How the FIFO queue system works
---

# The Queue

When a user wants a stablecoin that isn't currently in supply, they can get in line for it. The queue is processed in strict FIFO (First In, First Out) order.

## How it works

Getting in line is simple: specify which stablecoin you want and how much. Your spot is held until either:
- The stablecoin becomes available and you receive it
- You leave the line

If you leave, you can withdraw any available stablecoin instantly. If you want to get back in line, you go to the back.

```
Queue for USDC:
  Position 1: Alice wants 500 USDC
  Position 2: Bob wants 1,000 USDC
  Position 3: Carol wants 200 USDC

Someone supplies 800 USDC:
  → Alice receives 500 USDC (leaves queue)
  → Bob receives 300 USDC (still in line for 700 more)
  → Carol still waiting

Queue for USDC (after):
  Position 1: Bob wants 700 USDC
  Position 2: Carol wants 200 USDC
```

## Partial fills

Positions can be partially filled. When this happens:
- The user receives the partial amount immediately
- The position remains in queue for the rest
- The `QueueFilled` event shows both filled and remaining amounts

## Leaving the queue

Users can leave the queue at any time:

```solidity
dollarStore.cancelQueue(positionId);
```

After leaving, users can immediately withdraw any stablecoin that's available in supply. If they want to get back in line for a specific stablecoin, they join at the back.

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
