import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Suggestion(props) {
  return (
    <TouchableOpacity style={styles.suggestion} onPress={() => props.setTextInput(props.text)}>
      <Text style={styles.suggestionText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  suggestion: {
    padding: 6,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
    borderRadius: 30,
    marginRight: 4,
  },
  suggestionText: {
    fontFamily: 'Montserrat-Regular',
  },
});
