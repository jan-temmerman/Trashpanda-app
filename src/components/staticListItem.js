import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Dash from 'react-native-dash';

export default function StaticListItem(props) {
  let imageButton = <View style={styles.emptyPlaceHolder} />;

  if (props.imageUri !== '' && props.imageUri !== null) {
    imageButton = (
      <TouchableOpacity onPress={() => props.showPreview(props.index, props.imageUri)} style={styles.cameraButton2}>
        <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} source={{ uri: props.imageUri }} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ width: '100%' }}>
      <View>
        <View style={styles.itemContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>{props.itemAmount}x</Text>
            </View>

            <Text style={styles.itemText} numberOfLines={1}>
              {props.itemName}
            </Text>
          </View>

          {imageButton}
        </View>
        <Dash style={{ width: '100%', height: 1 }} dashGap={2} dashLength={12} dashColor={'#DDDADA'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  minusButton: {
    paddingTop: 1,
    paddingLeft: 1,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    paddingTop: 4,
    paddingLeft: 1,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#ffb800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  amountText: {
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Montserrat-Regular',
  },
  emptyPlaceHolder: {
    width: 42,
    height: 42,
  },
  cameraButton2: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 0,
    paddingBottom: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
