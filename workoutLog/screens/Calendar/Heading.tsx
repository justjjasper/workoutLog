import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPrevMonth, setNextMonth } from '../../actions';
import { RootState } from '../../App';
import Icon from 'react-native-vector-icons/Ionicons'

export default function Heading() {
  const dispatch = useDispatch();
  const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress= {() => dispatch(setPrevMonth())}
      >
        <Icon style= {styles.arrowIcon} name='arrow-back-outline'/>
      </TouchableOpacity>
      <Text style={styles.font}>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()} </Text>
      <TouchableOpacity
        onPress= {() => dispatch(setNextMonth())}
      >
        <Icon style= {styles.arrowIcon} name='arrow-forward-outline'/>
      </TouchableOpacity>
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
  },
  arrowIcon: {
    fontSize: 24,
    color: '#6941C6'
  }
})