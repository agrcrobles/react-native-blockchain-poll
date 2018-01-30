# react-native-blockchain-poll

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> This is just in an early stage and can fail.

A simple mobile decentralized app ( dApp ) done as a prototype for [React Native](https://facebook.github.io/react-native/) and [expo](https://expo.io) to handle cryptopunks ranking on the ethereum blockchain.

## Overview

* It's basically a mobile dapp for iOS and android done using `react-native` and `web3`.

* It uses [flow](https://flow.org/) as a javascript typechecker and [babel-preset-react-native-web3](https://github.com/agrcrobles/babel-preset-react-native-web3) to polyfill crypto

## Getting started in localhost
 
Configure `Ropsten Testnet Network` mnemonic key in `App.js`

```bash
# Install dependencies
yarn

# and from a separate shell Run the mobile app
exp start
```

For more information about configuring the cross platform app look into the [React Native](https://facebook.github.io/react-native/docs/getting-started.html) and [expo](https://docs.expo.io/versions/latest/index.html) getting started guides.

### React Native dependencies

* [victory-native](https://formidable.com/open-source/victory/docs/victory-pie/) Victory bar Charts
* [react-navigation](https://github.com/react-community/react-navigation) to navigate among scenes
* among other cool ones such as `react-native-pull-to-refresh`  and `react-native-star-rating`

### Ethereum dependencies

* [web3](https://github.com/ethereum/web3.js) as the Etherum Javascript API
* [truffle-contract](https://github.com/trufflesuite/truffle-contract) to parse the abstraction of the smart contract
* [truffle-hdwallet-provider](https://github.com/trufflesuite/truffle-hdwallet-provider) to sign transactions via a deterministic wallet provider

## Expo

![expo](https://raw.githubusercontent.com/agrcrobles/react-native-blockchain-poll/master/assets/expo.png)

## Sample

![playing with the app](https://raw.githubusercontent.com/agrcrobles/react-native-blockchain-poll/master/assets/sample.gif)

## Ropsten

* Smart Contract - https://ropsten.etherscan.io/address/0x25cee65ac493a0c965f12a2d0c46fe82e09d6d44
* Coinbase - https://ropsten.etherscan.io/address/0x712f06642990a90f151a89990594365c4b32dec5

## More info

* For more info about the ethereum configuration, see the following [gist](https://gist.github.com/agrcrobles/e03151b27ad4753827de227929677db3)

## Contributing

Intended for personal purposes stars ✭ and issue reporting, welcome!

## License

MIT @ zetta