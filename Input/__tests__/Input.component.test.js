import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../index.js';
import {TextInput} from 'react-native';
import {shallow} from 'enzyme';

const onInputChangeSpy = jest.fn();
const onChangeTextSpy = jest.fn();
const onFocusSpy = jest.fn();
const onBlurSpy = jest.fn();

describe('FormComponent: Input component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Input/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Input', () => {
    const wrapper = shallow(<Input value={'test value'} onInputChange={onInputChangeSpy} onBlur={onBlurSpy} onFocus={onFocusSpy} onChangeText={onChangeTextSpy} ref/>);
    const instance = wrapper.instance();

    it('input change callback', () => {
      const input = wrapper.find(TextInput);
      expect(input.at(0).props().value).toEqual('test value');
      instance._onChangeTextHandler({
        onInputChange: instance.props.onInputChange,
        onChange: instance.props.onChangeText}
      )('1111');
      expect(onChangeTextSpy).toBeCalled();
      expect(onInputChangeSpy).toBeCalled();
    });

    it('Focus callback', () => {
      instance._inputRef = {};
      instance._onFocusHandler({
        onInputChange: instance.props.onInputChange,
        onFocus: instance.props.onFocus}
      )();
      expect(onFocusSpy).toBeCalled();
      expect(onInputChangeSpy).toBeCalled();
    });

    it('Blur callback', () => {
      instance._inputRef = {};
      instance._onBlurHandler({
        onInputChange: instance.props.onInputChange,
        onBlur: instance.props.onBlur}
      )();
      expect(onBlurSpy).toBeCalled();
      expect(onInputChangeSpy).toBeCalled();
    });
  });
});
