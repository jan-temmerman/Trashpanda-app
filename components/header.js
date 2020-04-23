import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default Header = (props) => {

  return (
    <View style={styles.container}>
        <Text style={styles.header}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 38,
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold'
  },
});
