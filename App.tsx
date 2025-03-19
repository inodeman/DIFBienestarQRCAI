import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const QRScanner: React.FC = () => {
  const devices = useCameraDevices();
  const [device, setDevice] = useState<any>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const status = await Camera.getCameraPermissionStatus();
      console.log('📸 Estado del permiso de la cámara:', status);

      if (status !== 'authorized') {
        const newPermission = await Camera.requestCameraPermission();
        console.log('🔄 Nuevo estado del permiso:', newPermission);
        setHasPermission(newPermission === 'authorized');
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!devices || Object.keys(devices).length === 0) {
      console.error('❌ No se detectaron cámaras en el dispositivo.');
      return;
    }

    console.log('📷 Dispositivos de cámara detectados:', devices);

    if (devices.back) {
      console.log('🎥 Cámara trasera detectada:', devices.back);
      setDevice(devices.back);
    } else if (devices.front) {
      console.log('🎥 No se detectó cámara trasera, usando cámara frontal:', devices.front);
      setDevice(devices.front);
    } else {
      console.error('❌ No se detectó ninguna cámara en el dispositivo.');
    }

    setLoading(false);
  }, [devices]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Cargando cámaras...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return <Text style={styles.errorText}>🚫 Sin permisos de cámara</Text>;
  }

  if (!device) {
    return <Text style={styles.errorText}>⚠️ No hay cámara disponible</Text>;
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
  errorText: { color: 'red', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default QRScanner;
