import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';

// Components

export default Heading = (props) => {

  return (
    <View style={{width: '100%'}}>
      <Text style={{
        alignSelf: 'center',
        textAlign: props.textAlign,
        fontSize: 18,
        marginBottom: 14,
        fontFamily: 'Montserrat-Bold',
      }}>{props.text}</Text>
    </View>
  );
}