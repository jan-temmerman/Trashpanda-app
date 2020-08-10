import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { YellowBox, StyleSheet, Text, View, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Dash from 'react-native-dash';
MapboxGL.setAccessToken('pk.eyJ1IjoiamFudGVtbWUiLCJhIjoiY2s5ZjBhM3Y5MDZwMDNubzdvb3E2Z2ZjNCJ9.zQuSQryovj4h_w6Eg6cmyg');

// Components
import Layout from '../components/layout';
import ListItem from '../components/listItem';

export default function SummaryView({ route, navigation }) {
  YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
  const { data } = route.params;
  const [city, setCity] = useState('');

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

  let itemsList;

  if (data.items.length) {
    itemsList = data.items.map((item, index) => (
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
    ));
  } else {
    itemsList = <Text style={styles.itemsListEmptyText}>No items added yet.</Text>;
  }

  return (
    <Layout headerTitle={'Summary'}>
      <Text style={styles.heading}>
        {`${formatDate(data.date.getUTCDate())}/${formatDate(data.date.getUTCMonth())}/${data.date.getUTCFullYear()}`},{' '}
        {city}
      </Text>
      <View style={{ width: '100%', height: '25%' }}>
        <MapboxGL.MapView
          showUserLocation={true}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={MapboxGL.StyleURL.Street}
          style={{ flex: 1, width: '100%', height: '20%' }}
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

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Current list</Text>

        <Dash style={{ width: '100%', height: 1 }} dashGap={2} dashLength={12} dashColor="#707070" />

        {itemsList}
      </View>
    </Layout>
  );
}

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
    minHeight: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
    padding: 16,
    paddingTop: 14,
    paddingBottom: 300,
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
});
