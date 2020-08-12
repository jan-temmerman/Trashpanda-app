import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ActivityIndicator, Modal, Alert, Linking } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Octicons from 'react-native-vector-icons/Octicons';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { checkCameraPermission } from '../utils/permissions';

// Components
import Layout from '../components/layout';

export default function CameraView({ route, navigation }) {
  const cameraRef = useRef(null);

  const [imagePath, setimagePath] = useState('');
  const [modal, setModal] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const { itemIndex } = route.params;

  const renderButtonContent = () => {
    if (isBusy) return <ActivityIndicator size="small" color="#FFFFFF" />;
    else return <Octicons name="check" size={38} color="#FFF" />;
  };

  useEffect(() => {
    checkCameraPermission();
    return;
  }, []);

  useEffect(() => {
    if (imagePath !== '') setModalIsVisible(true);
  }, [imagePath]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.8, base64: false };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data);
      setimagePath(data.uri);
    }
  };

  const getImageUrl = () => {
    setIsBusy(true);
    const name = new Date();
    const user = auth().currentUser;

    storage()
      .ref(`users/${user.uid}/recordings/images/${name}`)
      .putFile(imagePath)
      .then(() => {
        storage()
          .ref(`users/${user.uid}/recordings/images/${name}`)
          .getDownloadURL()
          .then((imageUri) => {
            console.log(imageUri);
            setIsBusy(false);
            navigation.navigate('NewRecording', { itemIndex, imageUri });
          });
      })
      .catch((error) => {
        console.log(error);
        setIsBusy(false);
      });
  };

  return (
    <Layout headerTitle="Camera" navigationObject={navigation} backButtonVisible>
      <Modal visible={modalIsVisible} style={styles.modal}>
        <Image style={{ width: '100%', height: '100%', backgroundColor: 'red' }} source={{ uri: imagePath }} />
        <TouchableOpacity onPress={() => setModalIsVisible(false)} style={styles.closeModalButton}>
          <Octicons name="x" size={38} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity disabled={isBusy} onPress={() => getImageUrl()} style={styles.accept}>
          {renderButtonContent()}
        </TouchableOpacity>
      </Modal>

      <RNCamera
        ref={cameraRef}
        style={styles.cameraView}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      >
        <View style={styles.captureButtonContainer}>
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
  closeModalButton: {
    zIndex: 21,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  captureButtonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  modal: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 20,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cameraView: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
