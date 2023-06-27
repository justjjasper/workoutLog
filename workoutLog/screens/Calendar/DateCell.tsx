import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Activity } from '../../types';
import Modal from 'react-native-modal';
import DateCellModal from './DateCellModal';
import { RootState } from '../../App';
import { useSelector } from 'react-redux';

interface DateCellProps {
  day: string | number | null,
  month: number,
  isOutsideMonth: boolean,
  activities: Activity[]
};

export default function DateCell(props: DateCellProps) {
  const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);
  const { day, month, isOutsideMonth, activities } = props; // might need to incorporate year/ todays date

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  const today = currentDate
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
      {activities.length > 4 ? (
        <Text style={styles.activityNamesContainer}>{activities.length} activities{'\n'}listed...</Text>

      ) : (
        <View style={styles.activityNamesContainer}>
        {activities.map((activity: Activity) => {
          return (
            <Text key={activity.activityid} style={styles.activityName}> {activity.activityname}</Text>
          )
        })}
      </View>
      )}


      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <DateCellModal day={day} month={month} activities={activities} year={year} monthName={monthName} toggleModal={toggleModal} />
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
    flexWrap: 'wrap'
  },
  text: {
    textAlign: 'right',
    width: '100%',
    position: 'absolute'
  },
  outsideMonth: {
    opacity: 0.5
  },
  activityNamesContainer: {
    paddingTop: 10,
    fontSize: 9.5
  },
  activityName: {
    fontSize: 9.5
  }
});