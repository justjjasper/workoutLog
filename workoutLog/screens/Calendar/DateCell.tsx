import { useState } from 'react';
import { View, Text, StyleSheet, Alert, AlertButton, TouchableOpacity } from 'react-native';
import { toggleModal } from '../../actions';
import { Activity } from '../../types';
import Modal from 'react-native-modal';
import DateCellModal from './DateCellModal';

// implement DateCellModal Below
// implement AddActivityNameModal Below???

interface DateCellProps {
  day: string | number | null,
  month: number,
  isOutsideMonth: boolean,
  activities: Activity[]
};


export default function DateCell(props: DateCellProps) {
  const { day, month, isOutsideMonth, activities } = props; // might need to incorporate year/ todays date

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  // Get current date
  const today = new Date();
  // Get number of days in the current month
  const year = today.getFullYear();
  const monthName = new Date(year, month).toLocaleString('en-us', { month: 'long' });

  return (
    <TouchableOpacity
      style={[
        styles.dateCell,
        isOutsideMonth ? styles.outsideMonth : undefined
      ]}
      onPress={toggleModal}
      >
      <Text style={styles.text}>{day === 1 ? `${monthName.slice(0, 3)} ${day}` : day}</Text>
      <View style={styles.activityNamesContainer}>
        {activities.map((activity: Activity) => {
          return (
            <Text key={activity.activityid} style={styles.activityName}> {activity.activityname}</Text>
          )
        })}
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <DateCellModal day={day} month={month} activities={activities} toggleModal={toggleModal} />
      </Modal>
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
  },
  outsideMonth: {
    opacity: 0.5
  },
  activityNamesContainer: {
    flexDirection: 'column'
  },
  activityName: {
    fontSize: 8,
    width: '100%'
  }
})



 // const handlePress = (): void => {
  //   const buttons: AlertButton[] = [
  //     {
  //       text: 'Cancel It',
  //       onPress: (): void => console.log('what is the num of days in may',day)
  //     }
  //   ]

  //   Alert.alert('it got pressed', undefined, buttons)
  // }