import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const QRScanner: React.FC = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const devices = useCameraDevices();
    console.log('📷 Dispositivos de cámara detectados:', devices);
    const backDevice = devices.back;
    const frontDevice = devices.front;
  
    if (backDevice) {
      console.log('🎥 Cámara trasera detectada:', backDevice);
    }
    if (frontDevice) {
      console.log('🎥 Cámara frontal detectada:', frontDevice);
    }
  }, [devices]);
  
  useEffect(() => {
    (async () => {
      const status = await Camera.getCameraPermissionStatus();
      console.log('📸 Permiso de cámara:', status);
  
      const devices = useCameraDevices();
      console.log('📷 Todas las cámaras disponibles:', devices);
      
      if (!devices.back && !devices.front) {
        console.error('❌ No se detectó ninguna cámara en el dispositivo.');
      } else {
        console.log('✅ Cámara trasera:', devices.back);
        console.log('✅ Cámara frontal:', devices.front);
      }
    })();
  }, []);
  

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

  if (!device) {
    console.error('❌ No se detectó ninguna cámara en el dispositivo.');
    return <Text style={styles.errorText}>⚠️ No hay cámara disponible</Text>;
  }
  if (!hasPermission) {
    console.error('❌ No se tienen permisos de cámara.');
    return <Text style={styles.errorText}>🚫 Sin permisos de cámara</Text>;
  }

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
