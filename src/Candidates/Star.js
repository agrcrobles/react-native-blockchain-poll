/* @flow */

import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';

class Star extends Component<
	{
		onPress: (rating: string) => void,
	},
	{
		starCount: number,
	}
> {
	state = {
		starCount: 0,
	};
	onStarRatingPress: Function;
	onStarRatingPress = rating => {
		if (this.state.starCount !== 0) {
			return;
		}
		this.setState({
			starCount: rating,
		});
		this.props.onPress(rating);
	};
	render() {
		return (
			<View style={styles.container}>
				<StarRating
					maxStars={1}
					starSize={26}
					starColor={'#e3ce00'}
					rating={this.state.starCount}
					selectedStar={this.onStarRatingPress}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		width: 50,
		marginHorizontal: 5,
	},
});
export default Star;
