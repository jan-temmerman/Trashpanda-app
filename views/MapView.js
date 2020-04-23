import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';

// Components
import Header from '../components/header'

export default MapView = () => {

  return (
    <View style={styles.container}>
      <Header title="Map"/>
      <View style={styles.background}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 47,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 38,
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold'
  },
  background: {
    backgroundColor: '#F7B917',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 6,
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
