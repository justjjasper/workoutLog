import { Text, View, StyleSheet } from 'react-native';
import Calendar from './Calendar/Calendar';

export default function Home () {
  return (
    <View style={styles.container}>
      <Text> I'm a home screen :D</Text>
      <Calendar/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  }
})