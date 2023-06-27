import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

interface AddActivityNameModalProps {
  activityNameRef: React.RefObject<TextInput>;
  toggleAddActivityModal: () => void;
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
    // POST request logic
    toggleAddActivityModal()
  }

  useEffect(() => {
    if (activityNameRef.current) {
      activityNameRef.current.focus();
    }
  }, []);

  const returnKeyType = Platform.OS === 'ios' ? 'done' : 'none';

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.modalContainer}>
      <TouchableOpacity onPress={handleSubmit} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>x</Text>
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
    top: 10,
    right: 10,
    zIndex: 1,
    paddingRight: 7
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#565758'
  },
  createButton: {
    marginTop: -42,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 42,
    backgroundColor: '#77C7E8',
    borderRadius: 20
  },
  buttonText: {
    color: 'black',
    fontSize: 18
  },
})