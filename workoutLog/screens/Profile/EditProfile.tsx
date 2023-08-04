import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../types';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

// create an object that sends the original setter funcs from the parent component to save
// dont forget to convert into number the weight/ tempHeight.feet & inches
export default function EditProfile() {
  const route = useRoute<RouteProp<ProfileStackParamList, 'Edit Profile'>>();
  const navigation = useNavigation();
  const { handleSetName, handleSetPhotoURI, handleSetWeight, handleSetHeight, height, weight, photoURI, name}  = route.params
  const placeHolderImage = require('../../assets/profileHolder.png');

  const [tempName, setTempName] = useState<string>(name);
  const [response, setResponse] = useState<string>('');
  const [tempHeight, setTempHeight] = useState<{feet: string | number; inches: string | number}>({feet: '', inches: ''});
  const [tempWeight, setTempWeight] = useState<number | string>('');

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
    // create an object that sends the original setter funcs from the parent component to save
    // dont forget to convert into number the weight/ tempHeight.feet & inches
  };

  const handleFeetChange = (feetValue: string | number) => {
    setTempHeight((prevHeight) => ({
      ...prevHeight,
      feet: feetValue,
    }));
  };

  const handleInchesChange = (inchesValue: string | number) => {
    setTempHeight((prevHeight) => ({
      ...prevHeight,
      inches: inchesValue,
    }));
  };

  const handleTempWeightChange = (weightValue: number | string) => {
    setTempWeight((prevWeight) => (
      prevWeight = weightValue
    ));
  }

  const handleTempName = (nameValue: string) => {
    setTempName((prevName) => (
      prevName = nameValue
    ))
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
          onPress={handleImagePicker}
        >
        <Image
          style={styles.image}
          source= { response !== '' ? {uri: response} : ( photoURI === placeHolderImage? placeHolderImage : {uri: photoURI}) }
        />
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
            value={ tempName !== name ? tempName : name }
            style={styles.textInput}
            onChangeText={handleTempName}
          />

          <View style={styles.pickerContainer}>
            <View style={{ width: '35%', height: 35}}>
            <TextInput
              value={ tempWeight.toString() !== '' ? tempWeight.toString() : (weight?.toString() ? weight.toString() : '') }
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
              value= { tempHeight.feet.toString() !== '' ? tempHeight.feet.toString() : ( height.feet?.toString() ? height.feet.toString() : '') }
              keyboardType= 'numeric'
              returnKeyType= {'done'}
              onChangeText= {handleFeetChange}
              placeholder= '0'
            />
            <Text style={{marginRight: 5, paddingHorizontal: 5}}>ft</Text>
            <TextInput
              style={styles.pickerInput}
              value={tempHeight.inches.toString() !== '' ? tempHeight.inches.toString() : ( height.inches?.toString() ? height.inches.toString() : '') }
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
    color: '#1782EF'
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
    justifyContent: 'space-around'
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
    color: '#1782EF'
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