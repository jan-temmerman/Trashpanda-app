import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { YellowBox, StyleSheet, Text, View, Dimensions } from 'react-native';
import Emoji from 'react-native-emoji';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken('pk.eyJ1IjoiamFudGVtbWUiLCJhIjoiY2s5ZjBhM3Y5MDZwMDNubzdvb3E2Z2ZjNCJ9.zQuSQryovj4h_w6Eg6cmyg');

// Components
import Layout from '../components/layout';
import paragraph from '../components/text/paragraph';

export default function DetailView({ route, navigation }) {
  YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
  const { data } = route.params;
  const [date, setDate] = useState('17/03/1999');

  useEffect(() => {
    console.log(data);
    setDate('03/08/2020');
    return;
  }, []);

  return (
    <Layout headerTitle={date} navigationObject={navigation} backButtonVisible>
      <Text style={styles.normalText}>
        You spent <Text style={styles.normalText_bold}>43 minutes</Text> cleaning littered nature. You picked up{' '}
        <Text style={styles.normalText_bold}>132 items</Text> over a distance of{' '}
        <Text style={styles.normalText_bold}>3 kilometers</Text>.
      </Text>

      <Text style={styles.normalText_motivation}>
        Good Job! <Emoji name="heart_eyes" />
      </Text>

      <View style={{ width: '100%', height: '28%' }}>
        <MapboxGL.MapView
          showUserLocation={true}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={MapboxGL.StyleURL.Street}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <MapboxGL.Camera zoomLevel={12} centerCoordinate={[3.72377, 51.05]} />
        </MapboxGL.MapView>
      </View>
      <Text style={styles.heading}>{data.date}</Text>
    </Layout>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 22,
    marginLeft: 20,
    margin: 10,
    fontFamily: 'Montserrat-Bold',
  },
  normalText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: windowWidth / 27,
    padding: 20,
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
    marginTop: -40,
    fontFamily: 'Montserrat-Regular',
  },
});
