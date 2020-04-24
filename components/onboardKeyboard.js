import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Components
import Heading from '../components/text/heading';
import Paragraph from '../components/text/paragraph';

export default OnboardMic = () => {
  
  return (
    <View style={{marginTop: 28,alignItems: 'center'}}>
			<View style={{width: '75%', marginBottom: 10}}>
				<Heading text={"Adding items using your microphone."} textAlign={"left"}/>
			</View>
			<View style={{width: '75%', flexDirection: 'row', justifyContent: 'space-between'}}>
			
			<View style={{alignItems: 'flex-end', marginRight: 4}}>
				<Text style={{
				fontSize: 38,
				marginTop: -16,
				fontFamily: 'Montserrat-Bold'
				}}>1</Text>
				<Text style={{
				fontSize: 38,
				marginBottom: 18,
				fontFamily: 'Montserrat-Bold'
				}}>2</Text>
				<Text style={{
				fontSize: 38,
				marginBottom: 14,
				fontFamily: 'Montserrat-Bold'
				}}>3</Text>
			</View>
			<View style={{width: '90%'}}>
					<Paragraph text={"Start every entry by saying 'start', the microphone will then start listening."} textAlign={"left"}/>
					<Paragraph text={"Then say the quantity and the name of the product you picked up. Snap a photo by adding the word ‘photo’ at the end."} textAlign={"left"}/>
					<Paragraph text={"Start every entry by saying 'start', the microphone will then start listening."} textAlign={"left"}/>
					<Paragraph text={"Repeat this for every group of products you find."} textAlign={"left"}/>
			</View>
			</View>
    </View>
  );
}

const styles = StyleSheet.create({
});
