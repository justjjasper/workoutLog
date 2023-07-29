import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProfileStackParamList } from '../../types';
import { useEffect } from 'react';

export default function EditProfile() {
  const route = useRoute<RouteProp<ProfileStackParamList, 'Edit Profile'>>();

  const { setName, setPhotoURI, setWeight, setHeight}  = route.params

  return (
    <Text> Edit Profile </Text>
  )
};