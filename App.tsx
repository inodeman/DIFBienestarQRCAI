import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
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
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { 
    flex: 1,
  },
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


// import React, { useState } from 'react';
// import { View, Text, Button, Alert, StyleSheet, ImageBackground } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';

// const AppScanner: React.FC = () => {
//   const [scannedData, setScannedData] = useState<string>('');
//   const [isScanning, setIsScanning] = useState<boolean>(true);

//   const handleBarcodeRead = async (e: { data: string }) => {
//     setScannedData(e.data);
//     setIsScanning(false);

//     // Divide el código QR escaneado en los datos esperados
//     const [studentName, schoolName] = e.data.split(',');

//     // Valida que los datos escaneados sean válidos
//     if (!studentName || !schoolName) {
//       Alert.alert('Error', 'El código QR no contiene datos válidos');
//       return;
//     }

//     try {
//       // Envía los datos al sistema Django
//       const response = await fetch('http://192.168.0.32:8000/api/attendance/register/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           student_name: studentName,
//           school_name: schoolName,
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         Alert.alert('Éxito', result.message || 'Asistencia registrada correctamente');
//       } else {
//         Alert.alert('Error', result.error || 'No se pudo registrar la asistencia');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
//       console.error(error);
//     }
//   };

//   const resetScanner = () => {
//     setScannedData('');
//     setIsScanning(true);
//   };

//   return (
//     <ImageBackground source={require('./assets/background.png')} style={styles.background}>
//       <View style={styles.container}>
//         {isScanning ? (
//           <QRCodeScanner
//             onRead={handleBarcodeRead}
//             topContent={<Text style={styles.centerText}>Escanea el código QR</Text>}
//             bottomContent={<Button title="Cancelar" onPress={resetScanner} />}
//           />
//         ) : (
//           <View style={styles.resultContainer}>
//             <Text style={styles.resultText}>Datos Escaneados: {scannedData}</Text>
//             <Button title="Volver a Escanear" onPress={resetScanner} />
//           </View>
//         )}
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     textAlign: 'center',
//     margin: 32,
//   },
//   resultContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
// });


// export default AppScanner;


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
// import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';

// const AppScanner: React.FC = () => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);

//   useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     })();
//   }, []);

//   const handleBarcodeScanned = () => {
//     if (barcodes.length > 0) {
//       const qrData = barcodes[0].content.data;
//       Alert.alert('Código Escaneado', qrData);
//       // Lógica para enviar el código al servidor o procesar los datos
//     }
//   };

//   if (device == null || !hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text>Esperando permisos o cámara...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         frameProcessor={frameProcessor}
//         frameProcessorFps={5}
//       />
//       <Button title="Procesar Código" onPress={handleBarcodeScanned} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default AppScanner;
