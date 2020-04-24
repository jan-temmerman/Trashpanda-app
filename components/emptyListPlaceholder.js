import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Components
import Heading from './text/heading'
import Paragraph from './text/paragraph'

export default EmptyListPlaceholder = () => {

  return (
    <View style={styles.container}>
      <View style={{width: '70%', alignItems: 'center', alignSelf: 'center'}}>
        <Heading text={"It's kind of empty here..."} textAlign={"center"}/>
      
      <Paragraph text={"Add data by going on runs and picking up litter!"} textAlign={"center"}/>
      <Paragraph text={"Press the big black '+' button on the bottom right to start a new run!"} textAlign={"center"}/>
      </View>
      <Image style={styles.image} source={require('../assets/images/empty.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 100
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
});
