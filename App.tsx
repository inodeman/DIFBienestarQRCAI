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
      try {
        const status = await Camera.getCameraPermissionStatus();
        if (status !== 'authorized') {
          const newPermission = await Camera.requestCameraPermission();
          setHasPermission(newPermission === 'authorized');
        } else {
          setHasPermission(true);
        }
      } catch (error) {
        console.error('⚠️ Error al solicitar permisos de cámara:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (devices) {
      const { back, front } = devices;
      if (back) {
        setDevice(back);
      } else if (front) {
        setDevice(front);
      }
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
    return <Text style={styles.errorText}>🚫 No se otorgaron permisos de cámara</Text>;
  }

  if (!device) {
    return <Text style={styles.errorText}>⚠️ No hay cámara disponible</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        frameProcessor={undefined} // Si implementas un procesador de frames
      />
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