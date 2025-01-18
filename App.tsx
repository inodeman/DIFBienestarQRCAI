import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const AppScanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const handleBarcodeRead = (e: { data: string }) => {
    setScannedData(e.data);
    setIsScanning(false);
  };

  const resetScanner = () => {
    setScannedData('');
    setIsScanning(true);
  };

  return (
    <View style={styles.container}>
      {isScanning ? (
        <QRCodeScanner
          onRead={handleBarcodeRead}
          topContent={<Text style={styles.centerText}>Escanea el código QR</Text>}
          bottomContent={
            <Button title="Cancelar" onPress={resetScanner} />
          }
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Datos Escaneados: {scannedData}</Text>
          <Button title="Volver a Escanear" onPress={resetScanner} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    margin: 32,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default AppScanner;
