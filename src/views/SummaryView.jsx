import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { YellowBox, StyleSheet, Text, View, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken('pk.eyJ1IjoiamFudGVtbWUiLCJhIjoiY2s5ZjBhM3Y5MDZwMDNubzdvb3E2Z2ZjNCJ9.zQuSQryovj4h_w6Eg6cmyg');

// Components
import Layout from '../components/layout';

export default function SummaryView({ route }) {
  YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
  const { data } = route.params;

  useEffect(() => {
    console.log(data);
    return;
  }, []);

  return (
    <Layout headerTitle={'Summary'}>
      <Text
        style={styles.heading}
      >{`${data.date.getUTCDate()}/${data.date.getUTCMonth()}/${data.date.getUTCFullYear()}`}</Text>
      <View style={{ width: '100%', height: '28%' }}>
        <MapboxGL.MapView
          showUserLocation={true}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={MapboxGL.StyleURL.Street}
          style={{ flex: 1, width: '100%', height: '20%' }}
        >
          <MapboxGL.Camera zoomLevel={12} centerCoordinate={[3.72377, 51.05]} />
        </MapboxGL.MapView>
      </View>
      <Image
        style={{ width: '90%', height: '20%', margin: 10, borderRadius: 10 }}
        source={{ uri: data.items[0].imageUri }}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 22,
    marginLeft: 20,
    margin: 10,
    fontFamily: 'Montserrat-Bold',
  },
});
