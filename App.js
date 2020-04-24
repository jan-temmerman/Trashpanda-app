import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Views
import MyRecordings from './views/MyRecordings';
import Profile from './views/Profile';
import MapView from './views/MapView';
import AddRecording from './views/AddRecording';
import NewRecording from './views/NewRecording';

function OnboardStack() {
  const OnboardStack = createStackNavigator();

  return (
    <OnboardStack.Navigator screenOptions={{headerShown: false}}>
      <OnboardStack.Screen name="MyRecordings" component={MyRecordings} />
      <OnboardStack.Screen name="AddRecording" component={AddRecording} />
    </OnboardStack.Navigator>
  );
}

function HomeTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="MyRecordings"
      screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'MyRecordings') {
          iconName = 'ios-list'
        } else if (route.name === 'MapView') {
          iconName = 'md-map'
        } else if (route.name === 'Profile') {
          iconName = 'md-person'
        }

        return <Ionicons name={iconName} size={34} color={color}/>;
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
          backgroundColor:"#FFF",
          position:'absolute',
          padding: 2,
          paddingLeft: 18,
          paddingRight: 18,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        },
        tabStyle: {
          borderRadius: 8,
          margin: 2,
        }
    }}>
      <Tab.Screen name="MapView" component={MapView}/>
      <Tab.Screen name="MyRecordings" component={OnboardStack}/>
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  );
}

export default App = () => {

  const RecordingsStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RecordingsStack.Navigator screenOptions={{headerShown: false}}>
        <RecordingsStack.Screen name="HomeTabs" component={HomeTabs} />
        <RecordingsStack.Screen name="AddRecording" component={AddRecording} />
        <RecordingsStack.Screen options={{ gestureEnabled: true }} name="NewRecording" component={NewRecording} />
      </RecordingsStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    alignSelf: 'flex-start'
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
