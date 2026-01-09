---
sidebar_position: 2
title: Functions
description: Complete function reference for DollarStore
---

# Functions

## Core functions

### deposit

Supply a stablecoin to the protocol. The system records DLRS at 1:1.

```solidity
function deposit(
    address stablecoin,
    uint256 amount
) external returns (uint256 dlrsMinted)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `stablecoin` | address | Supported stablecoin to supply |
| `amount` | uint256 | Amount to supply (6 decimals) |

**Returns:** Amount of DLRS recorded (always equals `amount`)

**Effects:**
- Protocol transfers `stablecoin` from caller
- Processes queue for that stablecoin (fills waiting positions)
- Adds remainder to reserves
- Records DLRS for caller

**Reverts if:**
- `amount` is 0
- `stablecoin` not supported
- Transfer fails

---

### withdraw

Request a stablecoin from supply. Uses DLRS at 1:1.

```solidity
function withdraw(
    address stablecoin,
    uint256 amount
) external returns (uint256 stablecoinReceived)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `stablecoin` | address | Stablecoin to request |
| `amount` | uint256 | Amount to request (6 decimals) |

**Returns:** Amount of stablecoin received (always equals `amount`)

**Reverts if:**
- `amount` is 0
- `stablecoin` not supported
- Insufficient supply
- Caller has insufficient DLRS

---

## Swap functions

### swap

Swap one stablecoin for another, with optional queue fallback.

```solidity
function swap(
    address fromStablecoin,
    address toStablecoin,
    uint256 amount,
    bool queueIfUnavailable
) external returns (uint256 received, uint256 positionId)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `fromStablecoin` | address | Input stablecoin |
| `toStablecoin` | address | Output stablecoin |
| `amount` | uint256 | Amount to swap |
| `queueIfUnavailable` | bool | If true, queue unfilled portion; if false, record DLRS |

**Returns:**
- `received`: Amount filled instantly
- `positionId`: Queue position ID (0 if fully filled or not queued)

---

### swapFromDLRS

Request a stablecoin using DLRS.

```solidity
function swapFromDLRS(
    address toStablecoin,
    uint256 dlrsAmount,
    bool queueIfUnavailable
) external returns (uint256 received, uint256 positionId)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `toStablecoin` | address | Output stablecoin |
| `dlrsAmount` | uint256 | Amount of DLRS to use |
| `queueIfUnavailable` | bool | If true, queue unfilled portion |

---

### swapExactInput

Aggregator-optimized swap. Never queues—either fully executes or reverts.

```solidity
function swapExactInput(
    address fromStablecoin,
    address toStablecoin,
    uint256 amountIn,
    uint256 minAmountOut,
    address recipient,
    uint256 deadline
) external returns (uint256 amountOut)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `fromStablecoin` | address | Input stablecoin |
| `toStablecoin` | address | Output stablecoin |
| `amountIn` | uint256 | Exact input amount |
| `minAmountOut` | uint256 | Minimum acceptable output (slippage protection) |
| `recipient` | address | Where to send output tokens |
| `deadline` | uint256 | Unix timestamp deadline |

**Returns:** Exact output amount (equals `amountIn` for 1:1)

**Reverts if:**
- Deadline passed
- Insufficient supply (no partial fills)
- Any validation fails

---

## Queue functions

### joinQueue

Enter the queue for a stablecoin. Commits DLRS to the protocol.

```solidity
function joinQueue(
    address stablecoin,
    uint256 dlrsAmount
) external returns (uint256 positionId)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `stablecoin` | address | Stablecoin to wait for |
| `dlrsAmount` | uint256 | Amount of DLRS to commit |

**Returns:** Unique position ID

**Reverts if:**
- Queue is full (150 positions max)
- Below minimum order size
- Insufficient DLRS balance

---

### cancelQueue

Cancel a queue position. Protocol returns DLRS.

```solidity
function cancelQueue(
    uint256 positionId
) external returns (uint256 dlrsReturned)
```

**Returns:** DLRS returned (may be less than original if partially filled)

**Reverts if:**
- Position doesn't exist
- Caller doesn't own position

---

## View functions

### getSwapQuote

Get expected output for a swap. Used by aggregators to check fillability.

```solidity
function getSwapQuote(
    address fromStablecoin,
    address toStablecoin,
    uint256 amountIn
) external view returns (uint256 amountOut)
```

**Returns:** `amountIn` if fully fillable, `0` if not. Never returns partial amounts.

---

### getReserves

Get all reserve balances.

```solidity
function getReserves() external view returns (
    address[] memory stablecoins,
    uint256[] memory amounts
)
```

---

### getReserve

Get reserve for a specific stablecoin.

```solidity
function getReserve(address stablecoin) external view returns (uint256)
```

---

### getQueueDepth

Get total DLRS waiting in a queue.

```solidity
function getQueueDepth(address stablecoin) external view returns (uint256)
```

---

### getQueuePositionCount

Get number of positions in a queue.

```solidity
function getQueuePositionCount(address stablecoin) external view returns (uint256)
```

---

### getQueuePosition

Get details of a queue position.

```solidity
function getQueuePosition(uint256 positionId) external view returns (
    address owner,
    address stablecoin,
    uint256 amount,
    uint256 timestamp
)
```

---

### getUserQueuePositions

Get all position IDs for a user.

```solidity
function getUserQueuePositions(address user) external view returns (uint256[] memory)
```

---

### getMinimumOrderSize

Get minimum order size for a queue based on current depth.

```solidity
function getMinimumOrderSize(address stablecoin) external view returns (uint256)
```

---

### supportedStablecoins

Get all supported stablecoin addresses.

```solidity
function supportedStablecoins() external view returns (address[] memory)
```

---

### isSupported

Check if a stablecoin is supported.

```solidity
function isSupported(address stablecoin) external view returns (bool)
```

---

### dlrsToken

Get the DLRS contract address.

```solidity
function dlrsToken() external view returns (address)
```
