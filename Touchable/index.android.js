import React, {PropTypes} from 'react';
import {TouchableNativeFeedback, View, Platform} from 'react-native';
import callOnce from 'call-once-in-interval';
import noop from 'lodash/noop';

const Touchable = ({onPress = noop, disabled, children, highlightColor = '#ededed', ...extraProps}) => {
  const foregroundRippleSupport = TouchableNativeFeedback.canUseNativeForeground();
  const onpressHandler = callOnce(onPress);
  const background = (Platform.Version >= 21) ? TouchableNativeFeedback.Ripple(highlightColor) : TouchableNativeFeedback.SelectableBackground();
  return (
    <TouchableNativeFeedback onPress={onpressHandler} disabled={disabled} useForeground={foregroundRippleSupport} background={background}>
      <View {...extraProps}>
        {children}
      </View>
    </TouchableNativeFeedback>
  );
};

Touchable.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  children: PropTypes.node,
  highlightColor: PropTypes.string
};

export default Touchable;
