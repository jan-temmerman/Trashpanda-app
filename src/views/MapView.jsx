import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import MapboxGL from '@react-native-mapbox-gl/maps';

// Components
import Layout from '../components/layout';

MapboxGL.setAccessToken('pk.eyJ1IjoiamFudGVtbWUiLCJhIjoiY2s5ZjBhM3Y5MDZwMDNubzdvb3E2Z2ZjNCJ9.zQuSQryovj4h_w6Eg6cmyg');

export default function MapView() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    database()
      .ref('/recordings/anonymous')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach((key, index) => {
            for (const [index2, item] of snapshot.val()[key].items.entries()) {
              item.geolocations.forEach((geolocation) => {
                setPoints(prevState => [...prevState, geolocation]);
              })
            }
          })
        }
      });

    database()
      .ref('/recordings/users')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          Object.keys(snapshot.val()).map((uuid, index) => {
            Object.keys(snapshot.val()[uuid]).map((key, index2) => {
              for (const [index3, item] of snapshot.val()[uuid][key].items.entries()) {
                item.geolocations.forEach((geolocation) => {
                  setPoints(prevState => [...prevState, geolocation]);
                })
              }
            });
          })
        }
      });
    return;
  }, []);

  let id = 0;
  const getUniqueId = () => {
    id++;
    return id.toString();
  };

  return (
    <Layout headerTitle="Map">
      <MapboxGL.MapView
        showUserLocation
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        styleURL={MapboxGL.StyleURL.Street}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          borderRadius: 30,
          overflow: 'hidden',
        }}
      >
        <MapboxGL.Camera zoomLevel={7} centerCoordinate={[3.72377, 51.05]} />
        {points.map((point, index) => {
          return (
            <MapboxGL.PointAnnotation
              id={index.toString()}
              key={index.toString()}
              coordinate={[point.longitude, point.latitude]}
            />
          );
        })}
      </MapboxGL.MapView>
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
  header: {
    alignSelf: 'flex-start',
    fontSize: 38,
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
  },
  background: {
    backgroundColor: '#F7B917',
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
