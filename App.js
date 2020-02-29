import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

const App = () => {
  const [userNumber, setUserNumber] = useState();

  const startGameHander = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  let content = <StartGameScreen onStartGame={startGameHander} />;

  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
  }
  
  return (
    <View style={styles.container}>
      <Header title='Guess a number' />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default App;
