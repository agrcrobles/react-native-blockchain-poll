/* @flow */

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	Linking,
} from 'react-native';
import Vote from './Vote';
import type { CandidateType } from '../types';

export default class Item extends PureComponent<{
	candidate: CandidateType,
	Voting: *,
	web3: *,
}> {
	render() {
		const { candidate, Voting, web3 } = this.props;
		return (
			<View style={styles.main}>
				<View style={styles.icon}>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								`https://www.larvalabs.com/cryptopunks/details/${
									candidate.index
								}`
							)
						}
					>
						<Image
							style={styles.image}
							source={{
								uri: `https://www.larvalabs.com/cryptopunks/cryptopunk${
									candidate.index
								}.png`,
							}}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<View style={styles.rowContent}>
						<Text style={styles.rowContentTitle}>{candidate.name}</Text>
						<Text style={styles.rowContentSubTitle}>
							CryptoPunk #{candidate.index}
						</Text>
					</View>
					<Vote web3={web3} Voting={Voting} candidate={candidate} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	caption: {
		fontSize: 18,
		color: 'grey',
	},
	icon: {
		paddingHorizontal: 10,
	},
	rowContentSubTitle: {
		color: 'grey',
	},
	rowContentTitle: {
		fontSize: 16,
	},
	rowContent: {
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	image: { width: 40, height: 40, borderRadius: 20 },
	main: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		marginVertical: 2,
	},
	votes: {
		fontSize: 16,
		marginHorizontal: 5,
		color: 'yellow',
	},
	row: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		alignItems: 'center',
		flex: 1,
		borderBottomColor: '#CCC',
		justifyContent: 'space-between',
	},
});
