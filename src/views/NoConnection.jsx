import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking, Dimensions, View } from 'react-native';

// Components
import Layout from '../components/layout';

export default function NoConnection({ navigation }) {
  return (
    <Layout headerTitle="No Connection">
      <View style={styles.container}>
        <Text style={styles.text}>You need an internet connection to use this app.</Text>
        <TouchableOpacity style={styles.mainButton} onPress={() => Linking.openURL('app-settings:')}>
          <Text style={styles.mainButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 47,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  addButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 110,
    right: 8,
    backgroundColor: 'black',
    width: 70,
    height: 70,
    borderRadius: 35,
    zIndex: 10,
    paddingTop: 4,
  },
  mainButton: {
    width: windowWidth * 0.4,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 1000,
    justifyContent: 'center',
  },
  mainButtonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-regular',
    color: 'white',
  },
  text: {
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
    fontFamily: 'Montserrat-regular',
    color: 'black',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
