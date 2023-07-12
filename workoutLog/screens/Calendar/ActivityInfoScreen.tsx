import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, TextInputKeyPressEventData, NativeSyntheticEvent } from 'react-native';
import { RootStackParamList } from '../../types';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { LOCALTUNNEL } from '../../config';
import axios from 'axios';
/*
implements Type to useRoute that uses exported RootStackParamList(entire type stack of possible Route Navigation)
 `ActivityScreen_${number}` is implemented within RouteProp to show a dynamic screen name implemented via template literal
 These 2 Typing allows a secure type-safe operation where it confirms the types for the data(props) passed to other screen components

Finally, implement typing within the useRoute
*/
type ActivityInfoScreenRouteProp = RouteProp<
  RootStackParamList,
  `ActivityScreen_${number}`
>;

export default function ActivityInfoScreen() {
  const route = useRoute<ActivityInfoScreenRouteProp>();
  const navigation = useNavigation();
  const { activity } = route.params;

  const [editing, setEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(activity.activityInfo || '');

  const handleNotePress = () => {
    setEditing(true);
  };

  const handleNoteChange = (newNoteContent: string) => {
    setNoteContent(newNoteContent);
    console.log('what is value of noteContent atm', noteContent)
  };

  const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === 'Enter') {
      setNoteContent(noteContent + '\n')
    }
  };

  const saveNote = async (content: string) => {
    const url = `${LOCALTUNNEL}/postNote`;
    const payload = {
      noteContent: content,
      activityName: activity.activityName,
      id: activity.activityId
    };
   if (noteContent.length === 0) {
     try {
       console.log('this is the noteContent', noteContent);
       await axios.post(url, payload);
     } catch (err) {
       console.error('Error in posting new Note from client side', err);
     }
   } else {
     // PATCH Request, just need to send noteContent, and activityName
     try {
       await axios.patch(url, payload);
     } catch(err) {
       console.error('Error in patching Note from client side', err);
     }
   }

    console.log('current value of noteContent after pressing content parameter', content)
 };

  const handleNoteBlur = () => {
    setEditing(false);
    setNoteContent(prevNoteContent => {
      const updatedNoteContent = prevNoteContent.trim(); // Optionally, trim the content
      saveNote(updatedNoteContent); // Call saveNote with the updated content
      return updatedNoteContent; // Return the updated content to update the state. This is similar to the implicit return of regular set useState functions ie. setCity(Carson)
    });
  };

  const renderHeaderRight = () => {
    if (editing) {
      return (
        <Button
          title='Done'
          onPress={handleNoteBlur}
          color='white'
          />
      )
    }

    return null;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight
    });
  }, [editing]);

  return (
    <TouchableOpacity onPress={handleNotePress}>
      <View>
        {editing ? (
          <View>
          <TextInput
            multiline
            value={noteContent.replace(/\\n/g, '\n')}
            onChangeText={handleNoteChange}
            onBlur={handleNoteBlur}
            autoFocus
            style={styles.textInput}
            onKeyPress={handleKeyPress}
          />
          <View style={styles.buttonInput}>
           <Button
           title="Submit" onPress={handleNoteBlur} />
           </View>
           </View>
        ) : (
          <Text style={styles.noteContainer}>{noteContent.replace(/\\n/g, '\n')}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: '100%',
    borderWidth: 5,
    fontSize: 18,
    padding: 10
  },
   noteContainer: {
    padding: 10,
    height: '100%',
    fontSize: 18
  },
  buttonInput: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
})