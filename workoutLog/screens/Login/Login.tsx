import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Login () {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi Me</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E5E3',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 50
  }
})