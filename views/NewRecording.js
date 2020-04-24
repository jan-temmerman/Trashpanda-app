import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Carousel from 'react-native-carousel-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Dash from 'react-native-dash';

// Components
import Layout from '../components/layout';
import Heading from '../components/text/heading';
import Paragraph from '../components/text/paragraph';

export default AddRecording = ({navigation}) => {
  const [textInput, setTextInput] = useState("")
  
  return (
    <Layout headerTitle="New Recording" navigationObject={navigation} >
      <ScrollView style={{width: '100%', height: '100%', paddingTop: 16, padding: 10, marginBottom: -100, borderRadius: 30}}>
          <Text style={{
            alignSelf: 'flex-start',
            textAlign: 'left',
            fontSize: 18,
            marginBottom: 4,
            fontFamily: 'Montserrat-Semibold',
          }}>What do you want to add?</Text>

        <View style={styles.textBoxContainer}>
          <TextInput
            clearButtonMode={"while-editing"}
            style={{ height: '100%'}}
            onChangeText={text => setTextInput(text)}
            value={textInput}
          />
        </View>

        <View style={styles.suggestionContainer}>
          <TouchableOpacity style={styles.suggestion} onPress={() => setTextInput("Coca-cola can")}>
            <Text style={styles.suggestionText}>Coca-cola can</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.suggestion} onPress={() => setTextInput("Jupiler can")}>
            <Text style={styles.suggestionText}>Jupiler can</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.suggestion} onPress={() => setTextInput("Plastig bag")}>
            <Text style={styles.suggestionText}>Plastig bag</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <Text style={{
              alignSelf: 'flex-start',
              textAlign: 'left',
              fontSize: 18,
              marginBottom: 10,
              fontFamily: 'Montserrat-Bold',
            }}>Current list</Text>
            <Dash style={{width:'100%', height: 1}} dashGap={2} dashLength={12} dashColor={"#707070"} />

            <View style={styles.itemContainer}>

              <View style={styles.amountContainer}>
                <TouchableOpacity style={styles.minusButton}>
                  <AntDesign name={'minus'} size={34} color={'white'}/>
                </TouchableOpacity>
                <Text style={styles.amountText}>444</Text>
                <TouchableOpacity style={styles.plusButton}>
                  <AntDesign name={'plus'} size={28} color={'black'}/>
                </TouchableOpacity>
              </View>

              <Text style={styles.itemText} numberOfLines={1}>Coca-cola can</Text>

              <TouchableOpacity style={styles.cameraButton}>
                <Feather name={'camera'} size={24} color={'gray'}/>
              </TouchableOpacity>
            </View>
            <Dash style={{width:'100%', height: 1}} dashGap={2} dashLength={12} dashColor={"#DDDADA"} />

            <View style={styles.itemContainer}>

              <View style={styles.amountContainer}>
                <TouchableOpacity style={styles.minusButton}>
                  <AntDesign name={'minus'} size={34} color={'white'}/>
                </TouchableOpacity>
                <Text style={styles.amountText}>4</Text>
                <TouchableOpacity style={styles.plusButton}>
                  <AntDesign name={'plus'} size={28} color={'black'}/>
                </TouchableOpacity>
              </View>

              <Text style={styles.itemText} numberOfLines={1}>Cigarette</Text>

              <TouchableOpacity style={styles.cameraButton}>
                <Feather name={'camera'} size={24} color={'gray'}/>
              </TouchableOpacity>
            </View>
            <Dash style={{width:'100%', height: 1}} dashGap={2} dashLength={12} dashColor={"#DDDADA"} />

            <View style={styles.itemContainer}>

              <View style={styles.amountContainer}>
                <TouchableOpacity style={styles.minusButton}>
                  <AntDesign name={'minus'} size={34} color={'white'}/>
                </TouchableOpacity>
                <Text style={styles.amountText}>4</Text>
                <TouchableOpacity style={styles.plusButton}>
                  <AntDesign name={'plus'} size={28} color={'black'}/>
                </TouchableOpacity>
              </View>

              <Text style={styles.itemText} numberOfLines={1}>Jupiler can</Text>

              <TouchableOpacity style={styles.cameraButton}>
                <Feather name={'camera'} size={24} color={'gray'}/>
              </TouchableOpacity>
            </View>

        </View>

      </ScrollView>
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
    paddingLeft: 10,
    marginBottom: 4
  },
  listContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
    padding: 20,
    paddingTop: 14
  },
  minusButton: {
    paddingTop: 1,
    paddingLeft: 1,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusButton: {
    paddingTop: 4,
    paddingLeft: 1,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#ffb800',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    alignSelf: 'center',
    fontSize: 16,
    width: '50%',
    fontFamily: 'Montserrat-Regular',
  },
  amountText: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  cameraButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 1,
    paddingBottom: 1
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  amountContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '32%', 
    justifyContent: 'space-between'
  },
  suggestion: {
    padding: 6,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
    borderRadius: 30,
    marginRight: 4
  },
  suggestionContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  suggestionText: {
    fontFamily: 'Montserrat-Regular',
  }
});
