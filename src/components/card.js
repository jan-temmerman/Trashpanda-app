import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// Components

export default function Card(props) {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.navigate('Detail', { data: props.data, date: props.date })}
      style={styles.card}
    >
      <View>
        <Text style={styles.title}>{props.date},</Text>
        <Text style={styles.title}>{props.data.city}</Text>
      </View>

      <View style={styles.widgetsContainer}>
        <View style={styles.widgetContainer}>
          <FontAwesome name={'walking'} size={24} color={'black'} />
          <Text style={styles.widgetText}>{props.distance} Km</Text>
        </View>

        <View style={styles.widgetContainer}>
          <FontAwesome name={'trash'} size={18} color={'black'} />
          <Text style={styles.widgetText}>{props.itemsCount}</Text>
        </View>

        <View style={styles.widgetContainer}>
          <FontAwesome name={'clock'} size={20} color={'black'} />
          <Text style={styles.widgetText}>{props.time}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    width: '94%',
    height: 112,
    marginBottom: 12,
    marginTop: 8,
    borderRadius: 24,
    alignSelf: 'center',
    padding: 14,
    paddingLeft: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 7,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 15,
    marginLeft: 0,
    fontFamily: 'Montserrat-Semibold',
  },
  widgetsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  widgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '33.33333%',
  },
  widgetText: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
});
