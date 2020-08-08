import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-carousel-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import Layout from '../components/layout';
import Heading from '../components/text/heading';
import Paragraph from '../components/text/paragraph';

export default function AddRecording({ navigation }) {
  return (
    <Layout headerTitle="Add a Recording" navigationObject={navigation} backButtonVisible>
      <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: 110 }}>
        <Carousel
          width={Math.round(Dimensions.get('window').width)}
          height={370}
          animate={false}
          indicatorAtBottom
          indicatorSize={12}
          inactiveIndicatorColor="#A57C11"
        >
          <View style={{ marginTop: 28, alignItems: 'center' }}>
            <View style={{ width: '75%', marginBottom: 10 }}>
              <Heading text="Adding items using your microphone." textAlign="left" />
            </View>
            <View style={styles.paragraphContainer}>
              <View style={styles.paragraph}>
                <Text style={styles.number}>1</Text>
                <Paragraph
                  text={"Start every entry by saying 'start', the microphone will then start listening."}
                  textAlign="left"
                />
              </View>
              <View style={styles.paragraph}>
                <Text style={styles.number}>2</Text>
                <Paragraph
                  text="Then say the quantity and the name of the product you picked up. Snap a photo by adding the word ‘photo’ at the end."
                  textAlign="left"
                />
              </View>
              <View style={styles.paragraph}>
                <Text style={styles.number}>3</Text>
                <Paragraph
                  text={"Start every entry by saying 'start', the microphone will then start listening."}
                  textAlign="left"
                />
              </View>
              <View style={styles.paragraph}>
                <Text style={styles.number}></Text>
                <Paragraph text="Repeat this for every group of products you find." textAlign="left" />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 28, alignItems: 'center' }}>
            <View style={{ width: '75%', marginBottom: 10 }}>
              <Heading text={'Adding items using the \nkeyboard.'} textAlign="left" />
            </View>
            <View style={styles.paragraphContainer}>
              <View style={styles.paragraph}>
                <Text style={styles.number}>1</Text>
                <Paragraph
                  text="Type the name of the product you picked up. You can also tap one of the suggestions of products that are most found."
                  textAlign="left"
                />
              </View>
              <View style={styles.paragraph}>
                <Text style={styles.number}>2</Text>
                <Paragraph text="Fill in the amount of items you found of this product." textAlign="left" />
              </View>
              <View style={styles.paragraph}>
                <Text style={styles.number}>3</Text>
                <Paragraph text="Tap the camera icon of you want to add a photo to the entry." textAlign="left" />
              </View>
              <View style={styles.paragraph}>
                <Text style={styles.number}></Text>
                <Paragraph text="Repeat this for every group of products you find." textAlign="left" />
              </View>
            </View>
          </View>
        </Carousel>

        <TouchableOpacity
          onPress={() => navigation.navigate('NewRecording')}
          style={{ width: '100%', alignSelf: 'center' }}
        >
          <View style={styles.startButton}>
            <Text style={styles.buttonText}> Start a new run</Text>
            <View style={styles.whiteCirkel}>
              <Ionicons name="ios-arrow-round-forward" size={60} color="black" />
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
    margin: 10,
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
  },
  paragraphContainer: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -30,
  },
  paragraph: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    fontSize: 38,
    marginTop: -16,
    fontFamily: 'Montserrat-Bold',
    marginRight: 8,
    width: 24,
    textAlign: 'right',
  },
});
