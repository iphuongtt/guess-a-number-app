import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {ViewProps, PressEvent} from '../interfaces';
import {BodyText, MainButton} from '../components';
import {colors} from '../constants';

interface Props extends ViewProps {
  roundsNumber: number;
  userNumber: number;
  onRestart: PressEvent;
}

export const GameOverScreen = (props: Props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is over</Text>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={1000}
          style={styles.image}
          //source={require('../assets/success.png')}
          source={{
            uri:
              'https://www.chromethemer.com/wallpapers/chromebook-wallpapers/download/mountain-peaks-3840x2160.jpg',
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{' '}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
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
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#2f4f4f',
    overflow: 'hidden',
    marginVertical: 30,
  },
  highlight: {
    color: colors.primary,
  },
  resultContainer: {
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default GameOverScreen;
