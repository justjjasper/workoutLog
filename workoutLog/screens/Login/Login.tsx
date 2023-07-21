import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Login () {
  return (
    <View style={styles.container}>
      <View style={styles.signUpContainer}>
      <Text style={styles.signUpText}>Sign Up</Text>
      </View>
      <View style={styles.form}>

      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E5E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 24,
    textDecorationLine: 'underline'
  },
  signUpContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    bottom: 180,
    paddingRight: 10
  },
  form : {
    height: '45%',
    width: '90%',
    borderWidth: 1,
    backgroundColor: '#FEFEFE',
    borderRadius: 5
  }
})