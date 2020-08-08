import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Dimensions } from 'react-native';

// Components

export default Paragraph = (props) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={{ width: '100%' }}>
      <Text
        style={{
          textAlign: props.textAlign,
          fontSize: windowWidth / 27,
          marginBottom: 15,
          fontFamily: 'Montserrat-Regular',
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};
