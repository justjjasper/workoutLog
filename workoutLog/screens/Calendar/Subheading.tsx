import { View, Text, StyleSheet } from 'react-native';

export default function SubHeading() {
  return (
    <View style={styles.container}>
      <Text style={styles.font}>&lt;</Text>
      <Text style={styles.font}>&gt;</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  font: {
    fontSize: 20
  }
})