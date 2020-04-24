import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-carousel-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dash from 'react-native-dash';

// Components
import Layout from '../components/layout';
import Heading from '../components/text/heading';
import Paragraph from '../components/text/paragraph';

export default AddRecording = ({navigation}) => {
  const [textInput, setTextInput] = useState("")
  
  return (
    <Layout headerTitle="New Recording" navigationObject={navigation} >
      <View style={{width: '100%', height: '100%', paddingTop: 16, padding: 10}}>
          <Text style={{
            alignSelf: 'flex-start',
            textAlign: 'left',
            fontSize: 18,
            marginBottom: 4,
            fontFamily: 'Montserrat-Semibold',
          }}>What do you want to add?</Text>

        <View style={styles.textBoxContainer}>
          <TextInput
            style={{ height: '100%'}}
            onChangeText={text => setTextInput(text)}
            value={textInput}
          />
        </View>

        <View style={styles.listContainer}>
          <Text style={{
              alignSelf: 'flex-start',
              textAlign: 'left',
              fontSize: 18,
              marginBottom: 6,
              fontFamily: 'Montserrat-Bold',
            }}>Current list</Text>
            <Dash style={{width:'100%', height: 1}} dashGap={2} dashLength={12} dashColor={"#BABABA"} />
        </View>

      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  textBoxContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderRadius: 50,
    padding: 4,
    paddingLeft: 10
  },
  listContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
    padding: 20,
    paddingTop: 14
  }
});
