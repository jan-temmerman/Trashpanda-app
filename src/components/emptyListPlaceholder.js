import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import emtpy from '../assets/images/empty.png';

// Components
import Heading from './text/heading';
import Paragraph from './text/paragraph';

export default function EmptyListPlaceholder() {
  console.log(<Image style={styles.image} source={emtpy} resizeMode={'contain'} />);
  return (
    <View style={styles.container}>
      <View style={{ width: '70%', alignItems: 'center', alignSelf: 'center' }}>
        <Heading text={"It's kind of empty here..."} textAlign={'center'} />

        <Paragraph text={'Add data by going on runs and picking up litter!'} textAlign={'center'} />
        <Paragraph
          text={"Press the big black '+' button on the bottom right to start a new run!"}
          textAlign={'center'}
        />
      </View>
      <Image style={styles.image} source={require('../assets/images/empty.png')} resizeMode={'contain'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 25,
  },
  image: {
    width: '95%',
    alignSelf: 'center',
    height: 400,
    resizeMode: 'contain',
  },
});
