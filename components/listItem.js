import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Dash from 'react-native-dash';

export default ListItem = (props) => {
  let imageButton = 
    <TouchableOpacity onPress={() => props.navigation.navigate('CameraView', { itemIndex: props.index })} style={styles.cameraButton}>
      <Feather name={'camera'} size={24} color={'gray'}/>
    </TouchableOpacity>

  if(props.imageUri != "") {
    imageButton = 
      <TouchableOpacity onPress={() => props.showPreview(props.index, props.imageUri)} style={styles.cameraButton2}>
        <Image style={{width: '100%', height: '100%', borderRadius: 10}} source={{uri: props.imageUri}}/>
      </TouchableOpacity>
  }

  return (
    <TouchableHighlight onLongPress={() => props.askForDeletion(props.itemAmount, props.itemName, props.index)} underlayColor="lightgray" style={{width: '100%'}}>
      <View>
        <View style={styles.itemContainer}>

          <View style={styles.amountContainer}>
            <TouchableOpacity onPress={() => props.updateAmount(props.index, 'decrement')} style={styles.minusButton}>
                <AntDesign name={'minus'} size={34} color={'white'}/>
            </TouchableOpacity>

            <Text style={styles.amountText}>{props.itemAmount}</Text>

            <TouchableOpacity onPress={() => props.updateAmount(props.index, 'increment')} style={styles.plusButton}>
                <AntDesign name={'plus'} size={28} color={'black'}/>
            </TouchableOpacity>
          </View>

          <Text style={styles.itemText} numberOfLines={1}>{props.itemName}</Text>

          {imageButton}

        </View>
        <Dash style={{width:'100%', height: 1}} dashGap={2} dashLength={12} dashColor={"#DDDADA"} />
      </View>
    </TouchableHighlight>
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
    justifyContent: 'center'
  },
  plusButton: {
    paddingTop: 4,
    paddingLeft: 1,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#ffb800',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    alignSelf: 'center',
    fontSize: 16,
    width: '50%',
    fontFamily: 'Montserrat-Regular',
  },
  amountText: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  cameraButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 1,
    paddingBottom: 1
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
    paddingBottom: 0
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
    width: '32%', 
    justifyContent: 'space-between'
  },
});
