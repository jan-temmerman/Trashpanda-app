import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';

// Components
import EmptyListPlaceholder from '../components/emptyListPlaceholder';
import Layout from '../components/layout'

export default Profile = () => {
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
    <Layout headerTitle="Profile" >
      <EmptyListPlaceholder/>
    </Layout>
  );
}
