import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Activity, HomeStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import AddActivityNameModal from './AddActivityNameModal';
import { LOCALTUNNEL } from '../../config';
import { useDispatch } from 'react-redux';
import { deleteActivities } from '../../actions';
import axios from 'axios';

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

// implement a selected checkbox function
  // this function will be inserted into the if else function of the onPress Touchable opacity
// implement if/else function within onPress of touchableOpacity
const DateCellModal: React.FC<DateCellModalProps> = ({ day, month, year, monthName, activities, toggleModal }) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();

  const dateInfo = { day, month, year };

  // implement a selected checkbox function
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const toggleAddActivityModal = () => {
    setIsAddModalVisible(!isAddModalVisible)
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

  const handleDeleteActivities = async () => {
    const url = `${LOCALTUNNEL}/deleteActivity`;

    try {
       // filter selected Checkboxes and then convert the array of strings into integers
      const selectedActivityIds = Object.keys(selectedItems).filter(
      (activityId) => selectedItems[activityId])
      .map((str) => parseInt(str,10));

      await axios.delete(url, { data: selectedActivityIds });
      dispatch(deleteActivities(selectedActivityIds));

    } catch(err) {
      console.error('Error in deletin activities from client side', err)
    };

    setIsDelete(!isDelete);
    setSelectedItems({});
  };

  const handleActivityPress = (activity: Activity) => {
    if(isDelete) {
      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,
        [activity.activityId]: !prevSelectedItems[activity.activityId],
      }));
    } else {
      navigation.navigate(`ActivityScreen_${activity.activityId}`, { activity: activity });
      toggleModal();
    }
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

      {/* Mapped Activities */}
      {shouldUseScrollView ? (
        <SafeAreaView style={styles.activityNameContainer}>
          <ScrollView>
            {activities.map((activity: Activity) => (
              <TouchableOpacity
                key={activity.activityId}
                style={styles.activityNameButton}
                onPress={() => handleActivityPress(activity)}
                >
                {isDelete && (
                  <View style={[styles.emptyCheckbox, selectedItems[activity.activityId] && styles.selectedCheckbox]} />
                )}
                <Text style={styles.activityName}>{activity.activityName}</Text>
                <Text style={styles.activityName}>&gt;</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.activityNameContainer}>
          {activities.map((activity: Activity) => (
            <TouchableOpacity
              key={activity.activityId}
              style={styles.activityNameButton}
              onPress={() => handleActivityPress(activity)}
              >
              {isDelete && (
                 <View style={[styles.emptyCheckbox, selectedItems[activity.activityId] && styles.selectedCheckbox]} />
               )}
              <Text style={styles.activityName}>{activity.activityName}</Text>
              <Text style={styles.activityName}>&gt;</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Footer Buttons*/}
      {isDelete ? (
        <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton} onPress={()=> setIsDelete(!isDelete)}>
          <Text style={styles.footerText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, {backgroundColor: '#D15465'}]}
          onPress={handleDeleteActivities}>
          <Text style={styles.footerText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      ) : (
        <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleCreatePress}>
          <Text style={styles.footerText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => setIsDelete(!isDelete)}>
          <Text style={styles.footerText}>Delete</Text>
        </TouchableOpacity>
      </View>
      )}

      <Modal isVisible={isAddModalVisible} onBackdropPress={toggleAddActivityModal}>
        <AddActivityNameModal
          activityNameRef={activityNameRef}
          toggleAddActivityModal={toggleAddActivityModal}
          dateInfo={dateInfo}
          toggleModal={toggleModal}
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
    backgroundColor: '#DDCBEB',
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
    backgroundColor: '#9B78ED',
    borderRadius: 20,
    justifyContent: 'center'
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center'
  },
  emptyCheckbox: {
    height: 10,
    width: 10,
    backgroundColor: 'white'
  },
  selectedCheckbox: {
    backgroundColor: 'blue',
    height: 10,
    width: 10,
  }
});

export default DateCellModal;