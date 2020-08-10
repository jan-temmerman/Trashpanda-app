import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableHighlight } from 'react-native';
import Voice from '@react-native-community/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

// Components
import Layout from '../components/layout';
import Card from '../components/card';
import EmptyListPlaceholder from '../components/emptyListPlaceholder';

export default function MyRecordings({ navigation }) {
  const [itemsList, setItemsList] = useState([]);
  const [itemsListRendered, setItemsListRendered] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [itemsObject, setItemsObject] = useState({});

  useEffect(() => {
    checkForUser();

    auth().onAuthStateChanged(() => {
      checkForUser();
    });
    return;
  }, []);

  const checkForUser = () => {
    if (auth().currentUser) {
      setUserLoggedIn(true);

      database()
        .ref(`/recordings/users/${auth().currentUser.uid}`)
        .once('value')
        .then((snapshot) => {
          console.log('User logged in, items: ', Object.keys(snapshot.val()));
          setItemsObject(snapshot.val());
        });
    } else {
      setUserLoggedIn(false);
      console.log('no user logged in');
    }
  };

  return (
    <Layout headerTitle="My Recordings">
      <FlatList
        style={{ width: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 6 }}
        contentContainerStyle={{ paddingBottom: 300 }}
        showsVerticalScrollIndicator={false}
        data={
          Object.keys(itemsObject)
          /*[{
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
        ]*/
        }
        ListEmptyComponent={<EmptyListPlaceholder />}
        keyExtractor={(item, index) => {
          return item;
        }}
        renderItem={({ item, index }) => {
          return (
            <Card
              navigation={navigation}
              distance={3}
              time={itemsObject[item].time}
              itemsCount={itemsObject[item].itemsAmount}
              date={new Date(item).toLocaleString()}
              city={'Lokeren'}
            />
          );
        }}
      />
      <TouchableHighlight onPress={() => navigation.navigate('AddRecording')} style={styles.addButton}>
        <Ionicons name="ios-add" size={50} color="#FFFFFF" />
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
