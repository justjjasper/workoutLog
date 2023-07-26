import { Text, View, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginEmailAddress } from '../../actions';

export default function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();



  const renderHeaderRight = () => {
    return (
      <View style={styles.logOutContainer}>
        <Button
          title= 'Log Out'
          onPress={() => dispatch(loginEmailAddress(''))}
          color= 'white'
          />
      </View>
    )
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight
    })
  });

  return (
    <View>
      <Text>I'm the profile screen hehe</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  logOutContainer: {
    paddingRight: 10
  }
})