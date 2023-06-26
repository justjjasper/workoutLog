import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Platform } from 'react-native';

interface AddActivityNameModalProps {
  activityNameRef: React.RefObject<TextInput>;
  toggleAddActivityModal: Function
}

export default function AddActivityNameModal({ activityNameRef, toggleAddActivityModal }: AddActivityNameModalProps) {
  const [activityName, setActivityName] = useState('Activity Name');

  const handleFocus = () => {
    if (activityNameRef.current) {
      activityNameRef.current.setNativeProps({
        selection: { start: 0, end: activityName.length },
      });
    }
  };

  const handleSubmit = () => {
    toggleAddActivityModal()
  }

  useEffect(() => {
    if (activityNameRef.current) {
      activityNameRef.current.focus();
    }
  }, []);

  const returnKeyType = Platform.OS === 'ios' ? 'done' : 'none';

  return (
    <View style={styles.modalContainer}>
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
      <Button
        title='Create'
      />
    </View>
  )
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: '85%',
    width: '105%',
    right: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center'
  },
  textInput: {
    height: 30,
    borderBottomWidth: 1,
    width: '75%',
    fontSize: 28
  },
  header: {
    fontSize: 18
  }
})