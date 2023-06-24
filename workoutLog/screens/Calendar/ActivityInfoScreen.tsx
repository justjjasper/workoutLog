import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, TextInputKeyPressEventData, NativeSyntheticEvent } from 'react-native';
import { RootStackParamList } from '../../types';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

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
  const { activity } = route.params;
  const navigation = useNavigation();

  const [editing, setEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(activity.activityinfo);

  const handleNotePress = () => {
    setEditing(true);
  };

  const handleNoteChange = (newNoteContent: string) => {
    setNoteContent(newNoteContent);
  };

  const handleNoteBlur = () => {
    setEditing(false);
    // updates content
  };

  const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === 'Enter') {
      setNoteContent(noteContent + '\n')
    }
  }

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
  ///////////////
  console.log(activity.activityinfo)
  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight
    })
  }, [editing]);

  return (
    <TouchableOpacity onPress={handleNotePress}>
      <View>
        {editing ? (
          <TextInput
            multiline
            value={noteContent.replace(/\\n/g, '\n')}
            onChangeText={handleNoteChange}
            onBlur={handleNoteBlur}
            autoFocus
            style={styles.textInput}
            onKeyPress={handleKeyPress}
          />
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
  },
   noteContainer: {
    padding: 10,
    height: '100%'
  }
})