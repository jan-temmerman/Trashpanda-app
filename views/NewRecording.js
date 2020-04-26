import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Dash from 'react-native-dash';
import Geolocation from '@react-native-community/geolocation';

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
  
  useEffect(() => {
    if(itemIndex != null && imageUri !== "")
      setImageUri(itemIndex, imageUri)
    return
  }, [itemIndex, imageUri])

  useEffect(() => {
    console.log(items[0])
    return
  }, [items])

  const toggleMic = () => {
    if(micOn) {
      setMicIcon(<MaterialCommunityIcons name={'microphone'} size={26} color={'black'} style={{paddingTop: 3}}/>)
      setMicOn(false)
    } else if(!micOn) {
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
    for(item of items) {
      if(item.name.toLowerCase() === text.toLowerCase()) {
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

  const handleTextInput = async(text) => {
    let updatedItems = [...items]
    let coordinates = {}

    coordinates = await getCoordinates()
    
    if(!isAlreadyInList(text)) {
      updatedItems.push({
        name: text,
        amount: 1,
        imageUri: "",
        geolocations: [coordinates]
      })

      setItems(updatedItems) 
    } else {
      for([index, value] of items.entries()) {
        if(value.name.toLowerCase() === text.toLowerCase()) {
          updatedItems[index].amount = updatedItems[index].amount + 1
          updatedItems[index].geolocations.push(coordinates)
        }
      }
      setItems(updatedItems) 
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
  
  return (
    <Layout headerTitle="New Recording" navigationObject={navigation} >
      {previewModal}
      <ScrollView style={{width: '100%', height: '100%', paddingTop: 16, padding: 10, marginBottom: -100, borderRadius: 30}}>
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
            onSubmitEditing={(event) => handleTextInput(event.nativeEvent.text)}
            returnKeyType={'done'}
            clearButtonMode={"while-editing"}
            placeholderTextColor={'lightgray'}
            selectionColor={'black'}
            style={{ height: '100%', flex: 1, marginLeft: 4, color: 'black', fontSize: 16}}
            onChangeText={text => setTextInput(text)}
            value={textInput}
          />
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
            
            {
              items.map((item, index) => {
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
            }

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
    paddingTop: 14
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
  }
});
