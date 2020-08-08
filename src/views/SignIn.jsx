import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, TextInput, Image } from 'react-native';
import Voice from '@react-native-community/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

// Components
import EmptyListPlaceholder from '../components/emptyListPlaceholder';
import Layout from '../components/layout';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((e) => console.log(e))
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Layout headerTitle="Sign In" navigationObject={navigation} backButtonVisible>
      <Image style={styles.image} source={require('../assets/images/login.png')} resizeMode={'contain'} />

      <View style={{ marginTop: 30 }}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.textBoxContainer}>
          <TextInput
            placeholder="Example@gmail.com"
            returnKeyType="done"
            clearButtonMode="while-editing"
            placeholderTextColor="lightgray"
            selectionColor="black"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
      </View>

      <View style={{ marginBottom: 0 }}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.textBoxContainer}>
          <TextInput
            placeholder="Password"
            returnKeyType="done"
            clearButtonMode="while-editing"
            placeholderTextColor="lightgray"
            selectionColor="black"
            keyboardType="default"
            textContentType="password"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.mainButton} onPress={() => signIn()}>
        <Text style={styles.mainButtonText}>Sign In</Text>
      </TouchableOpacity>
    </Layout>
  );
}

const windowWidth = Dimensions.get('window').width;
const photoWidth = windowWidth * 0.25;

const styles = StyleSheet.create({
  textBoxContainer: {
    backgroundColor: 'white',
    width: '95%',
    height: 50,
    borderRadius: 50,
    padding: 4,
    paddingLeft: 18,
    marginBottom: 14,
    flexDirection: 'row',
  },
  textInput: {
    height: '100%',
    flex: 1,
    marginLeft: 4,
    color: 'black',
    fontSize: 16,
  },
  label: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 18,
    marginBottom: 2,
    paddingLeft: 14,
    fontFamily: 'Montserrat-Semibold',
  },
  profileImage: {
    marginTop: 30,
    paddingTop: photoWidth * 0.1,
    alignItems: 'center',
    overflow: 'hidden',
    width: photoWidth,
    height: photoWidth,
    borderRadius: photoWidth * 0.5,
    borderColor: 'black',
    borderWidth: 3,
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
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15,
    marginTop: 25,
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    width: '70%',
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 12,
    marginBottom: 15,
    fontFamily: 'Montserrat-Regular',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: '85%',
    alignSelf: 'center',
    height: 280,
    marginTop: 10,
    marginBottom: -30,
    resizeMode: 'contain',
  },
});
