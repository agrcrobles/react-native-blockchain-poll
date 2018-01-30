/* @flow */

import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export default class Container extends PureComponent<{
	children?: any,
}> {
	render() {
		return (
			<View style={styles.Container}>
				<View style={styles.Header}>
					<MaterialIcons name="cast-connected" size={64} color={'#80CBC4'} />
				</View>
				<View style={styles.titleContainer}>
					<Text style={[styles.title]}>Star your favorite crypto punk</Text>
				</View>
				{this.props.children}
				<View style={styles.footerContainer}>
					<Text style={[styles.footer]}>MIT License @ zetta</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	Container: {
		flex: 1,
	},
	Header: {
		paddingTop: 40,
		paddingBottom: 20,
		paddingHorizontal: 12,
		backgroundColor: '#37474f',
		alignItems: 'center',
	},
	titleContainer: {
		paddingHorizontal: 12,
		paddingVertical: 5,
		backgroundColor: '#62727b',
	},
	footerContainer: {
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: '#333',
	},
	title: {
		alignItems: 'center',
		fontSize: 14,
		paddingVertical: 5,
		color: 'white',
	},
	footer: {
		alignItems: 'center',
		fontSize: 12,
		paddingVertical: 5,
		color: 'white',
	},
});
