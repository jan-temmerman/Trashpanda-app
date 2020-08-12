import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
  Linking,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import OptionsMenu from 'react-native-options-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import Layout from '../components/layout';
import Heading from '../components/text/heading';
import Paragraph from '../components/text/paragraph';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Profile({ navigation }) {
  const [isBusy, setIsBusy] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState();
  const [usernameErrorMessage, setUserNameErrorMessage] = useState();

  const windowWidth = Dimensions.get('window').width;
  const photoWidth = windowWidth * 0.25;

  useEffect(() => {
    const user = auth().currentUser;
    checkErrors('');
    if (auth().currentUser) {
      setProfileImage(auth().currentUser.photoURL);
      setUserLoggedIn(true);
    } else setUserLoggedIn(false);

    auth().onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
        fillInFields(user);
        setProfileImage(user.photoURL);
      } else setUserLoggedIn(false);
    });

    return;
  }, []);

  const fillInFields = (user) => {
    if (user.displayName) setUsername(user.displayName);
    else setUsername('');
    setEmail(user.email);
  };

  const updateProfile = () => {
    setIsBusy(true);

    auth()
      .currentUser.updateProfile({
        displayName: username,
      })
      .then(() => {
        setIsBusy(false);
        checkErrors('');
      })
      .catch((error) => {
        setIsBusy(false);
        fillInFields(user);
        checkErrors(error.code);
      });

    auth()
      .currentUser.updateEmail(email)
      .then((e) => {
        setIsBusy(false);
        checkErrors('');
      })
      .catch((error) => {
        setIsBusy(false);
        fillInFields(user);
        checkErrors(error.code);
      });
  };

  const signOut = () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
      });
  };

  const checkErrors = (error) => {
    switch (error) {
      case 'auth/invalid-email':
        setEmailErrorMessage(<Text style={styles.error}>Badly formatted email address</Text>);
        setUserNameErrorMessage();
        break;
      case 'auth/email-already-in-use':
        setEmailErrorMessage(<Text style={styles.error}>Email is already in use</Text>);
        setUserNameErrorMessage();
        break;
      case 'auth/requires-recent-login':
        setEmailErrorMessage();
        setUserNameErrorMessage();
        Alert.alert(
          'Update profile',
          'To update your profile you need to be logged in recently. Please log out and sign in again.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'Log out', onPress: () => signOut() },
          ],
          { cancelable: false },
        );
        break;
      case '':
        setEmailErrorMessage();
        setUserNameErrorMessage();
        break;
      default:
        setUserNameErrorMessage(<Text style={styles.error}>Something went wrong</Text>);
        setEmailErrorMessage();
        break;
    }
  };

  const openImagePicker = () => {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          ImagePicker.openPicker({
            multiple: false,
            mediaType: 'photo',
            cropping: true,
            compressImageQuality: 0.1,
          })
            .then((photo) => {
              uploadImage(photo);
              setProfilePicture(photo);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (result === RESULTS.DENIED) {
          request(
            Platform.select({
              android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
            }),
          ).then(() => openImagePicker());
        } else
          return Alert.alert(
            'Permission to photo gallery denied',
            'Permit access to the photo gallery',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
            ],
            { cancelable: false },
          );
      })
      .catch((error) => console.log(error));
  };

  const getRefFromUrl = (url) => {
    return url
      .slice('https://firebasestorage.googleapis.com/v0/b/trashpanda-c9ff3.appspot.com/o/'.length, url.indexOf('?alt'))
      .replace(/%2F/g, '/');
  };

  const deleteCurrentImage = () => {
    const user = auth().currentUser;
    if (user.photoURL !== null && user.photoURL !== '')
      storage()
        .ref(getRefFromUrl(user.photoURL))
        .delete()
        .catch((error) => console.log(error));
  };

  const uploadImage = (photo) => {
    const user = auth().currentUser;

    storage()
      .ref(`users/${user.uid}/${photo.filename}`)
      .putFile(photo.path)
      .then((value) => {
        storage()
          .ref(`users/${user.uid}/${photo.filename}`)
          .getDownloadURL()
          .then((url) => {
            deleteCurrentImage();
            setProfileImage(url);
            user
              .updateProfile({
                photoURL: url,
              })
              .catch((error) => {
                console.log(error);
              });
          });
      })
      .catch((error) => console.log(error));
  };

  const deleteProfileImage = () => {
    const user = auth().currentUser;
    deleteCurrentImage();
    user
      .updateProfile({
        photoURL: '',
      })
      .then((e) => {
        setProfileImage(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderButtonContent = () => {
    if (isBusy) return <ActivityIndicator size="small" color="#FFFFFF" />;
    else return <Text style={styles.mainButtonText}>Update</Text>;
  };

  const renderProfileImage = () => {
    if (profileImage !== null && profileImage !== '')
      return (
        <OptionsMenu
          customButton={
            <View style={styles.profileImageContainer}>
              <Image style={styles.profileImage} resizeMode="contain" source={{ uri: profileImage }} />
            </View>
          }
          destructiveIndex={-1}
          options={['Choose new image', 'Delete current image', 'Cancel']}
          actions={[() => openImagePicker(), () => deleteProfileImage(), null]}
        />
      );
    else
      return (
        <TouchableOpacity style={styles.profileImageContainer} onPress={() => openImagePicker()}>
          <Ionicons style={styles.profilePlaceholder} name={'md-person'} size={photoWidth} color={'black'} />
        </TouchableOpacity>
      );
  };

  if (userLoggedIn)
    return (
      <Layout headerTitle="Profile">
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
          extraScrollHeight={40}
        >
          {renderProfileImage()}

          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.label}>Username</Text>
              {usernameErrorMessage}
            </View>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.label}>Email</Text>
              {emailErrorMessage}
            </View>
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

          <TouchableOpacity disabled={isBusy} style={styles.mainButton} onPress={() => updateProfile()}>
            {renderButtonContent()}
          </TouchableOpacity>

          <TouchableOpacity style={styles.secundaryButton} onPress={() => signOut()}>
            <Text style={styles.secundaryButtonText}>Logout</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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
  profileImageContainer: {
    marginTop: 30,
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
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profilePlaceholder: {
    paddingTop: photoWidth * 0.1,
  },
});
