import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import { Activity } from '../../types';

// Heading (Date on left, close icon on right)
// Calendar
// ButtonsBelow

interface DateCellModalProps {
  day: string | number | null;
  month: number;
  year: number;
  monthName: string;
  activities: Activity[];
  toggleModal: () => void;
}

const DateCellModal: React.FC<DateCellModalProps> = ({ day, month, year, monthName, activities, toggleModal }) => {
  const date = new Date(year, month, Number(day));
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0];

  console.log(dayOfWeek)
  return (
    <View style={styles.modalContainer}>

      <View style={styles.headingContainer}>
        <View>
          <Text style={styles.modalHeading}>{dayOfWeek}</Text>
          <Text style={styles.modalHeading}>{`${monthName.slice(0, 3)} ${day}`}</Text>
        </View>



        <View style={styles.headingButton}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
          <Text style={styles.closeButtonText}>x</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.activityNameContainer}>
        {activities.map((activity: Activity) => (
          <Text key={activity.activityid} style={styles.activityName}>
            {activity.activityname}
          </Text>
        ))}
      </View>

      <View>
        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#E4E5E3',
    padding: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%'
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headingContainer: {
    flexDirection: 'row'
  },
  headingButton:{
    backgroundColor: 'black',
    width: '50%',
    justifyContent: 'flex-end'
  },
  activityNameContainer: {
    width: '87%',
    height: '50%',
    borderWidth: 2,
    backgroundColor: 'white'
  },
  activityName: {
    fontSize: 14,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  footerContainer: {

  }
});

export default DateCellModal;