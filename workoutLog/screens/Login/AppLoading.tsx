import { Text, View, StyleSheet,ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import LoadingSpinnerOverlay from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppLoading (){
  return (
    // <LinearGradient
    // colors={['#6941C6','#9B78ED','#DDCBEB']}
    // locations= {[0, 0.2, 0.8]}
    // start={{ x: 0.7, y: 0 }}
    // style= {styles.container}
    // >
    <View style= {styles.container}>
      <LoadingSpinnerOverlay
        visible= {true}
      />

      <ImageBackground
        source = {require('../../assets/images/splashArt.png')}
        style={styles.backgroundImage}
      />


      </View>
    // </LinearGradient>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1, // Make the image take up the entire available space
    width: '100%', // Width should cover the entire screen width
    height: '100%', // Height should cover the entire screen height
    resizeMode: 'cover', // Ensure the image covers the screen
    position: 'absolute', // Position the image absolutely within its parent
  },
})