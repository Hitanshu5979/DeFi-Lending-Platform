# DeFi Lending Platform

- [DeFi Lending Platform](#defi-lending-platform)
  - [1. About](#1-about)
  - [2. Project Description](#2-project-description)
  - [3. Smart Contracts](#3-smart-contracts)
  - [4. Install](#4-install)
  - [5. Running Tests](#5-running-tests)
    - [Testing in Ganache](#testing-in-ganache)
  - [6. Deployed Contracts in Ropsten Testnet](#6-deployed-contracts-in-ropsten-testnet)
  - [7. TODO](#7-todo)

## 1. About

This repository contains the source code and dependencies required to deploy a Solidity based VAULT smart contract that securely holds ETH whilst lending STABLE TOKEN to users on Ethereum network.

## 2. Project Description

This project implements a Vault that allows a user to borrow a stable token (pegged to USD) by depositing ether into the Vault as collateral.

The amount of tokens that can be borrowed is derived from the ETH/USD price provided by an on-chain oracle.

The user is allowed to withdraw the collateral after repaying the borrowed tokens.

The amount of collateral available to withdraw depends on the current ETH/USD price provided by the Oracle.

## 3. Smart Contracts
The smart contracts in the project are:

`Vault.sol`

- implements the business logic of the Vault
- exposes 5 main functions

```javascript
deposit(uint256 amountToDeposit) // Allows a user to deposit ETH collateral in exchange for some amount of stablecoin
withdraw(uint256 repaymentAmount)  // Allows a user to withdraw up to 100% of the collateral they have on deposit
getVault(address userAddress) //Returns the details of a vault
estimateCollateralAmount(uint256 repaymentAmount) // Returns an estimate of how much collateral could be withdrawn for a given amount of stablecoin
estimateTokenAmount(uint256 depositAmount) // Returns an estimate on how much stable coin could be minted at the current rate
```

`Coin.sol`

- ERC20 standard token
- implemens `mint` and `burn`

`PriceConsumerV3.sol`

- On chain oracle
- Leverages on chainlink price feed

## 4. Install
Truffle and Ganache are required to deploy and test this project.
Install by them running the following commands in your terminal:

```
$ npm install -g truffle
$ npm install -g ganache-cli
```

Clone the repository and install dependencies:

```
$ npm install
```
*All packages used in package.json*

## 5. Running tests

This project includes a test suite based in Truffle/Mocha.

Tests can be run on local Ganache.

### Testing in Ganache

To run test in Ganache environment, a Ganache instance must be running on port 7545

You can start Ganache by executing the following:
```
$ ganache-cli -p 7545
```

OR

By opening Ganache application and running a workspace in the background

To execute test suite, on a different terminal run:

```
truffle test --network development
```

### Test suite output

The following is the expected test result:

```javascript
Compiling your contracts...
===========================
√ Fetching solc version list from solc-bin. Attempt #1
√ Fetching solc version list from solc-bin. Attempt #1
> Compiling @openzeppelin\contracts\access\Ownable.sol
> Compiling @openzeppelin\contracts\token\ERC20\ERC20.sol
> Compiling @openzeppelin\contracts\token\ERC20\IERC20.sol
> Compiling @openzeppelin\contracts\token\ERC20\extensions\IERC20Metadata.sol
> Compiling @openzeppelin\contracts\utils\Context.sol
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\implementations\Coin.sol
> Compiling .\contracts\implementations\MockOracle.sol
> Compiling .\contracts\implementations\PriceConsumerV3.sol
> Compiling .\contracts\implementations\Vault.sol
> Compiling .\contracts\interfaces\AggregatorV3Interface.sol
> Compiling .\contracts\interfaces\ICoin.sol
> Compiling .\contracts\interfaces\IVault.sol

> Artifacts written to C:\Users\hitan\AppData\Local\Temp\test--18256-CzAM9jgX2mcS
> Compiled successfully using:
   - solc: 0.8.15+commit.e14f2714.Emscripten.clang


  Contract: Vault
    Use Case 1: user deposits ether and receives stablecoin 
      √ should update user Vault collateral with sent Ether
      √ should fire a 'Deposit' event
      √ should update user token balance
      √ should update user Vault debt
      √ should provide a estimated token amount with accuracy > 90%
    Use Case 2: user repays ALL tokens and withdraws ether 
      √ should fire a 'Withdraw' event
      √ user token balance should be zero
      √ user vault debt should be zero
      √ should provide a estimated repayment amount with accuracy > 90%


  9 passing (979ms)
```

## 6. Deployed Contracts in Ropsten Testnet

These contracts have been deployed in Ropsten at the following addresses:

Vault.sol: https://ropsten.etherscan.io/address/0x764e1903b182a79ad32972da97bb0372964709de

Coin.sol: https://ropsten.etherscan.io/address/0x7f4098b7971af70bb65965104938052989237879

PriceConsumerV3.sol: https://ropsten.etherscan.io/address/0xff76a8629617b12602aff3e69d8a5147622bf97d#code

## 7. TODO

- web3 injections deprecated, find a way around
- integrate smart contract functionalities within frontend
- Work on UI/UX

<!-- ## References

https://github.com/llSourcell/lending_dapp.git -->