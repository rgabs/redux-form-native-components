import React, {PropTypes} from 'react';
import {TouchableOpacity} from 'react-native';
import noop from 'lodash/noop';
import callOnce from 'call-once-in-interval';

const Touchable = ({onPress = noop, disabled, children, highlightOpacity, ...extraProps}) => {
  const onpressHandler = callOnce(onPress);
  return (
    <TouchableOpacity {...extraProps} onPress={onpressHandler} disabled={disabled} useForeground={true} activeOpacity={highlightOpacity}>
      {children}
    </TouchableOpacity>
  );
};

Touchable.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  children: PropTypes.node,
  highlightOpacity: PropTypes.number
};

export default Touchable;
