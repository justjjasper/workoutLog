import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProfileStackParamList } from '../../types';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

// Image, with camera button
// Name
// email
// weight
// height

export default function EditProfile() {
  const route = useRoute<RouteProp<ProfileStackParamList, 'Edit Profile'>>();
  const { handleSetName, handleSetPhotoURI, handleSetWeight, handleSetHeight, height, weight, photoURI, name}  = route.params

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
        console.log('what is pickerREsult', pickerResult.assets[0].uri)
        console.log('what is uri', photoURI)

      }
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  useEffect(() => {
    console.log('photoURI has been updated:', photoURI);
  }, [photoURI]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.touchableImage}
          onPress={handleImagePicker}
        >
          { photoURI ? (
            <Image
              source={ response === '' ? {uri: photoURI} : {uri: response }}
              style = {styles.image}
            />
          ) : (
            <View>
              <Text> No Image Selected</Text>
            </View>
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