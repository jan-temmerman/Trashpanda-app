import React, {useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';

export default function App() {

  useEffect(() => {
    Voice.onSpeechStart = () => console.log('speech started');
    Voice.onSpeechEnd = () => console.log('speech ended');
    Voice.onSpeechResults = (e) => console.log(e);
    
    return
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Trashpanda!!!</Text>
      <Button 
        onPress={async() => {
          try {
            await Voice.start('en-US');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
        }}
        title="speech"
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
