import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';

// Components

export default Paragraph = (props) => {

  return (
    <View style={{width: '100%'}}>
      <Text style={{
        textAlign: props.textAlign,
        fontSize: 13,
        marginBottom: 14,
        fontFamily: 'Montserrat-Regular'
      }}>{props.text}</Text>
    </View>
  );
}
