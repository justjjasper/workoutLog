import { View, Text, StyleSheet } from 'react-native';

export default function Weekdays() {
  return (
    <View style={styles.container}>
      <Text>Sun</Text>
      <Text>Mon</Text>
      <Text>Tue</Text>
      <Text>Wed</Text>
      <Text>Thu</Text>
      <Text>Fri</Text>
      <Text>Sat</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    top: 8
  }
})