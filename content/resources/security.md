---
sidebar_position: 2
title: Security
description: Security considerations and trust assumptions
---

# Security

:::danger Unaudited Software
DollarStore has **not been audited**. Use at your own risk. Do not deposit funds you cannot afford to lose.
:::

## Trust assumptions

### What you trust

1. **The admin**: Can add/remove supported stablecoins, pause the contract, and transfer admin role
2. **The smart contract code**: Has not been formally verified or audited
3. **Underlying stablecoins**: DollarStore assumes USDC/USDT maintain their peg

### What you don't need to trust

1. **Price feeds**: No oracles—1:1 is hardcoded
2. **Liquidity providers**: No LPs, no impermanent loss
3. **Governance**: No token, no voting, no time-delayed changes (except admin transfer)

## Security measures

### In the contract

- **ReentrancyGuard**: All state-changing functions protected
- **SafeERC20**: Safe token transfer handling
- **Pausable**: Admin can pause in emergencies
- **Two-step admin transfer**: Prevents accidental admin loss
- **Checks-effects-interactions**: State changes before external calls

### Queue protections

- **Max 150 positions**: Bounded gas costs
- **Minimum order scaling**: Prevents dust spam
- **FIFO ordering**: No manipulation of queue order

## Known limitations

### Reserves can be depleted

If everyone wants the same stablecoin, reserves deplete and users queue. This is by design—the tradeoff is time, not price.

### No partial fill protection for `swapExactInput`

The aggregator function either fully fills or reverts. No slippage protection is needed since rate is always 1:1, but reserves can deplete between quote and execution.

### Queue position value can change

If you're in queue and the stablecoin depegs, your position is still denominated in that stablecoin. DollarStore doesn't handle depeg scenarios.

### Admin has significant power

The admin can:
- Add/remove stablecoins
- Pause all operations
- Transfer admin role

The admin cannot:
- Access user funds directly
- Change the 1:1 rate
- Skip queue positions
- Mint DLRS arbitrarily

## Bug bounty

No formal bug bounty program exists yet. If you find a vulnerability, please report responsibly to the team.

## Recommended practices

1. **Start small**: Test with small amounts first
2. **Verify addresses**: Always verify contract addresses from official sources
3. **Monitor positions**: Watch your queue positions for fills
4. **Understand the risks**: This is experimental software
