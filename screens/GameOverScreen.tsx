import React from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import {ViewProps} from '../interfaces';

interface Props extends ViewProps {
  roundsNumber: number;
  userNumber: number;
  onRestart: Function;
}

export const GameOverScreen = (props: Props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is over</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/success.png')}
          resizeMode="cover"
        />
      </View>
      <Text>Number of rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 300,
    borderRadius: 200,
  },
  imageContainer: {},
});

export default GameOverScreen;
