import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Voice from '@react-native-community/voice';
import { RNCamera } from 'react-native-camera';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Components
import Layout from '../components/layout';

export default function CameraView({ route, navigation }) {
  const cameraRef = useRef(null);

  const [imageUri, setImageUri] = useState('');
  const [modal, setModal] = useState(null);

  const { itemIndex } = route.params;

  useEffect(() => {
    if (imageUri !== '') {
      setModal(
        <View
          style={{
            position: 'absolute',
            flex: 1,
            width: '100%',
            height: '100%',
            zIndex: 20,
            borderRadius: 30,
            overflow: 'hidden',
            justifyContent: 'flex-end',
          }}
        >
          <Image style={{ width: '100%', height: '100%' }} source={{ uri: imageUri }} />
          <TouchableOpacity
            onPress={() => setImageUri('')}
            style={{
              zIndex: 21,
              position: 'absolute',
              top: 10,
              left: 20,
            }}
          >
            <Octicons name="x" size={38} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewRecording', { itemIndex, imageUri })}
            style={styles.accept}
          >
            <Octicons name="check" size={38} color="#FFF" />
          </TouchableOpacity>
        </View>,
      );
    } else setModal(null);
  }, [imageUri]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImageUri(data.uri);
    }
  };

  return (
    <Layout headerTitle="Camera" navigationObject={navigation} backButtonVisible>
      {modal}

      <RNCamera
        ref={cameraRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          borderRadius: 30,
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      >
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 60,
          }}
        >
          <TouchableOpacity onPress={() => takePicture()} style={styles.capture}>
            <View style={styles.innerCapture} />
          </TouchableOpacity>
        </View>
      </RNCamera>
    </Layout>
  );
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    height: 80,
    width: 80,
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 40,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCapture: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#ffb800',
  },
  accept: {
    height: 80,
    width: 80,
    backgroundColor: 'black',
    borderRadius: 40,
    padding: 15,
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
