import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken('pk.eyJ1IjoiamFudGVtbWUiLCJhIjoiY2s5ZjBhM3Y5MDZwMDNubzdvb3E2Z2ZjNCJ9.zQuSQryovj4h_w6Eg6cmyg');

// Components
import Layout from '../components/layout';

export default SummaryView = ({route}) => {
  const { data } = route.params;

  return (
    <Layout headerTitle={"Summary"}>
      <Text style={styles.heading}>{`${data.date.getUTCDate()}/${data.date.getUTCMonth()}/${data.date.getUTCFullYear()}`}</Text>
      <View style={{width: '100%', height: '28%'}}>
        <MapboxGL.MapView
            showUserLocation={true}
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            styleURL={MapboxGL.StyleURL.Street}
            style={{flex: 1, width: '100%', height: '20%'}}
          >
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={[3.72377, 51.05]}
          />
        </MapboxGL.MapView>
      </View>
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
