---
sidebar_position: 4
title: Errors
description: Error conditions and how to handle them
---

# Errors

The DollarStore protocol uses custom errors for gas-efficient reverts with clear failure reasons.

## Validation errors

### StablecoinNotSupported

```solidity
error StablecoinNotSupported(address stablecoin);
```

The stablecoin address is not in the supported list. Check `isSupported()` before calling.

---

### StablecoinAlreadySupported

```solidity
error StablecoinAlreadySupported(address stablecoin);
```

Admin tried to add a stablecoin that's already supported.

---

### ZeroAmount

```solidity
error ZeroAmount();
```

Amount parameter was 0. All operations require non-zero amounts.

---

### ZeroAddress

```solidity
error ZeroAddress();
```

Address parameter was the zero address.

---

### SameStablecoin

```solidity
error SameStablecoin();
```

Swap attempted with same input and output stablecoin.

---

## Reserve errors

### InsufficientReserves

```solidity
error InsufficientReserves(
    address stablecoin,
    uint256 requested,
    uint256 available
);
```

Not enough reserves for a withdrawal. Check `getReserve()` first, or use swap with queue option.

---

### InsufficientReservesNoQueue

```solidity
error InsufficientReservesNoQueue(
    address stablecoin,
    uint256 requested,
    uint256 available
);
```

Aggregator swap (`swapExactInput`) failed due to insufficient reserves. This function never queues—it either fully executes or reverts.

**For aggregators:** Check `getSwapQuote()` returns non-zero before calling `swapExactInput`.

---

### InsufficientDlrsBalance

```solidity
error InsufficientDlrsBalance(
    uint256 required,
    uint256 available
);
```

User doesn't have enough DLRS for the operation.

---

## Queue errors

### QueueFull

```solidity
error QueueFull(
    address stablecoin,
    uint256 currentCount
);
```

Queue has reached maximum capacity (150 positions). Wait for positions to be filled or try later.

---

### QueuePositionNotFound

```solidity
error QueuePositionNotFound(uint256 positionId);
```

The position ID doesn't exist (never created or already removed).

---

### NotPositionOwner

```solidity
error NotPositionOwner(
    uint256 positionId,
    address caller,
    address owner
);
```

Caller tried to cancel a position they don't own.

---

### OrderTooSmall

```solidity
error OrderTooSmall(
    uint256 provided,
    uint256 minimum
);
```

Order amount is below the minimum for current queue depth. Check `getMinimumOrderSize()` for the current minimum.

---

## Aggregator errors

### DeadlineExpired

```solidity
error DeadlineExpired(
    uint256 deadline,
    uint256 currentTime
);
```

The `swapExactInput` deadline has passed. Transaction was either delayed or deadline was set too tight.

---

## Admin errors

### OnlyAdmin

```solidity
error OnlyAdmin();
```

Function restricted to admin. Caller is not the current admin.

---

### OnlyPendingAdmin

```solidity
error OnlyPendingAdmin();
```

Only the pending admin can accept admin transfer.

---

## Token errors

### NonTransferable

```solidity
error NonTransferable();
```

DLRS transfers are not permitted. DLRS is a non-transferable internal accounting reference. This error is thrown when calling `transfer()`, `transferFrom()`, or `approve()` on the DLRS contract.

---

## Handling errors

### In Solidity

```solidity
try dollarStore.swap(from, to, amount, false) returns (uint256 received, uint256 positionId) {
    // Success
} catch (bytes memory reason) {
    // Decode and handle specific errors
}
```

### In ethers.js/viem

Custom errors are decoded automatically. Check the error name:

```typescript
try {
    await dollarStore.swap(from, to, amount, false);
} catch (error) {
    if (error.errorName === 'InsufficientReserves') {
        const { stablecoin, requested, available } = error.errorArgs;
        // Handle insufficient reserves
    }
}
```
