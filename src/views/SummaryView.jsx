import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  YellowBox,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Dash from 'react-native-dash';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Octicons from 'react-native-vector-icons/Octicons';
MapboxGL.setAccessToken('pk.eyJ1IjoiamFudGVtbWUiLCJhIjoiY2s5ZjBhM3Y5MDZwMDNubzdvb3E2Z2ZjNCJ9.zQuSQryovj4h_w6Eg6cmyg');

// Components
import Layout from '../components/layout';
import StaticListItem from '../components/staticListItem';

export default function SummaryView({ route, navigation }) {
  YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
  const { data } = route.params;
  const [city, setCity] = useState('');
  const [previewModal, setPreviewModal] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    console.log(data);
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data.items[0].geolocations[0].latitude}&longitude=${data.items[0].geolocations[0].longitude}&localityLanguage=nl`,
    )
      .then((response) => response.json())
      .then((geodata) => setCity(geodata.city));
    return;
  }, []);

  const formatDate = (number) => {
    if (number < 10) number = `0${Math.floor(number).toFixed(0)}`;
    else number = Math.floor(number).toFixed(0);

    return number;
  };

  const showPreview = (index, imageUri) => {
    if (imageUri != '') {
      setPreviewModal(
        <View
          style={{
            position: 'absolute',
            flex: 1,
            width: '100%',
            height: '100%',
            zIndex: 20,
            borderRadius: 30,
            overflow: 'hidden',
            justifyContent: 'flex-end',
          }}
        >
          <Image style={{ width: '100%', height: '100%', backgroundColor: 'red' }} source={{ uri: imageUri }} />
          <TouchableOpacity
            onPress={() => setPreviewModal(null)}
            style={{
              zIndex: 21,
              position: 'absolute',
              top: 10,
              left: 20,
            }}
          >
            <Octicons name="x" size={38} color="#FFF" />
          </TouchableOpacity>
        </View>,
      );
    } else setPreviewModal(null);
  };

  const sendData = () => {
    setIsBusy(true);
    data.city = city;

    if (auth().currentUser)
      database()
        .ref(`/recordings/users/${auth().currentUser.uid}/${data.date}/`)
        .set(data)
        .then(() => {
          setIsBusy(false);
          navigation.navigate('MyRecordings');
        });
    else {
      setIsBusy(false);
      navigation.navigate('SaveData', { data });
    }
    /*database()
        .ref(`/recordings/anonymous/${data.date}/`)
        .set(data)
        .then(() => {
          setIsBusy(false);
          navigation.navigate('MyRecordings');
        });*/
  };

  const confirmDiscard = () => {
    Alert.alert(
      'Discard this recording?',
      `You are about to delete your whole recording with al the items and images added, are you sure?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => navigation.navigate('MyRecordings') },
      ],
      { cancelable: false },
    );
  };

  let itemsList;

  if (data.items.length) {
    itemsList = data.items.map((item, index) => (
      <StaticListItem
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
    ));
  } else {
    itemsList = <Text style={styles.itemsListEmptyText}>No items added yet.</Text>;
  }

  const renderButtonContent = () => {
    if (isBusy) return <ActivityIndicator size="small" color="#FFFFFF" />;
    else return <Text style={styles.mainButtonText}>Save</Text>;
  };

  return (
    <Layout headerTitle={'Summary'} navigationObject={navigation} backButtonVisible={true}>
      {previewModal}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 0, alignItems: 'center' }}>
        <Text style={styles.heading}>
          {`${formatDate(data.date.getUTCDate())}/${formatDate(data.date.getUTCMonth())}/${data.date.getUTCFullYear()}`}
          , {city}
        </Text>
        <View style={{ width: '100%', height: 200 }}>
          <MapboxGL.MapView
            showUserLocation={true}
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            styleURL={MapboxGL.StyleURL.Street}
            style={{ flex: 1, width: '100%' }}
          >
            <MapboxGL.Camera zoomLevel={12} centerCoordinate={[3.72377, 51.05]} />
          </MapboxGL.MapView>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Text style={styles.statsLabel}>Time</Text>
            <Text style={styles.stat}>{data.time}</Text>
          </View>

          <View style={{ height: '100%', width: 1, borderLeftWidth: 1, borderColor: 'black' }} />

          <View style={styles.statContainer}>
            <Text style={styles.statsLabel}>Items</Text>
            <Text style={styles.stat}>{data.itemsAmount}</Text>
          </View>

          <View style={{ height: '100%', width: 1, borderLeftWidth: 1, borderColor: 'black' }} />

          <View style={styles.statContainer}>
            <Text style={styles.statsLabel}>Distance</Text>
            <Text style={styles.stat}>{(data.distance / 1000).toFixed(2)}KM</Text>
          </View>
        </View>

        <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10, paddingBottom: 140 }}>
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Items list</Text>

            <Dash style={{ width: '100%', height: 1 }} dashGap={2} dashLength={12} dashColor="#707070" />

            {itemsList}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          padding: 14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: 30,
          paddingBottom: 60,
          bottom: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 4.65,
          elevation: 7,
        }}
      >
        <TouchableOpacity style={styles.secundaryButton} onPress={() => confirmDiscard()}>
          <Text style={styles.secundaryButtonText}>Discard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton} disabled={isBusy} onPress={() => sendData()}>
          {renderButtonContent()}
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 22,
    marginLeft: 25,
    margin: 14,
    fontFamily: 'Montserrat-Bold',
  },
  statsLabel: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  stat: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Montserrat-Semibold',
  },
  statsContainer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  statContainer: {
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
    padding: 16,
    paddingTop: 14,
  },
  itemsListEmptyText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
    marginTop: 10,
  },
  listTitle: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
  },
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  mainButton: {
    width: windowWidth * 0.4,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 1000,
    justifyContent: 'center',
  },
  mainButtonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-regular',
    color: 'white',
  },
  secundaryButton: {
    width: windowWidth * 0.4,
    height: 50,
    justifyContent: 'center',
  },
  secundaryButtonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-regular',
    color: 'black',
  },
});
