/* @flow */

import React, { PureComponent } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import type { CandidateType } from '../types';

import Item from './Item';
type Props = {
	candidates: Array<CandidateType>,
	Voting: *,
	web3: *,
};

export default class CandidateList extends PureComponent<Props> {
	render() {
		return (
			<ScrollView>
				{this.props.candidates && this.props.candidates.length > 0 ? (
					this.props.candidates.map(candidate => (
						<Item
							web3={this.props.web3}
							key={candidate.hash}
							Voting={this.props.Voting}
							candidate={candidate}
						/>
					))
				) : (
					<ActivityIndicator size="large" color="#000" />
				)}
			</ScrollView>
		);
	}
}
