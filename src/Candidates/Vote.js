/* @flow */

import React, { Component } from 'react';

import Star from './Star';

import type { CandidateType } from '../types';
import { Alert, Linking } from 'react-native';

class Container extends Component<{
	Voting: *,
	web3: *,
	candidate: CandidateType,
}> {
	onPress = (candidate: *, star: *): void => {
		const { Voting } = this.props;
		Alert.alert(
			'Vote has been submitted.',
			'The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.',
			[
				{
					text: 'OK',
					onPress: () => {
						new Promise((resolve: *) => {
							this.props.web3.eth.getAccounts((error, result) => {
								if (error) {
									return console.error(error);
								}
								Voting.deployed().then(contractInstance => {
									return contractInstance
										.voteForCandidate(candidate, star, {
											// configure here the priority of the vote
											gas: 140000,
											// using coinbase
											from: result[0],
										})
										.then(result => {
											Alert.alert(
												'Great Choice!',
												'Yeah, thanks for voting, it has been submitted to the blockchain...',
												[
													{
														text: 'Transaction',
														onPress: () => {
															Linking.openURL(
																'https://ropsten.etherscan.io/address/0x9004c442d310e9c3acc52500c897a9daf80794a8'
															);
															resolve();
														},
													},
													{
														text: 'OK',
														onPress: () => {
															resolve();
															console.log('ok!');
														},
													},
												],
												{ cancelable: false }
											);
										})
										.catch(err => {
											Alert.alert(
												'Configure coinbase account before voting',
												err.toString()
											);
										});
								});
							});
						});
					},
				},
			]
		);
	};
	render() {
		const { candidate } = this.props;
		return <Star onPress={args => this.onPress(candidate.hash, args)} />;
	}
}

export default Container;
