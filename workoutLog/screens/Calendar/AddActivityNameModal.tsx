import { useState, useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, TextInput, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { LOCALTUNNEL } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types';
import { postActivityName } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import throttle from '../../backend/middleware/throttleUtil';

interface AddActivityNameModalProps {
  activityNameRef: React.RefObject<TextInput>;
  toggleAddActivityModal: () => void;
  dateInfo: {
    day: string | number | null,
    month: number,
    year: number
  },
  toggleModal: () => void
};

export default function AddActivityNameModal({ activityNameRef, toggleAddActivityModal, dateInfo, toggleModal }: AddActivityNameModalProps) {
  const [activityName, setActivityName] = useState('Activity Name');
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleFocus = () => {
    if (activityNameRef.current) {
      activityNameRef.current.setNativeProps({
        selection: { start: 0, end: activityName.length },
      });
    }
  };

  const handleSubmit = throttle(async () => {
    const url = `${LOCALTUNNEL}/postActivityName`;
    const payload = {
      activityName,
      dateInfo
    };

    try {
      toggleAddActivityModal();
      toggleModal();
      const token = await AsyncStorage.getItem('jwtToken');
      const headers = {
        authorization: `Bearer ${token}`
      };

      const response = await axios.post(url, payload, { headers })

      const { id, activity_name, day, month, year } = response.data;
      const newActivity = {
        activityName: activity_name,
        activityInfo: null,
        day,
        month,
        year,
        activityId: id
      };
      dispatch(postActivityName(newActivity));

      navigation.navigate(`ActivityScreen_${id}`, { activity: newActivity })
    } catch(err) {
      console.error('Error posting activityName fron Client side', err);
    }
  }, 3000);

  useEffect(() => {
    if (activityNameRef.current) {
      activityNameRef.current.focus();
    };
  }, []);

  const returnKeyType = Platform.OS === 'ios' ? 'done' : 'none';

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.modalContainer}>
      <TouchableOpacity onPress={toggleAddActivityModal} style={styles.closeButton}>
        <Icon style={styles.closeButtonText} name='close'/>
      </TouchableOpacity>
        <Text style={styles.header}>Enter Activity Name</Text>
        <TextInput
          ref={activityNameRef}
          onChangeText={setActivityName}
          value={activityName}
          placeholder='Activity Name'
          placeholderTextColor='#D9D9D9'
          style={styles.textInput}
          onFocus={handleFocus}
          textAlign={'center'}
          returnKeyType={returnKeyType} // Set return key type to 'done'
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    height: '85%',
    width: '105%',
    right: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInput: {
    height: 30,
    borderBottomWidth: 1,
    width: '75%',
    fontSize: 32
  },
  header: {
    fontSize: 18
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1,
    paddingRight: 7
  },
  closeButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#565758'
  },
  createButton: {
    marginTop: -42,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 42,
    backgroundColor: '#9B78ED',
    borderRadius: 20
  },
  buttonText: {
    color: 'black',
    fontSize: 18
  },
})