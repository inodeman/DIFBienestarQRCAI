import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const QRScanner: React.FC = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  if (!device) return <Text>No hay cámara disponible</Text>;
  if (!hasPermission) return <Text>Sin permisos de cámara</Text>;

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} device={device} isActive={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { width: '100%', height: '100%' },
});

export default QRScanner;
