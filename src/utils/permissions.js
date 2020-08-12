import { Alert, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const checkSpeechPermission = () => {
  check(PERMISSIONS.IOS.SPEECH_RECOGNITION)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            'Speech recognition is unavailable on this device.',
            'We were not able to ask permission to use this feature.',
            [{ text: 'OK', onPress: () => navigation.goBack() }],
            { cancelable: false },
          );
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.IOS.SPEECH_RECOGNITION).then((result) => checkSpeechPermission());
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission to use speech recognition is denied',
            'Permit access if you want to able to add items using your voice.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
            ],
            { cancelable: false },
          );
          break;
      }
    })
    .catch((error) => {
      // …
    });
};

export const checkMicPermission = () => {
  check(PERMISSIONS.IOS.MICROPHONE)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            'Using the microphone is unavailable on this device.',
            'We were not able to ask permission to use this feature.',
            [{ text: 'OK', onPress: () => navigation.goBack() }],
            { cancelable: false },
          );
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.IOS.MICROPHONE).then((result) => checkMicPermission());
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission to use the microphone is denied',
            'Permit access if you want to able to add items using your voice.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
            ],
            { cancelable: false },
          );
          break;
      }
    })
    .catch((error) => {
      // …
    });
};

export const checkLocationPermission = () => {
  check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            'Getting you location is unavailable on this device.',
            'We were not able to ask permission to use this feature.',
            [{ text: 'OK', onPress: () => navigation.goBack() }],
            { cancelable: false },
          );
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => checkMicPermission());
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission to get your location is denied',
            'Permit access if you want to add a recording.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => navigation.goBack(),
              },
              { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
            ],
            { cancelable: false },
          );
          break;
      }
    })
    .catch((error) => {
      // …
    });
};

export const checkCameraPermission = () => {
  check(PERMISSIONS.IOS.CAMERA)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          /*Alert.alert(
            'This feature is unavailable on this device.',
            'We were not able to ask permission to use this feature.',
            [{ text: 'OK', onPress: () => navigation.goBack() }],
            { cancelable: false },
          );*/
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.IOS.CAMERA).then((result) => checkCameraPermission());
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission to use the camera is denied',
            'Permit access to use the camera to add pictures to your items please.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
            ],
            { cancelable: false },
          );
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
      }
    })
    .catch((error) => {
      // …
    });
};
