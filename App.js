/* @flow */
import * as React from 'react';
// $FlowFixMe
import 'babel-preset-react-native-web3/globals';

import HDWalletProvider from 'truffle-hdwallet-provider';

import { createMaterialTopTabNavigator } from 'react-navigation';

import Web3 from 'web3';

import Main from './src/Candidates/Main';
import Container from './src/Container';
import Stats from './src/Stats';

import truffleConfig from './truffle';

const network = truffleConfig.networks.ropsten;
const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/`;

const mnemonic = 'YOUR_MNEMONIC_HERE'; // 12 word mnemonic

const web3Provider = new HDWalletProvider(mnemonic, TESTRPC_ADDRESS);

const web3 = new Web3(web3Provider);

class MainScreen extends React.PureComponent<{}> {
	static navigationOptions = {
		tabBarVisible: false,
	};
	render() {
		return <Main web3={web3} />;
	}
}

class SetupScreen extends React.PureComponent<{}> {
	static navigationOptions = {
		tabBarVisible: false,
	};
	render() {
		return <Stats web3={web3} />;
	}
}

export default class App extends React.PureComponent<{}> {
	render() {
		return (
			<Container>
				<AppNavigation />
			</Container>
		);
	}
}
const AppNavigation = createMaterialTopTabNavigator(
	{
		Main: { screen: MainScreen },
		Setup: { screen: SetupScreen },
	},
	{
		animationEnabled: true,
		swipeEnabled: true,
	}
);
