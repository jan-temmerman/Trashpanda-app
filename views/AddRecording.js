import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-carousel-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import Layout from '../components/layout';
import Heading from '../components/text/heading';
import Paragraph from '../components/text/paragraph';

export default AddRecording = ({navigation}) => {
  
  return (
    <Layout headerTitle="Add a Recording" navigationObject={navigation} backButtonVisible={true} >
      <View style={{flex: 1, justifyContent: 'space-between', marginBottom: 110}}>
        <Carousel
          width={Math.round(Dimensions.get('window').width)}
          height={330}
          animate={false}
          indicatorAtBottom={true}
          indicatorSize={12}
          inactiveIndicatorColor={"#A57C11"}
        >
          <View style={{marginTop: 28,alignItems: 'center'}}>
            <View style={{width: '75%', marginBottom: 10}}>
              <Heading text={"Adding items using your microphone."} textAlign={"left"}/>
            </View>
            <View style={{width: '75%', flexDirection: 'row', justifyContent: 'space-between'}}>
              
              <View style={{alignItems: 'flex-end', marginRight: 4}}>
                <Text style={{ fontSize: 38, marginTop: -16, fontFamily: 'Montserrat-Bold' }}>1</Text>
                <Text style={{ fontSize: 38, marginBottom: 18, fontFamily: 'Montserrat-Bold' }}>2</Text>
                <Text style={{ fontSize: 38, marginBottom: 14, fontFamily: 'Montserrat-Bold' }}>3</Text>
              </View>
              <View style={{width: '90%'}}>
                <Paragraph text={"Start every entry by saying 'start', the microphone will then start listening."} textAlign={"left"}/>
                <Paragraph text={"Then say the quantity and the name of the product you picked up. Snap a photo by adding the word ‘photo’ at the end."} textAlign={"left"}/>
                <Paragraph text={"Start every entry by saying 'start', the microphone will then start listening."} textAlign={"left"}/>
                <Paragraph text={"Repeat this for every group of products you find."} textAlign={"left"}/>
              </View>
            </View>
          </View>

          <View style={{marginTop: 28,alignItems: 'center'}}>
            <View style={{width: '75%', marginBottom: 10}}>
              <Heading text={"Adding items using the keyboard."} textAlign={"left"}/>
            </View>
            <View style={{width: '75%', flexDirection: 'row', justifyContent: 'space-between'}}>
              
              <View style={{alignItems: 'flex-end', marginRight: 4}}>
                <Text style={{ fontSize: 38, marginTop: -16, marginBottom: 30, fontFamily: 'Montserrat-Bold' }}>1</Text>
                <Text style={{ fontSize: 38, marginBottom: 2, fontFamily: 'Montserrat-Bold' }}>2</Text>
                <Text style={{ fontSize: 38, marginBottom: 14, fontFamily: 'Montserrat-Bold' }}>3</Text>
              </View>
              <View style={{width: '90%'}}>
                <Paragraph text={"Type the name of the product you picked up. You can also tap one of the suggestions of products that are most found."} textAlign={"left"}/>
                <Paragraph text={"Fill in the amount of items you found of this product."} textAlign={"left"}/>
                <Paragraph text={"Tap the camera icon of you want to add a photo to the entry."} textAlign={"left"}/>
                <Paragraph text={"Repeat this for every group of products you find."} textAlign={"left"}/>
              </View>
            </View>
          </View>
        </Carousel>

        <TouchableOpacity onPress={() => navigation.navigate('NewRecording')} style={{width: '100%', alignSelf: 'center'}}>
          <View style={styles.startButton}>
            <Text style={styles.buttonText}> Start a new run</Text>
            <View style={styles.whiteCirkel}>
              <Ionicons name={'ios-arrow-round-forward'} size={60} color={'black'}/>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: 'black',
    height: 70,
    borderRadius: 35,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'Montserrat-Regular',
    margin: 10
  },
  whiteCirkel: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    margin: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 2,
  }
});
