import { Text, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginEmailAddress } from '../../actions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Activity, ProfileStackParamList } from '../../types';
import { LOCALTUNNEL } from '../../config';
import axios from 'axios';
import { RootState } from '../../App';

// figure out why im not able to require images properly
export default function Profile() {
  const emailAddress = useSelector<RootState, string>(state => state.emailAddress.emailAddress);
  const activities = useSelector<RootState, Activity[]>(state => state.activities.activities).length;
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const placeHolderImage = require('../../assets/profileHolder.png');
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [photoURI, setPhotoURI] = useState<  string>(placeHolderImage);
  const [weight, setWeight] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);

  const handleSetName = (name: string) => {
    setName(name)
  };

  const handleSetPhotoURI = (URI: string)  => {
    setPhotoURI(prevResponse => {
      prevResponse = URI;
      return prevResponse
    })
  };

  const handleSetWeight = (weight: string | null) => {
    setWeight(weight)
  };

  const handleSetHeight = (height: string | null) => {
    setHeight(height);
  };

  const navigateToEditProfile = () => {
    navigation.navigate('Edit Profile', {
      handleSetName: (a) => handleSetName(a),
      handleSetPhotoURI: (a) => handleSetPhotoURI(a),
      handleSetWeight: (a) => handleSetWeight(a),
      handleSetHeight: (a) => handleSetHeight(a),
      height,
      weight,
      name,
      photoURI
    });
  };

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
    console.log('activities length:', activities)
  }, [activities, navigation]);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await axios.get(`${LOCALTUNNEL}/getUserInfo?userEmail=${emailAddress}`)

      try {
        const { full_name, height, weight, photo_uri } = userInfo.data
        setName(full_name);
        setHeight(height);
        setWeight(weight);
        setPhotoURI(photo_uri || placeHolderImage);
        console.log('crurent value of photo in profile:', photoURI)
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
                source= { typeof photoURI === 'string' ? { uri: photoURI } : placeHolderImage}
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
            <Text style={styles.infoNumbers}>{weight ? weight : '--'}</Text>
            <Text style={styles.fadedText}>{`Current\nWeight`}</Text>
          </View>

          <View style={styles.secondInfoContainer}>
            <Text style={styles.infoNumbers}>{height ? height : '--'}</Text>
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