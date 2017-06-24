import React, {PropTypes, Component} from 'react';
import {View, TextInput} from 'react-native';
import noop from 'lodash/noop';
import styles from './Input.styles';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';

class Input extends Component {
  _inputRef = null
  _setRef = (ref) => {
    this._inputRef = ref; // ref is required to access the target value in case of onblur and onfocus
  }

  componentWillReceiveProps (nextProps) {
    this._inputRef._lastNativeText = nextProps.input && nextProps.input.value;
  }

  // used _lastNativeText because android doesnt pass targetEvent in onBlur and onFocus
  _onBlurHandler = (inputProps) => () => {
    const {onBlur, onInputChange} = inputProps;
    const val = this._inputRef._lastNativeText;
    onBlur(val);
    onInputChange(val);
  }
  _onFocusHandler = (inputProps) => () => {
    const {onFocus, onInputChange} = inputProps;
    const val = this._inputRef._lastNativeText;
    onFocus(val);
    onInputChange(val);
  }
  _onChangeTextHandler = (inputProps) => (val) => {
    const {onChange, onInputChange} = inputProps;
    onChange(val);
    onInputChange(val);
  }

  render () {
    const {meta, input = {}, containerStyle = {}, inputStyles = {}, value, onFocus = noop, onBlur = noop, onChangeText = noop, onInputChange = noop, disabled = false, theme = 'primary', ...extraProps} = this.props;

    const err = !disabled && (meta && meta.touched && !meta.active && meta.error);

    const wrapperStyle = disabled
    ? [styles.container[theme], styles.disabledInput]
    : styles.container[theme];

    const onChange = onChangeText;

    const inputProps = {onChange, onFocus, onBlur, onInputChange, value, ...input};

    return (
      <View>
        <View style={[wrapperStyle, containerStyle]}>
          <TextInput
          {...extraProps}
          value={inputProps.value}
          ref={this._setRef}
          style={[styles.input[theme], inputStyles]}
          onChangeText={this._onChangeTextHandler(inputProps)}
          underlineColorAndroid={'transparent'}
          onFocus={this._onFocusHandler(inputProps)}
          onBlur={this._onBlurHandler(inputProps, input.value)}
          editable={!disabled}
          placeholderTextColor={theme.placeholderTextColor} />
        </View>
        {err && <ErrorTextIndicator text={err}/>}
      </View>
    );
  }
}

Input.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  inputStyles: PropTypes.object,
  value: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onInputChange: PropTypes.func,
  disabled: PropTypes.bool,
  theme: PropTypes.string,
  containerStyle: PropTypes.object
};

export default Input;
