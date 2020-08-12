import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { YellowBox, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Dash from 'react-native-dash';
import Emoji from 'react-native-emoji';
import Octicons from 'react-native-vector-icons/Octicons';
MapboxGL.setAccessToken('pk.eyJ1IjoiamFudGVtbWUiLCJhIjoiY2s5ZjBhM3Y5MDZwMDNubzdvb3E2Z2ZjNCJ9.zQuSQryovj4h_w6Eg6cmyg');

// Components
import Layout from '../components/layout';
import StaticListItem from '../components/staticListItem';

export default function DetailView({ route, navigation }) {
  YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
  const { data, date } = route.params;
  const [previewModal, setPreviewModal] = useState(null);

  const showPreview = (index, imageUri) => {
    if (imageUri != '') {
      setPreviewModal(
        <View style={styles.previewModal}>
          <Image style={{ width: '100%', height: '100%', backgroundColor: 'red' }} source={{ uri: imageUri }} />
          <TouchableOpacity onPress={() => setPreviewModal(null)} style={styles.closeButton}>
            <Octicons name="x" size={38} color="#FFF" />
          </TouchableOpacity>
        </View>,
      );
    } else setPreviewModal(null);
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

  const renderTime = () => {
    const seconds = parseInt(data.time.substr(6, 2));
    const minutes = parseInt(data.time.substr(3, 2));
    const hours = parseInt(data.time.substr(0, 2));

    if (minutes < 1 && hours < 1) return `${seconds} seconds`;
    else if (minutes > 0 && hours < 1) return `${minutes} minutes`;
    else if (minutes > 0 && hours > 0) return `${hours} hours and ${minutes} minutes`;
    else return '0 seconds';
  };

  const renderDistance = () => {
    const distance = data.distance;
    const reversedDistance = distance.toString().split('').reverse().join('');

    if (distance < 1000) return `${distance} meters`;
    else {
      let meters = parseInt(reversedDistance.substr(0, 3).split('').reverse().join(''));
      let kilometers = parseInt(reversedDistance.substr(3, 2).split('').reverse().join(''));
      return ` ${kilometers} kilometers and ${meters} meters `;
    }
  };

  return (
    <Layout headerTitle={'Summary'} navigationObject={navigation} backButtonVisible={true}>
      {previewModal}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 0, alignItems: 'center' }}>
        <View style={{ width: '80%', alignSelf: 'flex-start', padding: 10 }}>
          <Text style={styles.heading}>
            {date.match(/^([^\s]+)/g)} {data.city}
          </Text>
        </View>
        <Text style={styles.normalText}>
          You spent <Text style={styles.normalText_bold}>{renderTime()}</Text> cleaning littered nature. You picked up{' '}
          <Text style={styles.normalText_bold}>
            {data.itemsAmount} {data.itemsAmount > 1 ? 'items' : 'item'}
          </Text>{' '}
          over a distance of <Text style={styles.normalText_bold}>{renderDistance()}</Text>.
        </Text>

        <Text style={styles.normalText_motivation}>
          Good Job! <Emoji name="heart_eyes" />
        </Text>
        <View style={{ width: '100%', height: 200 }}>
          <MapboxGL.MapView
            showUserLocation={true}
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            styleURL={MapboxGL.StyleURL.Street}
            style={{ flex: 1, width: '100%' }}
          >
            <MapboxGL.Camera
              zoomLevel={12}
              centerCoordinate={[data.items[0].geolocations[0].longitude, data.items[0].geolocations[0].latitude]}
            />
            {data.items.map((item, index) => {
              for (const [index2, geolocation] of item.geolocations.entries()) {
                return (
                  <MapboxGL.PointAnnotation
                    id={index.toString() + index2.toString()}
                    key={index.toString() + index2.toString()}
                    coordinate={[geolocation.longitude, geolocation.latitude]}
                  />
                );
              }
            })}
          </MapboxGL.MapView>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Text style={styles.statsLabel}>Time</Text>
            <Text style={styles.stat}>{data.time}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statContainer}>
            <Text style={styles.statsLabel}>Items</Text>
            <Text style={styles.stat}>{data.itemsAmount}</Text>
          </View>

          <View style={styles.divider} />

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
  heading: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 22,
    marginLeft: 20,
    fontFamily: 'Montserrat-Bold',
  },
  normalText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: windowWidth / 27,
    padding: 20,
    paddingTop: 0,
    fontFamily: 'Montserrat-Regular',
  },
  normalText_bold: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: windowWidth / 27,
    fontFamily: 'Montserrat-bold',
  },
  normalText_motivation: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: windowWidth / 27,
    padding: 20,
    paddingBottom: 10,
    marginTop: -40,
    fontFamily: 'Montserrat-Regular',
  },
  previewModal: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 20,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  closeButton: {
    zIndex: 21,
    position: 'absolute',
    top: 10,
    left: 20,
  },
  divider: {
    height: '100%',
    width: 1,
    borderLeftWidth: 1,
    borderColor: 'black',
  },
});
