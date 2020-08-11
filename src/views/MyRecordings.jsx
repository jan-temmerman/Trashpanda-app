import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableHighlight, RefreshControl } from 'react-native';
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
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    checkForUser();

    auth().onAuthStateChanged(() => {
      checkForUser();
    });
    return;
  }, []);

  const checkForUser = () => {
    setIsBusy(true);
    if (auth().currentUser) {
      setUserLoggedIn(true);
      database()
        .ref(`/recordings/users/${auth().currentUser.uid}`)
        .once('value')
        .then((snapshot) => {
          setIsBusy(false);
          //console.log('User logged in, items: ', Object.keys(snapshot.val()));
          if (snapshot.val()) setItemsObject(snapshot.val());
          else setItemsObject({});
        });
    } else {
      setIsBusy(false);
      setItemsObject({});
      console.log('no user logged in');
    }
  };

  return (
    <Layout headerTitle="My Recordings">
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#000000']}
            tintColor={'#000000'}
            onRefresh={() => checkForUser()}
            refreshing={isBusy}
          />
        }
        style={{ width: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 6 }}
        contentContainerStyle={{ paddingBottom: 300 }}
        showsVerticalScrollIndicator={false}
        data={Object.keys(itemsObject).reverse()}
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
