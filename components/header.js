import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default Header = (props) => {
  let backButton = null

  if(props.backButtonVisible)
    backButton = 
      <TouchableOpacity onPress={() => props.navigationObject.goBack()} style={{height: '100%', alignItems: 'center', marginTop: -2, marginBottom: -10, marginRight: -16, marginLeft: -8}}>
        <MaterialIcons name={'keyboard-arrow-left'} size={53} color={'black'}/>
      </TouchableOpacity>

  return (
    <View style={styles.container}>
      {backButton}
      <Text style={styles.header}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 38,
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold'
  },
});
