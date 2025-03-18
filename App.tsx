import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const QRScanner: React.FC = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.getCameraPermissionStatus();
      console.log('📸 Estado del permiso de la cámara:', cameraStatus);

      if (cameraStatus !== 'authorized') {
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log('🔄 Nuevo estado del permiso:', newCameraPermission);
        setHasPermission(newCameraPermission === 'authorized');
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  useEffect(() => {
    console.log('📷 Dispositivos de cámara detectados:', devices);
    console.log('🎥 Cámara trasera detectada:', device);
  }, [devices]);

  if (!device) return <Text style={styles.errorText}>⚠️ No hay cámara disponibleeeeee</Text>;
  if (!hasPermission) return <Text style={styles.errorText}>🚫 Sin permisos de cámara</Text>;

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} device={device} isActive={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { width: '100%', height: '100%' },
  errorText: { color: 'red', fontSize: 18, fontWeight: 'bold' },
});

export default QRScanner;
