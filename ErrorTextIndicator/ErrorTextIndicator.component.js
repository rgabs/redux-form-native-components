import React, {PropTypes} from 'react';
import {View, Text} from 'react-native';
import styles from './ErrorTextIndicator.styles';

const ErrorTextIndicator = ({text, ...extraProps}) => (<View style={styles.errorContainer}>
  <Text {...extraProps} style={styles.errorText}>{text}</Text>
</View>);

ErrorTextIndicator.propTypes = {
  text: PropTypes.string
};
export default ErrorTextIndicator;
