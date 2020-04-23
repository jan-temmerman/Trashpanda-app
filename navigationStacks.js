import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Views
import MyRecordings from './views/MyRecordings';
import Profile from './views/Profile';
import MapView from './views/MapView';
import AddRecording from './views/AddRecording';

const RecordingsStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <RecordingsStack.Navigator>
      <RecordingsStack.Screen name="MyRecordings" component={MyRecordings} />
      <RecordingsStack.Screen name="AddRecording" component={AddRecording} />
    </RecordingsStack.Navigator>
  );
}
