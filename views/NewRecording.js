import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Image,  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Dash from 'react-native-dash';
import Geolocation from '@react-native-community/geolocation';
import Voice from '@react-native-community/voice';

// Components
import Layout from '../components/layout';
import ListItem from '../components/listItem';
import Suggestion from '../components/suggestion'

export default AddRecording = ({route, navigation}) => {
  const { itemIndex } = route.params; 
  const { imageUri } = route.params; 

  const [textInput, setTextInput] = useState("")
  const [micOn, setMicOn] = useState(true)
  const [micIcon, setMicIcon] = useState(<MaterialCommunityIcons name={'microphone-off'} size={26} color={'black'} style={{paddingTop: 3}}/>)
  const [previewModal, setPreviewModal] = useState(null)
  const [items, setItems] = useState([])
  let currentResult
  
  useEffect(() => {
    if(itemIndex != null && imageUri !== "")
      setImageUri(itemIndex, imageUri)
    return
  }, [itemIndex, imageUri])

  useEffect(() => {
    if(micIcon)
      handleMircophone('start')
    else
      handleMircophone('stop')
    return
  }, [])

  const isStartStopDetected = (spokenTextLowered) => {
    let startIndex = spokenTextLowered.indexOf('start')
    let stopIndex = spokenTextLowered.indexOf('stop')

    if(startIndex < stopIndex && startIndex !== -1 && stopIndex !== -1) {
      return true
    } else return false
  }

  const checkResults = (spokenText) => {
    let spokenTextLowered = spokenText.toLowerCase()
    console.log(spokenTextLowered)

    if(isStartStopDetected(spokenTextLowered)) {


      let unfilteresResult = spokenTextLowered
      let filteredResult = unfilteresResult.substring( unfilteresResult.lastIndexOf("start") + 6, unfilteresResult.indexOf("stop") - 1)
      console.log(filteredResult)
      currentResult = filteredResult

      handleTextInput(currentResult)

      handleMircophone('stop')
      setTimeout(() => {
        handleMircophone('start')
      }, 1000);
      
    }
  }

  const handleEnding = () => {
    console.log('speech ended')
  }

  const handleMircophone = async(action) => {

    if(action === 'start') {
      Voice.onSpeechStart = () => console.log('speech started');
      Voice.onSpeechEnd = () => handleEnding();
      Voice.onSpeechResults = (e) => checkResults(e.value[0]);

      try {
          await Voice.start('en-US');
      } catch (e) {
          console.error(e);
      }
    } else if(action === 'stop') {
      try {
        await Voice.stop();
        Voice.removeAllListeners()
      } catch (e) {
          console.error(e);
      }
    }
  }


  const toggleMic = () => {
    if(micOn) {
      handleMircophone('stop')
      setMicIcon(<MaterialCommunityIcons name={'microphone'} size={26} color={'black'} style={{paddingTop: 3}}/>)
      setMicOn(false)
    } else if(!micOn) {
      handleMircophone('start')
      setMicIcon(<MaterialCommunityIcons name={'microphone-off'} size={26} color={'black'} style={{paddingTop: 3}}/>)
      setMicOn(true)
    }
  }

  const updateAmount = async(index, action) => {
    let coordinates = {}
    coordinates = await getCoordinates()
    if(action === 'increment'){
      let oldItems = [...items]
      oldItems[index].amount = oldItems[index].amount + 1
      console.log(coordinates)
      oldItems[index].geolocations.push(coordinates)
      let updatedItems = oldItems
      
      setItems(updatedItems)
    } else if(action === 'decrement') {
      let oldItems = [...items]
      if(oldItems[index].amount > 0) {
        oldItems[index].amount = oldItems[index].amount - 1
        oldItems[index].geolocations.pop()
        let updatedItems = oldItems
        
        setItems(updatedItems)
      }
    }
  }

  const isAlreadyInList = (text) => {
    console.log(items)
    for(item of items) {
      if(item.name.toLowerCase() === text.toLowerCase()) {
        console.log(item.name.toLowerCase() + ', ' + text.toLowerCase())
        return true
      }
    }
    return false
  }

  const setImageUri = (index, imageUri) => {
    console.log('setImageUri called')
    let oldItems = [...items]
    oldItems[index].imageUri = imageUri
    let updatedItems = oldItems
    setItems(updatedItems)
  }

  const getCoordinates = () => {
    let coordinates

    return new Promise(resolve => {
      Geolocation.getCurrentPosition(info => {
        coordinates = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude
        }
  
        resolve(coordinates)
      })
    })
  }

  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  const handleTextInput = async(text) => {
    let updatedItems = [...items]
    console.log(updatedItems)
    let coordinates = {}

    if(!isEmptyOrSpaces(text)) {
      coordinates = await getCoordinates()
      console.log(isAlreadyInList(text))
      if(!isAlreadyInList(text)) {
        let newItem = {
          name: text,
          amount: 1,
          imageUri: "",
          geolocations: [coordinates]
        }

        setItems(prevState => [...prevState, newItem]) 
      } else {
        for([index, value] of items.entries()) {
          if(value.name.toLowerCase() === text.toLowerCase()) {
            updatedItems[index].amount = updatedItems[index].amount + 1
            updatedItems[index].geolocations.push(coordinates)
          }
        }
      }
    }

    setTextInput("")
  }

  const askForDeletion = ( itemAmount, itemName, index) => {
    Alert.alert(
      "Delete item?",
      `Do you want to delete ${itemAmount}x ${itemName}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteItem(index) }
      ],
      { cancelable: false }
    );
  }

  const deleteItem = (index) => {
    let updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  const askForImageDeletion = (index) => {
    Alert.alert(
      "Delete image?",
      `Do you want to delete this image?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteImage(index) }
      ],
      { cancelable: false }
    );
  }

  const deleteImage = (index) => {
    let updatedItems = [...items]
    updatedItems[index].imageUri = ""
    setItems(updatedItems)
    setPreviewModal(null)
  }

  const showPreview = (index, imageUri) => {
    if(imageUri != "")
      setPreviewModal(
        <View style={{position: 'absolute', flex: 1, width: '100%', height: '100%', zIndex: 20, borderRadius: 30, overflow: 'hidden', justifyContent: 'flex-end'}}>
          <Image style={{width: '100%', height: '100%', }} source={{uri: imageUri}}/>
          <TouchableOpacity onPress={() => setPreviewModal(null)} style={{zIndex: 21, position: 'absolute', top: 10, left: 20}}>
            <Octicons name={'x'} size={38} color={'#FFF'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => askForImageDeletion(index)} style={styles.deleteImageButton}>
            <Text style={styles.deleteImageButtonText}>Delete image</Text>
          </TouchableOpacity>
        </View>
      )
    else
      setPreviewModal(null)
  }
  

  let itemsList

  if(items.length) {
    itemsList = items.map((item, index) => {
      return (
        <ListItem 
          key={index}
          imageUri={item.imageUri}
          showPreview={(index, imageUri) => showPreview(index, imageUri)}
          askForDeletion={(itemAmount, itemName, index) => askForDeletion(itemAmount, itemName, index)}
          navigation={navigation}
          index={index}
          itemAmount={item.amount}
          itemName={item.name}
          updateAmount={(index, action) => updateAmount(index, action)}
        />
      )
    })
  } else {
    itemsList = <Text style={styles.itemsListEmptyText}>No items added yet.</Text>
  }

  return (
    <Layout headerTitle="New Recording" navigationObject={navigation} >
      {previewModal}
      <ScrollView style={{width: '100%', height: '100%', paddingTop: 16, padding: 10, marginBottom: -100, borderRadius: 30}} contentContainerStyle={{ paddingBottom: 0}}>
          <Text style={{
            alignSelf: 'flex-start',
            textAlign: 'left',
            fontSize: 18,
            marginBottom: 4,
            fontFamily: 'Montserrat-Semibold',
          }}>What do you want to add?</Text>

        <View style={styles.textBoxContainer}>
          <TouchableOpacity onPress={() => toggleMic()}>
            {micIcon}
          </TouchableOpacity>
          <TextInput
            placeholder={'E.g. Plastic bag'}
            onSubmitEditing={() => handleTextInput(textInput)}
            returnKeyType={'done'}
            clearButtonMode={"while-editing"}
            placeholderTextColor={'lightgray'}
            selectionColor={'black'}
            style={{ height: '100%', flex: 1, marginLeft: 4, color: 'black', fontSize: 16}}
            onChangeText={text => setTextInput(text)}
            value={textInput}
          />
          <TouchableOpacity onPress={() => handleTextInput(textInput)}>
            <Feather name={'arrow-right-circle'} size={30} color={'black'} style={{paddingTop: 0}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.suggestionContainer}>
          <Suggestion text={"Coca-cola can"} setTextInput={(text) => setTextInput(text)}/>
          <Suggestion text={"Jupiler can"} setTextInput={(text) => setTextInput(text)}/>
          <Suggestion text={"Plastic bag"} setTextInput={(text) => setTextInput(text)}/>
        </View>

        <View style={styles.listContainer}>
          <Text style={{
              alignSelf: 'flex-start',
              textAlign: 'left',
              fontSize: 18,
              marginBottom: 10,
              fontFamily: 'Montserrat-Bold',
            }}>Current list</Text>

            <Dash style={{width:'100%', height: 1,}} dashGap={2} dashLength={12} dashColor={"#707070"} />
            
            {itemsList}

        </View>

      </ScrollView>
      <TouchableOpacity onPress={() => console.log('ended')} style={styles.finishButton}>
        <FontAwesome5 name={'flag-checkered'} size={30} color={'white'}/>
      </TouchableOpacity>
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
    marginBottom: 4,
    flexDirection: 'row'
  },
  listContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
    padding: 16,
    paddingTop: 14,
    paddingBottom: 300,
  },
  suggestionContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  deleteImageButton: {
    height: 60,
    backgroundColor: '#d82b2b',
    borderRadius: 40,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  deleteImageButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat-ExtraBold',
  },
  itemsListEmptyText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
    marginTop: 10,
  },
  finishButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 60,
    right: 20,
    backgroundColor: 'black',
    width: 70,
    height: 70,
    borderRadius: 35,
    zIndex: 10,
    paddingTop: 4,
  }
});
