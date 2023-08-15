import { Text, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginEmailAddress, toggleAuthenticateLogin } from '../../actions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Activity, ProfileStackParamList } from '../../types';
import { LOCALTUNNEL } from '../../config';
import axios from 'axios';
import { RootState } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TO DO: Implement dispatch of Authenticated to false in logout function
export default function Profile() {
  const emailAddress = useSelector<RootState, string>(state => state.emailAddress.emailAddress);
  const activities = useSelector<RootState, Activity[]>(state => state.activities.activities).length;
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const placeHolderImage = '../../assets/profileHolder.png';
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [photoURI, setPhotoURI] = useState< string>(placeHolderImage);
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<{ feet: string; inches: string }>({
    feet: '',
    inches: '',
  });


  const handleSetName = (name: string) => {
    setName(name)
  };

  const handleSetPhotoURI = (URI: string)  => {
    setPhotoURI(prevResponse => {
      prevResponse = URI;
      return prevResponse
    })
  };

  const handleSetWeight = (weight: string) => {
    setWeight(weight)
  };

  const handleSetHeight = (feet: string, inches: string) => {
    setHeight({ feet, inches });
  };


  const navigateToEditProfile = () => {
    navigation.navigate('Edit Profile', {
      handleSetName: (a) => handleSetName(a),
      handleSetPhotoURI: (a) => handleSetPhotoURI(a),
      handleSetWeight: (a) => handleSetWeight(a),
      handleSetHeight: (a, b) => handleSetHeight(a, b),
      height,
      weight,
      name,
      photoURI,
      emailAddress
    });
  };

  const renderHeaderRight = () => {
    return (
      <View style={styles.logOutContainer}>
        <Button
          title= 'Log Out'
          onPress={ async () => {
            dispatch(loginEmailAddress(''))
            dispatch(toggleAuthenticateLogin());

            try {
              await AsyncStorage.removeItem('jwtToken')
              console.log('successfully removed jwtToken from AsyncStorage when logging out')
            } catch (err) {
              console.log('could not remove async storage', err)
            };
          }}
          color= 'white'
          />
      </View>
    )
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight
    })
  }, [activities, navigation]);

  useEffect(() => {
    const getUserInfo = async () => {

      try {
        const userInfo = await axios.get(`${LOCALTUNNEL}/getUserInfo?userEmail=${emailAddress}`)
        const { full_name, height, weight, photo_uri } = userInfo.data
        setName(full_name);
        weight ? setWeight(weight.toString()) : setWeight('');

        if (height) {
          handleSetHeight(height[0].toString(), height[1].toString());
        } else {
          handleSetHeight('', '');
        };

        setPhotoURI(photo_uri || placeHolderImage);
      } catch(err) {
        console.error('Error in retrieving userInfo from client side', err)
      }
    };

    getUserInfo();
  }, [emailAddress])

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
                source= { photoURI === placeHolderImage ? require(placeHolderImage) : { uri: photoURI } }
                style={styles.image}
              />

          <TouchableOpacity
            style={styles.editButton}
            onPress={navigateToEditProfile}
          >
            <Text>Edit Button</Text>
          </TouchableOpacity>
          <View style={styles.infoTextHeaderContainer}>

            <Text style={{fontSize:24}}>{name}</Text>
            <Text style={styles.fadedText}>{emailAddress}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>

          <View style={styles.firstInfoContainer}>
            <Text style={styles.infoNumbers}>{weight ? `${weight} lbs` : '--'}</Text>
            <Text style={styles.fadedText}>{`Current\nWeight`}</Text>
          </View>

          <View style={styles.secondInfoContainer}>
            <Text style={styles.infoNumbers}>{height.feet || height.inches ? `${height.feet}'${height.inches}"` : '--'}</Text>
            <Text style={styles.fadedText}>{`Current\nHeight`}</Text>
          </View>

          <View style={styles.thirdInfoContainer}>
            <Text style={styles.infoNumbers}>{activities}</Text>
            <Text style={styles.fadedText}>Total Workouts</Text>
          </View>

        </View>
      </View>
      <View style={styles.smallContainer}/>
    </View>
  )
};

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: 'blue',
    flex: 1
  },
  smallContainer: {
    flex: 0.33,
    backgroundColor: '#E4E5E3'
  },
  container: {
    flex: 0.67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E4E5E3'
  },
  logOutContainer: {
    paddingRight: 10
  },
  headerContainer: {
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
    width: '75%',
    height: '35%',
    justifyContent: 'flex-start',
    backgroundColor: '#FEFEFE'
  },
  infoTextHeaderContainer: {
    alignItems: 'center',
    bottom: 35
  },
  editButton: {
    position: 'relative',
    alignSelf: 'flex-end',
    bottom: 50,
    paddingRight: 10
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    resizeMode: 'cover',
    position: 'relative',
    bottom: 50,
    borderWidth: 1
  },
  imageContainer: {
    position: 'relative',
    bottom: 50,
    height: 110,
    width: 110,
    borderRadius: 55,
    borderWidth: 1,
    backgroundColor: 'blue'
  },
  infoContainer: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'center',
    height: '35%',
    top: 30,
    backgroundColor: '#FEFEFE',
    borderRadius: 8
  },
  firstInfoContainer: {
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    width: '33.33%',
    justifyContent: 'center'
  },
  secondInfoContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    width: '33.33%',
    justifyContent: 'center'
  },
  thirdInfoContainer: {
    borderWidth: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    width: '33.33%',
    justifyContent: 'center'
  },
  fadedText: {
    fontSize: 20,
    color: '#565758',
    textAlign: 'center'
  },
  infoNumbers: {
    fontSize: 24
  }
})