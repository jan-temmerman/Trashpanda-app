import 'react-native-gesture-handler';
import React, { Children } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Components
import Header from '../components/header'

export default Layout = (props) => {

  return (
    <View style={styles.container}>
      <Header title={props.headerTitle} navigationObject={props.navigationObject} backButtonVisible={props.backButtonVisible}/>
      <View style={styles.background}>
        {props.children}
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
  background: {
    backgroundColor: '#ffb800',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
