/* @flow */

import React, { Component } from 'react';
import CandidateList from './CandidateList';

import Contract from 'truffle-contract';
import { View, StyleSheet } from 'react-native';

import type { CandidateType } from '../types';

import VotingArtifact from '../../build/contracts/Voting.json';

const Voting = Contract(VotingArtifact);

const styles = StyleSheet.create({
	box: { flex: 1 },
	spacer: { flex: 1 },
});

type Props = {
	web3: *,
};
type State = {
	candidates: Array<CandidateType>,
};
class Main extends Component<Props, State> {
	state = {
		candidates: [],
	};
	componentWillMount() {
		Voting.setProvider(this.props.web3.currentProvider);
	}
	componentDidMount() {
		this.populateCandidates();
	}

	/* Instead of hardcoding the candidates hash, we now fetch the candidate list from
	* the blockchain and populate the array. Once we fetch the candidates, we setup the
	* table in the UI with all the candidates and the votes they have received.
	*/
	populateCandidates: Function;
	populateCandidates = () => {
		return Voting.deployed().then(contractInstance => {
			return contractInstance.allCandidates.call().then(raw => {
				const candidates = raw.map((hash, index) => {
					return {
						hash,
						name: this.props.web3.toUtf8(hash),
						index,
					};
				});
				this.setState({
					candidates,
				});
			});
		});
	};

	render() {
		return (
			<View style={styles.box}>
				<CandidateList
					web3={this.props.web3}
					Voting={Voting}
					candidates={this.state.candidates}
				/>
				<View style={styles.spacer} />
			</View>
		);
	}
}

export default Main;
