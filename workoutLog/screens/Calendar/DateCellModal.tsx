import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import { Activity } from '../../types';

// Heading
// Calendar
// ButtonsBelow

interface DateCellModalProps {
  day: string | number | null;
  month: number;
  activities: Activity[];
  toggleModal: () => void;
}

const DateCellModal: React.FC<DateCellModalProps> = ({ day, month, activities, toggleModal }) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalHeading}>Date: {day}/{month}</Text>
      <Text style={styles.modalSubtitle}>Activities:</Text>
      {activities.map((activity: Activity) => (
        <Text key={activity.activityid} style={styles.activityName}>
          {activity.activityname}
        </Text>
      ))}
      <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  activityName: {
    fontSize: 14,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DateCellModal;