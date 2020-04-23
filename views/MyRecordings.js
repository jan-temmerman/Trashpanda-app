import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import Voice from '@react-native-community/voice';

export default MyRecordings = () => {
  const [itemsList, setItemsList] = useState([])
  const [itemsListRendered, setItemsListRendered] = useState()
  let currentResult

  const renderList = () => {
    console.log(itemsListRendered)
    let renderedList = itemsList.map((item, key) =>
      <Text style={styles.welcome} key={key}>{item}</Text>
    )
    setItemsListRendered(renderedList)
  }  

  useEffect(() => {
    console.log(currentResult)
    return
  }, [currentResult])

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
      let filteredResult = unfilteresResult.substring( unfilteresResult.lastIndexOf("start") + 6, unfilteresResult.lastIndexOf("stop") - 1)
      console.log(filteredResult)
      currentResult = filteredResult

      handleMircophone('stop')
      setTimeout(() => {
        handleMircophone('start')
      }, 1000);
      
    }
  }

  const handleEnding = () => {
    console.log('speech ended')
    console.log(currentResult)
    let oldList = itemsList
    oldList.push(currentResult)
    setItemsList(oldList)
    renderList()
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

  return (
    <View style={styles.container}>
      {/*<Text style={styles.welcome}>Welcome to Trashpanda!!!</Text>
      <Button 
        onPress={() => handleMircophone('start')}
        title="start listening"
      />

      <Button 
        onPress={() => handleMircophone('stop')}
        title="stop listening"
      />
    {itemsListRendered}*/}

      <Text style={styles.header}>My Recordings</Text>
      <View style={styles.background}>
      <FlatList
      style={{width: '100%'}}
      data={[{title: 'Title Text', key: 'item1'}, {title: 'Title Text 2', key: 'item12'}, {title: 'Title Text 3', key: 'item13'}, {title: 'Title Text 4', key: 'item14'}]}
      renderItem={({item, index, separators}) => (
        <View style={styles.card}>
          <Text>{item.title}</Text>
        </View>
      )}
    />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 47,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  card: {
    backgroundColor: '#FFF',
    width: '94%',
    height: 110,
    marginTop: 14,
    borderRadius: 24,
    alignSelf: 'center',
    padding: 20,
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 38,
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold'
  },
  background: {
    backgroundColor: '#F7B917',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 6,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
