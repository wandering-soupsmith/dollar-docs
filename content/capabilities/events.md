---
sidebar_position: 3
title: Events
description: Events emitted by DollarStore
---

# Events

## Core events

### Deposit

Emitted when a user deposits a stablecoin.

```solidity
event Deposit(
    address indexed user,
    address indexed stablecoin,
    uint256 amount,
    uint256 dlrsMinted
);
```

| Parameter | Description |
|-----------|-------------|
| `user` | Address that deposited |
| `stablecoin` | Stablecoin deposited |
| `amount` | Amount deposited |
| `dlrsMinted` | DLRS minted (equals amount) |

---

### Withdraw

Emitted when a user withdraws a stablecoin.

```solidity
event Withdraw(
    address indexed user,
    address indexed stablecoin,
    uint256 amount,
    uint256 dlrsBurned
);
```

| Parameter | Description |
|-----------|-------------|
| `user` | Address that withdrew |
| `stablecoin` | Stablecoin withdrawn |
| `amount` | Amount withdrawn |
| `dlrsBurned` | DLRS burned (equals amount) |

---

## Swap events

### Swap

Emitted on any swap operation.

```solidity
event Swap(
    address indexed user,
    address indexed fromStablecoin,
    address indexed toStablecoin,
    uint256 amountIn,
    uint256 amountOut,
    uint256 amountQueued
);
```

| Parameter | Description |
|-----------|-------------|
| `user` | Address that swapped |
| `fromStablecoin` | Input token (or DLRS address for swapFromDLRS) |
| `toStablecoin` | Output token |
| `amountIn` | Total input amount |
| `amountOut` | Amount received instantly |
| `amountQueued` | Amount sent to queue (0 if fully filled) |

---

## Queue events

### QueueJoined

Emitted when a user joins a queue.

```solidity
event QueueJoined(
    uint256 indexed positionId,
    address indexed user,
    address indexed stablecoin,
    uint256 amount,
    uint256 timestamp
);
```

| Parameter | Description |
|-----------|-------------|
| `positionId` | Unique position identifier |
| `user` | Address that joined |
| `stablecoin` | Stablecoin being waited for |
| `amount` | DLRS locked |
| `timestamp` | When position was created |

---

### QueueCancelled

Emitted when a user cancels their queue position.

```solidity
event QueueCancelled(
    uint256 indexed positionId,
    address indexed user,
    uint256 amountReturned
);
```

| Parameter | Description |
|-----------|-------------|
| `positionId` | Position that was cancelled |
| `user` | Position owner |
| `amountReturned` | DLRS returned (may be less if partially filled) |

---

### QueueFilled

Emitted when a queue position receives funds (full or partial).

```solidity
event QueueFilled(
    uint256 indexed positionId,
    address indexed user,
    address indexed stablecoin,
    uint256 amountFilled,
    uint256 amountRemaining
);
```

| Parameter | Description |
|-----------|-------------|
| `positionId` | Position that was filled |
| `user` | Position owner |
| `stablecoin` | Stablecoin received |
| `amountFilled` | Amount filled in this transaction |
| `amountRemaining` | Amount still waiting (0 if fully filled) |

---

## Admin events

### StablecoinAdded

Emitted when a stablecoin is added to supported list.

```solidity
event StablecoinAdded(address indexed stablecoin);
```

---

### StablecoinRemoved

Emitted when a stablecoin is removed from supported list.

```solidity
event StablecoinRemoved(address indexed stablecoin);
```

---

### AdminTransferInitiated

Emitted when admin transfer is initiated.

```solidity
event AdminTransferInitiated(
    address indexed currentAdmin,
    address indexed pendingAdmin
);
```

---

### AdminTransferCompleted

Emitted when admin transfer is accepted.

```solidity
event AdminTransferCompleted(
    address indexed previousAdmin,
    address indexed newAdmin
);
```
