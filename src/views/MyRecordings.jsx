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
  const [itemsObject, setItemsObject] = useState({});
  const [itemsKeys, setItemsKeys] = useState([]);
  const [sortedItemsKeys, setSortedItemsKeys] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    checkForUser();

    auth().onAuthStateChanged(() => {
      checkForUser();
    });
    return;
  }, []);

  useEffect(() => {
    setSortedItemsKeys(
      itemsKeys.sort(function (a, b) {
        return new Date(b) - new Date(a);
      }),
    );
    return;
  }, [itemsKeys]);

  const checkForUser = () => {
    setIsBusy(true);
    if (auth().currentUser) {
      database()
        .ref(`/recordings/users/${auth().currentUser.uid}`)
        .once('value')
        .then((snapshot) => {
          setIsBusy(false);
          //console.log('User logged in, items: ', Object.keys(snapshot.val()));
          if (snapshot.val()) {
            setItemsObject(snapshot.val());
            setItemsKeys(Object.keys(snapshot.val()));
          } else setItemsObject({});
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
        data={sortedItemsKeys}
        ListEmptyComponent={<EmptyListPlaceholder />}
        keyExtractor={(item, index) => {
          return item;
        }}
        renderItem={({ item, index }) => {
          return (
            <Card
              data={itemsObject[item]}
              navigation={navigation}
              distance={(itemsObject[item]?.distance / 1000).toFixed(2)}
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
