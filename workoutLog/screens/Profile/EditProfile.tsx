import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProfileStackParamList } from '../../types';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile() {
  const route = useRoute<RouteProp<ProfileStackParamList, 'Edit Profile'>>();
  const { handleSetName, handleSetPhotoURI, handleSetWeight, handleSetHeight, height, weight, photoURI, name}  = route.params
  const placeHolderImage = require('../../assets/profileHolder.png');

  const [response, setResponse] = useState<string>('');

  const handleImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!pickerResult.canceled) {
        handleSetPhotoURI(pickerResult.assets[0].uri);
        setResponse((prevResponse => {
          prevResponse = pickerResult.assets[0].uri;
          return prevResponse
        }))
      }
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.touchableImage}
          onPress={handleImagePicker}
        >
        { response !== '' ? (
          <Image
            source= {{uri: response}}
            style={styles.image}
          />
        ) : (
          <Image
            source = { photoURI === placeHolderImage ? placeHolderImage : {uri: photoURI}}
            style={styles.image}
          />
        )}
        </TouchableOpacity>
        <Text>Camera Picture</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover'
  },
  touchableImage: {
    height: 200,
    width: 200,
    borderWidth: 1
  }
})