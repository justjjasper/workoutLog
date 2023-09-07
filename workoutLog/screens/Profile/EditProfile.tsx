import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, Alert, Platform } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../types';
import React, { useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { LOCALTUNNEL } from '../../config';
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import {v2 as cloudinary} from 'cloudinary';

// import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
/*
Image source cannot be an empty string
Not able to set a required(png) as a State Value


Picking an image logic:
tempPhotoURI is equal to an empty string

if tempPhotoURI is no longer equal to an empty string
  tempPhotoURI is equal to

*/
export default function EditProfile() {
  const route = useRoute<RouteProp<ProfileStackParamList, 'Edit Profile'>>();
  const navigation = useNavigation();
  const {
          handleSetName,
          // handleSetPhotoURI,
          handleSetWeight, handleSetHeight,
          height, weight,
          // photoURI,
          name,
          emailAddress
  } = route.params

  let placeHolderImage = '../../assets/profileHolder.png';

  const [tempName, setTempName] = useState<string>(name);
  const [tempHeight, setTempHeight] = useState<{feet: string; inches: string}>({feet: height.feet, inches: height.inches});
  const [tempWeight, setTempWeight] = useState<string>(weight);
  // let [tempPhotoURI, setTempPhotoURI] = useState<string>('');

  // const handleImagePicker = async () => {
  //   try {
  //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (!permissionResult.granted) {
  //       alert('Permission to access camera roll is required!');
  //       return;
  //     }

  //     const pickerResult = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       quality: 0.8,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       // base64: true
  //     });

  //     if (!pickerResult.canceled) {
  //       setTempPhotoURI((prevResponse => {
  //         prevResponse = pickerResult.assets[0].uri;

  //         return prevResponse
  //       }))

  //     }
  //   } catch (error) {
  //     console.log('Image picker error:', error);
  //   }

  // };

  const handleFeetChange = (feetValue: string) => {
    setTempHeight((prevHeight) => ({
      ...prevHeight,
      feet: feetValue,
    }));
  };

  const handleInchesChange = (inchesValue: string) => {
    setTempHeight((prevHeight) => ({
      ...prevHeight,
      inches: inchesValue,
    }));
  };

  const handleTempWeightChange = (weightValue: string) => {
    setTempWeight((prevWeight) => (
      prevWeight = weightValue
    ));
  }

  const handleTempName = (nameValue: string) => {
    setTempName((prevName) => (
      prevName = nameValue
    ))
  };

  const saveEdits = async () => {
    if (!tempName) {
      Alert.alert('Please do not leave the name blank.');
      return
    };

    if ((height.feet && height.inches) && (!tempHeight.feet || !tempHeight.inches)) {
      Alert.alert('Please do not leave any of the height measurement fields blank.');
      return
    }

    // purpose of this constraint is to prevent user from saving an input if
      // both height fields are blank initially
      // and they only input one of the fields
    if ((!height.feet && !height.inches) && ((!tempHeight.feet && tempHeight.inches) || (tempHeight.feet && !tempHeight.inches))) {
      Alert.alert('Please dont leave an empty height field.')
      return
    }

    try {
      // const { makeDirectoryAsync, getInfoAsync, copyAsync } = FileSystem;
      // const directoryPath = `${FileSystem.documentDirectory}/workoutLog/`;
      // const timestamp = new Date().getTime();
      // const fileName = `photo_${timestamp}.png`;
      // const destinationPath = `${directoryPath}${fileName}`;
      // await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });

      // await copyAsync({
      //   from: tempPhotoURI,
      //   to: destinationPath,
      // });

      // console.log('front end file:', destinationPath)
      const payload = {
        full_name: tempName !== name ? tempName : name,
        email_address: emailAddress,
        weight: tempWeight,
        height: [
          tempHeight.feet !== height.feet ? tempHeight.feet : height.feet,
          tempHeight.inches !== height.inches ? tempHeight.inches : height.inches
        ],
        // photo_uri: photoURI === placeHolderImage ? (!tempPhotoURI ? placeHolderImage : tempPhotoURI) : photoURI,
        // file: formData
      }

      await axios.patch(`${LOCALTUNNEL}/saveProfileEdits`, payload)

      handleSetName(tempName);

      // if one of the inputs are null, make the whole height null
      if (tempHeight.feet === '') {
        handleSetHeight('', tempHeight.inches);
      } else if (tempHeight.inches === '') {
        handleSetHeight(tempHeight.feet, '');
      } else {
        tempHeight.feet && tempHeight.inches ? handleSetHeight(tempHeight.feet, tempHeight.inches) : handleSetHeight(height.feet, height.inches);
      }

      tempWeight === '' ? handleSetWeight('') : (!tempWeight ? handleSetWeight(weight) : handleSetWeight(tempWeight))

      // tempPhotoURI === '' ? handleSetPhotoURI(photoURI) : handleSetPhotoURI(tempPhotoURI);



      navigation.goBack();
    } catch(err) {
      console.error('Error in updating profile from clientside', err)
    }
  };

  const renderHeaderRight = () => {
    return (
      <TouchableOpacity onPress={saveEdits}>
      <Text style={styles.doneButton}>Done</Text>
    </TouchableOpacity>
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
  };

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
          // onPress={handleImagePicker}
        >
        <Image
          style={styles.image}
          // source= { tempPhotoURI !== '' ? { uri: tempPhotoURI} : (photoURI === placeHolderImage ? require(placeHolderImage) : { uri: photoURI}) }
          source = {require(placeHolderImage)}
        />
        </TouchableOpacity>

        {/* <TouchableOpacity
          // onPress={handleImagePicker}
        >
          <View style={styles.cameraBackground}>
           <Icon style={styles.editProfileCamera} name='camera-outline'/>
          </View>
        </TouchableOpacity> */}
      </View>

      <View style={styles.formContainer}>
        <View style={styles.labelContainers}>
          <Text style={{fontSize: 20}}>Full Name</Text>
          <Text style={{fontSize: 20}}>Weight</Text>
          <Text style={{fontSize: 20}}>Height</Text>
        </View>

        <View style={styles.inputRowContainers}>
          <TextInput
            value={ tempName !== name ? tempName : name }
            style={styles.textInput}
            onChangeText={handleTempName}
          />

          <View style={styles.pickerContainer}>
            <View style={{ width: '35%', height: 35}}>
            <TextInput
              value={ tempWeight !==  weight ? tempWeight : weight}
              style={styles.pickerInput}
              keyboardType= 'numeric'
              placeholder= '0'
              returnKeyType= 'done'
              onChangeText= {handleTempWeightChange}
            />
            </View>
            <Text style={{paddingLeft: 5}}>lbs</Text>
          </View>

          <View style={styles.pickerContainer}>
            <TextInput
              style= {styles.pickerInput}
              value= { tempHeight.feet !== height.feet ? tempHeight.feet : height.feet}
              keyboardType= 'numeric'
              returnKeyType= {'done'}
              onChangeText= {handleFeetChange}
              placeholder= '0'
            />
            <Text style={{marginRight: 5, paddingHorizontal: 5}}>ft</Text>
            <TextInput
              style={styles.pickerInput}
              value={tempHeight.inches !== height.inches ? tempHeight.inches : height.inches}
              onChangeText={handleInchesChange}
              keyboardType="number-pad"
              returnKeyType={'done'}
              placeholder="0"
            />
            <Text style={{paddingLeft: 5}}>in</Text>
          </View>

        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#DDCBEB'
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    resizeMode: 'cover'
  },
  editProfileCamera: {
    fontSize: 30,
    color: 'white',
  },
  cameraBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9B78ED',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -5,
    left: 17
  },
  headerContainer: {
    alignItems: 'center',
    top: 11
  },
  formContainer: {
    width: '80%',
    height: '35%',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FEFEFE',
    top: 23,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowOffset: {width: -10, height: 10},
    shadowColor: 'black', // Shadow color,
    shadowOpacity: 0.25, // Opacity (0 to 1)
    shadowRadius: 10
  },
  textInput: {
    borderBottomWidth: 0.2,
    fontSize: 20,
    padding: 7
  },
  inputRowContainers: {
    width: '55%',
    justifyContent: 'space-around'
  },
  labelContainers: {
    justifyContent: 'space-around'
  },
  pickerInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    paddingBottom: 7
  },
  doneButton: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6941C6'
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