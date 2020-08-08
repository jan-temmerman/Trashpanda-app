import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Voice from '@react-native-community/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

// Components
import EmptyListPlaceholder from '../components/emptyListPlaceholder';
import Layout from '../components/layout';
import Heading from '../components/text/heading';
import Paragraph from '../components/text/paragraph';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Profile({ navigation }) {
  const [itemsList, setItemsList] = useState([]);
  const [itemsListRendered, setItemsListRendered] = useState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const photoWidth = windowWidth * 0.25;

  useEffect(() => {
    if (auth().currentUser) setUserLoggedIn(true);
    else setUserLoggedIn(false);

    auth().onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
        console.log(user);
        if (user.displayName) setUsername(user.displayName);
        else setUsername('');
        setEmail(user.email);
      } else setUserLoggedIn(false);
    });

    return;
  }, []);

  const updateProfile = () => {
    var user = auth().currentUser;

    user
      .updateProfile({
        displayName: username,
        photoURL: null,
      })
      .then(function (e) {
        console.log(e);
      })
      .catch(function (error) {
        console.log(error);
      });

    user
      .updateEmail(email)
      .then(function (e) {
        console.log(e);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const signOut = () => {
    auth()
      .signOut()
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (userLoggedIn)
    return (
      <Layout headerTitle="Profile">
        <TouchableOpacity style={styles.profileImage}>
          <Ionicons name={'md-person'} size={photoWidth} color={'black'} />
        </TouchableOpacity>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.textBoxContainer}>
            <TextInput
              placeholder="E.g. Peter Parker"
              returnKeyType="done"
              clearButtonMode="while-editing"
              placeholderTextColor="lightgray"
              selectionColor="black"
              style={styles.textInput}
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
          </View>
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.textBoxContainer}>
            <TextInput
              placeholder="E.g. peterparker@gmail.com"
              returnKeyType="done"
              clearButtonMode="while-editing"
              placeholderTextColor="lightgray"
              selectionColor="black"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.mainButton} onPress={() => updateProfile()}>
          <Text style={styles.mainButtonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secundaryButton} onPress={() => signOut()}>
          <Text style={styles.secundaryButtonText}>Logout</Text>
        </TouchableOpacity>
      </Layout>
    );
  else
    return (
      <Layout headerTitle="Profile">
        <View style={{ width: '75%', marginTop: 25 }}>
          <Heading text="You're not signed in." />

          <Paragraph text="You can continue to use the app without an account." />
          <Paragraph
            text="The items you pick up will be added to the database, but you won't be able to see your own recordings
            after you saved them."
          />
          <Paragraph text="Sign up if you want to keep track of your work!" />
          <Paragraph text="We only use your email to be able to show you your recordings." />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.mainButtonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secundaryButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.secundaryButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 22,
    marginBottom: 15,
    marginTop: 25,
    fontFamily: 'Montserrat-Extrabold',
  },
  text: {
    width: '80%',
    paddingLeft: 5,
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'Montserrat-Regular',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
});
