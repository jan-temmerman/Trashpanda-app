import React, {useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';

export default function App() {

  useEffect(() => {
    Voice.onSpeechStart = () => console.log('speech started');
    Voice.onSpeechEnd = () => console.log('speech ended');
    Voice.onSpeechResults = (e) => checkResults(e.value[0]);
    
    return
  }, [])

  const checkResults = (spokenText) => {
    spokenTextLowered = spokenText.toLowerCase()
    console.log(spokenTextLowered)

    if(spokenTextLowered.includes('start'))
      console.log('start detected')

    if(spokenTextLowered.includes('stop')) {
      let unfilteresResult = spokenTextLowered
      let filteredResult = unfilteresResult.substring( unfilteresResult.lastIndexOf("start") + 6, unfilteresResult.lastIndexOf("stop") - 1)
      console.log('stop detected')
      console.log('\n result: ' + filteredResult)
      handleMircophone('stop')
      handleMircophone('start')
    }
  }

  const handleMircophone = async(action) => {

    if(action === 'start') {
      try {
          await Voice.start('en-US');
      } catch (e) {
          console.error(e);
      }
    } else if(action === 'stop') {
      try {
        await Voice.stop();
      } catch (e) {
          console.error(e);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Trashpanda!!!</Text>
      <Button 
        onPress={() => handleMircophone('start')}
        title="start listening"
      />

      <Button 
        onPress={() => handleMircophone('stop')}
        title="stop listening"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
