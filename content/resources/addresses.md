---
sidebar_position: 1
title: Contract Addresses
description: Deployed contract addresses
---

# Contract Addresses

## Sepolia Testnet

| Contract | Address |
|----------|---------|
| **DollarStore** | [`0x0D748365aA0A38EBaF6Df0C46f0Ebf2D79837c30`](https://sepolia.etherscan.io/address/0x0D748365aA0A38EBaF6Df0C46f0Ebf2D79837c30) |
| **DLRS** | [`0xe78e2CfC18DaB60dbfEEBd83A7562D241Fc295F0`](https://sepolia.etherscan.io/address/0xe78e2CfC18DaB60dbfEEBd83A7562D241Fc295F0) |

### Supported test stablecoins

| Token | Address |
|-------|---------|
| **USDC** | [`0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`](https://sepolia.etherscan.io/address/0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238) |
| **USDT** | [`0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0`](https://sepolia.etherscan.io/address/0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0) |

## Ethereum Mainnet

:::warning Not Yet Deployed
DollarStore is not yet deployed to mainnet. This section will be updated when mainnet deployment occurs.
:::

## Getting test tokens

For Sepolia testing:

1. Get Sepolia ETH from a faucet for gas
2. Get test USDC from [Circle's Sepolia faucet](https://faucet.circle.com/)
3. Interact with DollarStore on Sepolia

## Interface

The canonical interface is `IDollarStore.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IDollarStore {
    // See Capabilities > Functions for full interface
}
```

Source: [IDollarStore.sol on GitHub](https://github.com/wandering-soupsmith/dollar/blob/main/contracts/src/interfaces/IDollarStore.sol)
