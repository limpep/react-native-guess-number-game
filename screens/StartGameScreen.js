import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert
} from 'react-native';

import Card from '../components/Card';
import colours from '../constants/colours';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numbInputHander = inputext => {
    setEnteredValue(inputext.replace(/[^0-9]/g, ''));
  };

  const resetInputHander = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHander = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalide Number',
        'Number has to be a number between 1 to 99',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: resetInputHander
          }
        ]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}> Start a new game </TitleText>
        <Card style={styles.inpContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numbInputHander}
            value={enteredValue}
          />
          <View style={styles.btnContainer}>
            <View style={styles.button}>
              <Button
                title='reset'
                onPress={resetInputHander}
                color={colours.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title='confirm'
                onPress={confirmInputHander}
                color={colours.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inpContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 90
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;
