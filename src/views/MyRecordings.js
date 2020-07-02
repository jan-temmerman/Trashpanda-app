import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableHighlight } from 'react-native';
import Voice from '@react-native-community/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import Layout from '../components/layout';
import Card from '../components/card';
import EmptyListPlaceholder from '../components/emptyListPlaceholder';

export default function MyRecordings({ navigation }) {
  const [itemsList, setItemsList] = useState([]);
  const [itemsListRendered, setItemsListRendered] = useState();
  let currentResult;

  const renderList = () => {
    console.log(itemsListRendered);
    const renderedList = itemsList.map((item, key) => {
      return (
        <Text style={styles.welcome} key={key}>
          {item}
        </Text>
      );
    });
    setItemsListRendered(renderedList);
  };

  useEffect(() => {
    console.log(currentResult);
  }, [currentResult]);

  const isStartStopDetected = (spokenTextLowered) => {
    const startIndex = spokenTextLowered.indexOf('start');
    const stopIndex = spokenTextLowered.indexOf('stop');

    if (startIndex < stopIndex && startIndex !== -1 && stopIndex !== -1) {
      return true;
    }
    return false;
  };

  const checkResults = (spokenText) => {
    const spokenTextLowered = spokenText.toLowerCase();
    console.log(spokenTextLowered);

    if (isStartStopDetected(spokenTextLowered)) {
      const unfilteresResult = spokenTextLowered;
      const filteredResult = unfilteresResult.substring(
        unfilteresResult.lastIndexOf('start') + 6,
        unfilteresResult.lastIndexOf('stop') - 1,
      );
      console.log(filteredResult);
      currentResult = filteredResult;

      handleMircophone('stop');
      setTimeout(() => {
        handleMircophone('start');
      }, 1000);
    }
  };

  const handleEnding = () => {
    console.log('speech ended');
    console.log(currentResult);
    const oldList = itemsList;
    oldList.push(currentResult);
    setItemsList(oldList);
    renderList();
  };

  const handleMircophone = async (action) => {
    if (action === 'start') {
      Voice.onSpeechStart = () => console.log('speech started');
      Voice.onSpeechEnd = () => handleEnding();
      Voice.onSpeechResults = (e) => checkResults(e.value[0]);

      try {
        await Voice.start('en-US');
      } catch (e) {
        console.error(e);
      }
    } else if (action === 'stop') {
      try {
        await Voice.stop();
        Voice.removeAllListeners();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Layout headerTitle="My Recordings">
      {/* <Text style={styles.welcome}>Welcome to Trashpanda!!!</Text>
      <Button
        onPress={() => handleMircophone('start')}
        title="start listening"
      />

      <Button
        onPress={() => handleMircophone('stop')}
        title="stop listening"
      />
    {itemsListRendered} */}
      <FlatList
        style={{ width: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        contentContainerStyle={{ paddingBottom: 300 }}
        data={[
          {
            title: 'card 1',
            distance: 3,
            itemsPickedUp: 132,
            time: '00:43',
            city: 'Ghent',
            date: 'Monday 7 februari 2020',
            id: 'card1',
          },
          {
            title: 'card 2',
            distance: 0.4,
            itemsPickedUp: 22,
            time: '00:13',
            city: 'Ghent',
            date: 'Friday 21 march 2020',
            id: 'card2',
          },
          {
            title: 'card 3',
            distance: 5,
            itemsPickedUp: 214,
            time: '01:12',
            city: 'Ghent',
            date: 'Sunday 2 april 2020',
            id: 'card3',
          },
          {
            title: 'card 1',
            distance: 3,
            itemsPickedUp: 132,
            time: '00:43',
            city: 'Ghent',
            date: 'Monday 7 februari 2020',
            id: 'card4',
          },
          {
            title: 'card 2',
            distance: 0.4,
            itemsPickedUp: 22,
            time: '00:13',
            city: 'Ghent',
            date: 'Friday 21 march 2020',
            id: 'card5',
          },
          {
            title: 'card 3',
            distance: 5,
            itemsPickedUp: 214,
            time: '01:12',
            city: 'Ghent',
            date: 'Sunday 2 april 2020',
            id: 'card6',
          },
          {
            title: 'card 1',
            distance: 3,
            itemsPickedUp: 132,
            time: '00:43',
            city: 'Ghent',
            date: 'Monday 7 februari 2020',
            id: 'card7',
          },
          {
            title: 'card 2',
            distance: 0.4,
            itemsPickedUp: 22,
            time: '00:13',
            city: 'Ghent',
            date: 'Friday 21 march 2020',
            id: 'card8',
          },
          {
            title: 'card 3',
            distance: 5,
            itemsPickedUp: 214,
            time: '01:12',
            city: 'Ghent',
            date: 'Sunday 2 april 2020',
            id: 'card9',
          },
        ]}
        ListEmptyComponent={<EmptyListPlaceholder />}
        renderItem={({ item }) => (
          <Card
            àtitle={item.title}
            distance={item.distance}
            time={item.time}
            itemsCount={item.itemsPickedUp}
            date={item.date}
            city={item.city}
          />
        )}
      />
      <TouchableHighlight onPress={() => navigation.navigate('AddRecording')} style={styles.addButton}>
        <Ionicons name="ios-add" size={50} color="#ffb800" />
      </TouchableHighlight>
    </Layout>
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
  addButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 110,
    right: 8,
    backgroundColor: 'black',
    width: 70,
    height: 70,
    borderRadius: 35,
    zIndex: 10,
    paddingTop: 4,
  },
});
