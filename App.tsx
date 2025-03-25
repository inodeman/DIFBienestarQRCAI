import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const QRScanner: React.FC = () => {
  const devices = useCameraDevices(); // Obtiene los dispositivos de cámara disponibles
  const [device, setDevice] = useState<any>(null); // Cámara seleccionada
  const [hasPermission, setHasPermission] = useState<boolean>(false); // Estado de permisos
  const [loading, setLoading] = useState<boolean>(true); // Indicador de carga

  useEffect(() => {
    // Solicita y verifica permisos de cámara
    (async () => {
      try {
        const status = await Camera.getCameraPermissionStatus();
        console.log('📸 Estado del permiso:', status);
        if (status !== 'authorized') {
          const newPermission = await Camera.requestCameraPermission();
          console.log('🔄 Estado actualizado:', newPermission);
          setHasPermission(newPermission === 'authorized');
        } else {
          setHasPermission(true);
        }
      } catch (error) {
        console.error('⚠️ Error al gestionar permisos:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  useEffect(() => {
    // Selecciona la cámara (prioriza trasera)
    if (devices) {
      const { back, front } = devices;
      if (back) {
        console.log('🎥 Cámara trasera detectada:', back);
        setDevice(back);
      } else if (front) {
        console.log('🎥 Cámara frontal detectada:', front);
        setDevice(front);
      } else {
        console.error('❌ No se detectaron cámaras.');
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
    return <Text style={styles.errorText}>⚠️ No hay cámaras disponibles</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true} // Activa la cámara
        frameProcessor={undefined} // Agrega un frameProcessor si es necesario
        onError={(error) => console.error('⚠️ Error en la cámara:', error)} // Manejo de errores
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