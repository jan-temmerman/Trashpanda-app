import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default Header = () => {

  return (
    <View style={styles.container}>
        <Text style={styles.header}>My Recordings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    alignSelf: 'flex-start'
  },
  header: {
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 34,
    fontWeight: '700'
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
