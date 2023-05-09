import { View, Button, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPrevMonth, setNextMonth } from '../../actions';

export default function SubHeading() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Button
        title='&lt;'
        color='black'
        onPress = {() => dispatch(setPrevMonth())}
        />
      <Button
        title='&gt;'
        color='black'
        onPress = {() => dispatch(setNextMonth())}
        />
      {/* <Text style={styles.font}>&lt;</Text>
      <Text style={styles.font}>&gt;</Text> */}
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