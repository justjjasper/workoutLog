import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Activity, RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AddActivityNameScreen from './AddActivityNameModal';
import Modal from 'react-native-modal';
import AddActivityNameModal from './AddActivityNameModal';

// Heading (Title close icon on right)
// Day of Week/Month and Day {`${monthName.slice(0, 3)} ${day}`}
// Calendar
// ButtonsBelow
/*
Implement typing within useNavigation in order to type-safe the type of data being passed to other
StackScreen components (referring to mapped data)

Use Exported RootStackParamList from types.tsx in conjunction with NativeStackNavigation
*/
interface DateCellModalProps {
  day: string | number | null;
  month: number;
  year: number;
  monthName: string;
  activities: Activity[];
  toggleModal: () => void;
}

const DateCellModal: React.FC<DateCellModalProps> = ({ day, month, year, monthName, activities, toggleModal }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dateInfo = { day, month, year };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const toggleAddActivityModal = (): void => {
    setIsModalVisible(!isModalVisible)
  };

  const date = new Date(year, month, Number(day));
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0];

  const shouldUseScrollView = activities.length > 4;

  const activityNameRef = useRef<TextInput | null>(null);

  const handleCreatePress = () => {
    toggleAddActivityModal();
    setTimeout(() => {
      activityNameRef.current?.focus();
    }, 350);
  };
  return (
    <View style={styles.modalContainer}>

      <View style={styles.headingContainer}>
        <Text style={styles.modalHeading}>Activity List</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.closeButtonText}>x</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateContainer}>
      <Text style={styles.dates}>{dayOfWeek}</Text>
      <Text style={styles.dates}>{monthName.slice(0,3)} {day}</Text>
      </View>

      {shouldUseScrollView ? (
        <SafeAreaView style={styles.activityNameContainer}>
          <ScrollView>
            {activities.map((activity: Activity) => (
              <TouchableOpacity
                key={activity.activityid}
                style={styles.activityNameButton}
                onPress={() => {
                  navigation.navigate(`ActivityScreen_${activity.activityid}`, { activity: activity });
                  toggleModal()
                }}
                >
                <Text style={styles.activityName}>{activity.activityname}</Text>
                <Text style={styles.activityName}>&gt;</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.activityNameContainer}>
          {activities.map((activity: Activity) => (
            <TouchableOpacity
              key={activity.activityid}
              style={styles.activityNameButton}
              onPress={() => {
                navigation.navigate(`ActivityScreen_${activity.activityid}`, { activity: activity });
                toggleModal()
              }}
              >
              <Text style={styles.activityName}>{activity.activityname}</Text>
              <Text style={styles.activityName}>&gt;</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleCreatePress}>
          <Text style={styles.footerText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleAddActivityModal}>
        <AddActivityNameModal
          activityNameRef={activityNameRef}
          toggleAddActivityModal={toggleAddActivityModal}
          dateInfo={dateInfo}
        />
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#E4E5E3',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '65%',
    shadowColor: "gray",
    shadowRadius: 4.65,
    shadowOffset: {
    height: 4,
    width: 0,
    },
    shadowOpacity: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1.5,
    paddingBottom: 10
  },
  dateContainer: {
    alignItems: 'center'
  },
  dates: {
    fontSize: 24,
    fontWeight: '500'
  },
  modalHeading: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  closeButtonText: {
    color: '#565758',
    fontWeight: 'bold',
    fontSize: 32
  },
  activityNameContainer: {
    width: '100%',
    height: 270,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center'
  },
  activityNameButton: {
    height: 40,
    width: 250,
    backgroundColor: '#AFDBE1',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  activityName: {
    fontSize: 20,
    color: 'black'
  },
  closeButton: {
    borderRadius: 8,
  },
  footerContainer: {
    flexDirection:'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  footerButton: {
    height: 30,
    width: 60,
    backgroundColor: '#77C7E8',
    borderRadius: 20,
    justifyContent: 'center'
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center'
  }
});

export default DateCellModal;