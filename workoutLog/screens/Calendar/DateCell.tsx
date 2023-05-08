import { View, Text, StyleSheet, Alert, AlertButton, TouchableOpacity } from 'react-native';

interface DateCellProps {
  day: string | number | null,
  month: number
}
export default function DateCell(props: DateCellProps) {
  const { day, month } = props;

  // data below is for testing console logs
  // Get current date
  const today = new Date();

  // Get number of days in the current month
  const year = today.getFullYear();
  const numDaysInMonth = new Date(year, month, 0).getDate();
  ///////


  const handlePress = (): void => {
    const buttons: AlertButton[] = [
      {
        text: 'Cancel It',
        onPress: (): void => console.log('what is the num of days in may',day)
      }
    ]

    Alert.alert('it got pressed', undefined, buttons)
  }

  const monthName = new Date(year, month).toLocaleString('en-us', { month: 'long' });

  if (day === 1) {
    return (
      <TouchableOpacity
      style={styles.dateCell}
      onPress = {handlePress}
      >
      <Text style={styles.text}>{monthName.slice(0, 3)} {day}</Text>
    </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity
      style={styles.dateCell}
      onPress = {handlePress}
      >
      <Text style={styles.text}>{day}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dateCell : {
    borderWidth: 0.4,
    borderColor: 'black',
    padding: 1,
    width: 51,
    height: 51,
    flexWrap: 'wrap',
    textAlign: 'right'
  },
  text: {
    textAlign: 'right',
    width: '100%'
  }
})