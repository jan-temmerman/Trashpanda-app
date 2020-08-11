import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, TextInput, Image, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import Layout from '../components/layout';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState();
  const [passwordErrorMessage, setPasswordErrorMessage] = useState();

  const signUp = () => {
    setIsBusy(true);
    if (password === repeatedPassword)
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((e) => {
          setIsBusy(false);
          navigation.goBack();
        })
        .catch(function (error) {
          setIsBusy(false);
          checkErrors(error.code);
        });
    else {
      checkErrors('auth/passwords-dont-match');
      setIsBusy(false);
    }
  };

  const checkErrors = (error) => {
    switch (error) {
      case 'auth/invalid-email':
        setEmailErrorMessage(<Text style={styles.error}>Badly formatted email address</Text>);
        setPasswordErrorMessage();
        break;
      case 'auth/email-already-in-use':
        setEmailErrorMessage(<Text style={styles.error}>Email is already in use</Text>);
        setPasswordErrorMessage();
        break;
      case 'auth/passwords-dont-match':
        setPasswordErrorMessage(<Text style={styles.error}>Passwords don&apos;t match</Text>);
        setEmailErrorMessage();
        break;
      case 'auth/weak-password':
        setPasswordErrorMessage(<Text style={styles.error}>Password must be 6 characters long</Text>);
        setEmailErrorMessage();
        break;
      case '':
        setEmailErrorMessage();
        setPasswordErrorMessage();
        break;
      default:
        setEmailErrorMessage(<Text style={styles.error}>Something went wrong</Text>);
        setPasswordErrorMessage();
        break;
    }
  };

  const renderButtonContent = () => {
    if (isBusy) return <ActivityIndicator size="small" color="#FFFFFF" />;
    else return <Text style={styles.mainButtonText}>Sign In</Text>;
  };

  return (
    <Layout headerTitle="Sign Up" navigationObject={navigation} backButtonVisible>
      <KeyboardAwareScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        extraScrollHeight={40}
      >
        <Image style={styles.image} source={require('../assets/images/profile.png')} resizeMode={'contain'} />

        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Email</Text>
            {emailErrorMessage}
          </View>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Password</Text>
            {passwordErrorMessage}
          </View>
          <View style={styles.textBoxContainer}>
            <TextInput
              placeholder="Password"
              returnKeyType="done"
              clearButtonMode="while-editing"
              placeholderTextColor="lightgray"
              selectionColor="black"
              keyboardType="default"
              secureTextEntry={true}
              textContentType="password"
              style={styles.textInput}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>Repeat Password</Text>
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
              onChangeText={(text) => setRepeatedPassword(text)}
              value={repeatedPassword}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.mainButton} onPress={() => signUp()}>
          {renderButtonContent()}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
  error: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 100,
    padding: 1,
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Montserrat-regular',
  },
});
