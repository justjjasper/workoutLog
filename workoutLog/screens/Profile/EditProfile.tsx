import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../types';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile() {
  const route = useRoute<RouteProp<ProfileStackParamList, 'Edit Profile'>>();
  const navigation = useNavigation();
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
        // once theres a save button, remove handleSetPhotoURI and implement that into save function button
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

  const saveEdits = () => {

  };

  const renderHeaderRight = () => {
    return (
      <Button
        title='Done'
        onPress={saveEdits}
        color='white'
        />
    )
  };

  const renderHeaderLeft = () => {
    return (
      <Button
        title='Cancel'
        onPress= {navigation.goBack}
        color='white'
      />
    )
  }


  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft
    });
  });


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
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

        <TouchableOpacity
          onPress={handleImagePicker}
        >
          <Text style={styles.editProfileText}>Edit Picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.labelContainers}>
          <Text style={{fontSize: 20}}>Full Name</Text>
          <Text style={{fontSize: 20}}>Weight</Text>
          <Text style={{fontSize: 20}}>Height</Text>
        </View>

        <View style={styles.inputRowContainers}>

          <TextInput
            value={name}
            style={styles.textInput}
          />

          <TextInput
            value={ weight === null ? '' : weight}
            style={styles.textInput}
          />

          <TextInput
            value={ height === null ? '' : height}
            style={styles.textInput}
          />

        </View>


      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    resizeMode: 'cover'
  },
  editProfileText: {
    marginTop: 10,
    fontSize: 18,
    color: '#77C7E9'
  },
  headerContainer: {
    alignItems: 'center'
  },
  formContainer: {
    width: '80%',
    height: '40%',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FEFEFE',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textInput: {
    borderBottomWidth: 0.2,
    fontSize: 20
  },
  inputRowContainers: {
    width: '55%',
    justifyContent: 'space-around'
  },
  labelContainers: {
    justifyContent: 'space-around'
  }
})





// return (
//   <View style={styles.container}>
//     <View>
//       <TouchableOpacity
//         style={styles.touchableImage}
//         onPress={handleImagePicker}
//       >
//       { response !== '' ? (
//         <Image
//           source= {{uri: response}}
//           style={styles.image}
//         />
//       ) : (
//         <Image
//           source = { photoURI === placeHolderImage ? placeHolderImage : {uri: photoURI}}
//           style={styles.image}
//         />
//       )}
//       </TouchableOpacity>
//       <Text>Camera Picture</Text>
//     </View>
//   </View>
// )