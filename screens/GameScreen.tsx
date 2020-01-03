import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import {ViewProps} from '../interfaces';
import {NumberContainer, Card, MainButton, BodyText} from '../components';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends ViewProps {
  userChoice: number;
  onGameOver: Function;
}

type ListItem = {
  index: number;
  item: number;
};

const iconPrefix = Platform.OS === 'ios' ? 'ios-' : 'md-';

const generateRandomBetween = (min: number, max: number, exclude: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength: number, itemData: ListItem) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item} </BodyText>
  </View>
);

export const GameScreen = (props: Props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPastGuess] = useState([initialGuess.toString()]);
  // const [availableDeviceWith, setAvailableDeviceWith] = useState(
  //   Dimensions.get('window').width,
  // );

  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const updateLayout = () => {
      // setAvailableDeviceWith(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);
  });

  const {userChoice, onGameOver} = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length);
    }
  }, [currentGuess, onGameOver, pastGuess, userChoice]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = (direction: 'lower' | 'greater') => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuess(curPastGuess => [nextNumber.toString(), ...curPastGuess]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Icon name={`${iconPrefix}remove`} size={18} />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Icon name={`${iconPrefix}add`} size={18} />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={pastGuess}
            renderItem={renderListItem.bind(this, pastGuess.length)}
            keyExtractor={item => item}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Icon name={`${iconPrefix}remove`} size={18} />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Icon name={`${iconPrefix}add`} size={18} />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={pastGuess}
          renderItem={renderListItem.bind(this, pastGuess.length)}
          keyExtractor={item => item}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  listContainer: {
    width: Dimensions.get('window').width > 500 ? '60%' : '80%',
    flex: 1,
  },
  list: {
    flexGrow: 1,
    //alignItems: 'center',
    justifyContent: 'flex-end',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
  },
});

export default GameScreen;
