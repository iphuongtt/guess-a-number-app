import React from 'react';
import {TextInput, TextProps, StyleSheet, TextStyle} from 'react-native';

interface MyPorps extends TextProps {
  style: TextStyle;
}

const Input = (props: MyPorps) => {
  return <TextInput style={{...styles.input, ...props.style}} />;
};

const styles = StyleSheet.create({
  input: {},
});

export default Input;
