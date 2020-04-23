import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Components

export default EmptyListPlaceholder = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>It's kind of empty here...</Text>
      <Text style={styles.heading2}>Add data by going on runs and picking up litter!</Text>
      <Text style={styles.heading2}>Press the big black '+' button on the bottom right to start a new run!</Text>
      <Image style={styles.image} source={require('../assets/images/empty.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 28
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  heading1: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '70%',
    fontSize: 18,
    marginBottom: 14,
    fontFamily: 'Montserrat-Bold'
  },
  heading2: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '70%',
    fontSize: 13,
    marginBottom: 14,
    fontFamily: 'Montserrat-Regular'
  },
});
