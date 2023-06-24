import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
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
  const [noteContent, setNoteContent] = useState('Sample note content \n long \n long sakdjkdaskdjak \n ok');

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
    // implement axios to get data and apply it to contentState
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
            value={noteContent}
            onChangeText={handleNoteChange}
            onBlur={handleNoteBlur}
            autoFocus
            style={styles.textInput}
          />
        ) : (
          <Text>{noteContent}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: '100%',
    borderWidth: 5,
  }
})