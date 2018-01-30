/* @flow */

import React, { Component } from 'react';

import Contract from 'truffle-contract';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';

import VotingArtifact from '../build/contracts/Voting.json';

import type { CandidateType } from './types';

import { withNavigation } from 'react-navigation';
import { VictoryBar, VictoryChart } from 'victory-native';

const Voting = Contract(VotingArtifact);

type Props = {
	web3: *,
	navigation: *,
};
type State = {
	candidates: Array<CandidateType>,
	isLoading: boolean,
};

class Stats extends Component<Props, State> {
	state = {
		candidates: [],
		isLoading: true,
	};
	componentWillMount() {
		Voting.setProvider(this.props.web3.currentProvider);
	}
	componentDidMount() {
		this.populateCandidates();
	}

	getCandidateBalances: Function;
	getCandidateBalances = () => {
		/* We store the candidate names as bytes32 on the blockchain. We use the
		* handy toUtf8 method to convert from bytes32 to string
		*/
		return new Promise((resolve: Function) => {
			const promiseN = this.state.candidates.map(({ hash }) => {
				return this.getCandidateVote(hash).then(votes => {
					return {
						name: this.props.web3.toUtf8(hash),
						hash,
						x: this.props.web3.toUtf8(hash).substr(0, 2),
						y: parseInt(votes.toString()),
					};
				});
			});
			Promise.all(promiseN).then(candidates => {
				this.setState(
					{
						candidates,
						isLoading: false,
					},
					() => {
						resolve();
					}
				);
			});
		});
	};
	getCandidateVote: Function;
	getCandidateVote = hash => {
		return Voting.deployed()
			.then(zetta => {
				return zetta.totalVotesFor.call(hash);
			})
			.catch(function(e) {
				console.log(e);
				throw e;
			});
	};

	/* Instead of hardcoding the candidates hash, we now fetch the candidate list from
	* the blockchain and populate the array. Once we fetch the candidates, we setup the
	* table in the UI with all the candidates and the votes they have received.
	*/
	populateCandidates: Function;
	populateCandidates = () => {
		return Voting.deployed().then(contractInstance => {
			return contractInstance.allCandidates.call().then(raw => {
				const candidates = raw.map(hash => {
					return {
						name: this.props.web3.toUtf8(hash),
						hash,
						x: this.props.web3.toUtf8(hash).substr(0, 2),
						y: 0,
					};
				});
				this.setState({
					candidates,
				});
			});
		});
	};

	render() {
		if (this.state.isLoading) {
			return (
				<PTRView onRefresh={this.getCandidateBalances}>
					<View style={styles.info}>
						<Text style={[styles.refresh]}>Pull to refresh the stats</Text>
					</View>
				</PTRView>
			);
		}
		return (
			<PTRView onRefresh={this.getCandidateBalances}>
				<View style={styles.header}>
					<Text style={styles.contentTitle}>Stats</Text>
					<Text style={styles.contentSubTitle}>
						The result of the poll is persisted on the blockchain, public and
						everyone can access to it. Gas per vote is 140000, that is
						expensive, but that asures the transaction to be included by miners
						in the next block.
					</Text>
				</View>
				<ScrollView contentContainerStyle={styles.container}>
					<VictoryChart
						domainPadding={10}
						padding={{ top: 30, left: 40, right: 40, bottom: 50 }}
						height={Dimensions.get('window').height - 350}
						animate={{ duration: 2000 }}
					>
						<VictoryBar
							style={{ data: { fill: '#37474F', strokeWidth: 10 } }}
							data={this.state.candidates}
						/>
					</VictoryChart>
				</ScrollView>
			</PTRView>
		);
	}
}
export default withNavigation(Stats);

const styles = StyleSheet.create({
	info: {
		alignItems: 'center',
		paddingVertical: 5,
	},
	refresh: {
		fontSize: 16,
	},
	header: {
		alignItems: 'flex-start',
		padding: 10,
		flexDirection: 'column',
		borderBottomWidth: 1,
		borderBottomColor: '#CCC',
	},
	contentSubTitle: {
		textAlign: 'left',
		color: 'grey',
		fontSize: 13,
		paddingVertical: 5,
	},
	contentTitle: {
		textAlign: 'left',
		paddingTop: 5,
		fontSize: 20,
	},
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
});
