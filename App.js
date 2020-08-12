import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';

// Views
import MyRecordings from './src/views/MyRecordings';
import Profile from './src/views/Profile';
import MapView from './src/views/MapView';
import AddRecording from './src/views/AddRecording';
import NewRecording from './src/views/NewRecording';
import CameraView from './src/views/CameraView';
import SummaryView from './src/views/SummaryView';
import DetailView from './src/views/DetailView';
import SignIn from './src/views/SignIn';
import SignUp from './src/views/SignUp';
import SaveData from './src/views/SaveData';
import NoConnection from './src/views/NoConnection';

function OnboardStack() {
  const OnboardStack = createStackNavigator();

  return (
    <OnboardStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardStack.Screen name="MyRecordings" component={MyRecordings} />
      <OnboardStack.Screen name="Detail" initialParams={{ data: null }} component={DetailView} />
    </OnboardStack.Navigator>
  );
}

function HomeTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="MyRecordings"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: function Icon({ focused, color, size }) {
          let iconName;

          if (route.name === 'MyRecordings') {
            iconName = 'ios-list';
          } else if (route.name === 'MapView') {
            iconName = 'md-map';
          } else if (route.name === 'Profile') {
            iconName = 'md-person';
          }

          return <Ionicons name={iconName} size={34} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        activeBackgroundColor: '#EFEFEF',
        inactiveTintColor: 'black',
        showLabel: false,
        size: 30,
        style: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFF',
          position: 'absolute',
          padding: 2,
          paddingLeft: 18,
          paddingRight: 18,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        },
        tabStyle: {
          borderRadius: 8,
          margin: 2,
        },
      }}
    >
      <Tab.Screen name="MapView" component={MapView} />
      <Tab.Screen name="MyRecordings" component={OnboardStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const RecordingsStack = createStackNavigator();

  const [hasConnection, setHasConnection] = useState(true);

  useEffect(() => {
    console.disableYellowBox = true;
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setHasConnection(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (hasConnection)
    return (
      <NavigationContainer>
        <RecordingsStack.Navigator screenOptions={{ headerShown: false }}>
          <RecordingsStack.Screen name="HomeTabs" component={HomeTabs} />
          <RecordingsStack.Screen name="AddRecording" component={AddRecording} />
          <RecordingsStack.Screen name="SignUp" component={SignUp} />
          <RecordingsStack.Screen name="SignIn" component={SignIn} />
          <RecordingsStack.Screen name="Detail" initialParams={{ data: null }} component={DetailView} />
          <RecordingsStack.Screen name="SaveData" initialParams={{ data: null }} component={SaveData} />
          <RecordingsStack.Screen
            options={{ gestureEnabled: true }}
            name="NewRecording"
            component={NewRecording}
            initialParams={{ itemIndex: null, imageUri: null }}
          />
          <RecordingsStack.Screen
            options={{ gestureEnabled: true }}
            name="SummaryView"
            component={SummaryView}
            initialParams={{ data: null }}
          />
          <RecordingsStack.Screen options={{ gestureEnabled: true }} name="CameraView" component={CameraView} />
        </RecordingsStack.Navigator>
      </NavigationContainer>
    );
  else return <NoConnection />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    alignSelf: 'flex-start',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
