import { View, Button, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPrevMonth, setNextMonth } from '../../actions';
import { RootState } from '../../App';

export default function Heading() {
  const dispatch = useDispatch();
  const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);

  return (
    <View style={styles.container}>
      <Button
        title='&lt;'
        color='black'
        onPress = {() => dispatch(setPrevMonth())}
        />
      <Text style={styles.font}>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()} </Text>
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
    fontSize: 24,
    alignSelf: 'center'
  }
})