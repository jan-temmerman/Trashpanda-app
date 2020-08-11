import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// Components
import Layout from '../components/layout';
import Heading from '../components/text/heading';
import Paragraph from '../components/text/paragraph';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SaveData({ route, navigation }) {
  const [isBusy, setIsBusy] = useState(false);
  const [isBusy2, setIsBusy2] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const photoWidth = windowWidth * 0.25;
  const { data } = route.params;

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        sendData();
      }
    });

    return;
  }, []);

  const renderButtonContent = () => {
    if (isBusy) return <ActivityIndicator size="small" color="#FFFFFF" />;
    else return <Text style={styles.mainButtonText}>Save without an account</Text>;
  };

  const renderLoadingSpinner = () => {
    if (isBusy2)
      return (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.secundaryButtonText}>
            Saving data...
            <ActivityIndicator size="small" color="#000000" />
          </Text>
        </View>
      );
    else return <></>;
  };

  const sendData = () => {
    if (auth().currentUser) {
      setIsBusy2(true);
      database()
        .ref(`/recordings/users/${auth().currentUser.uid}/${data.date}/`)
        .set(data)
        .then(() => {
          setIsBusy2(false);
          navigation.navigate('MyRecordings');
        });
    } else {
      setIsBusy(true);
      database()
        .ref(`/recordings/anonymous/${data.date}/`)
        .set(data)
        .then(() => {
          setIsBusy(false);
          navigation.navigate('MyRecordings');
        });
    }
  };

  return (
    <Layout headerTitle="Save Data" navigationObject={navigation} backButtonVisible>
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
      <TouchableOpacity style={styles.bigButton} onPress={() => sendData()}>
        {renderButtonContent()}
      </TouchableOpacity>
      {renderLoadingSpinner()}
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
  bigButton: {
    width: windowWidth * 0.8,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 1000,
    marginTop: 30,
    justifyContent: 'center',
  },
});
