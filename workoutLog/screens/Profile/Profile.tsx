import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginEmailAddress } from '../../actions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Activity, ProfileStackParamList } from '../../types';
import { LOCALTUNNEL } from '../../config';
import axios from 'axios';
import { RootState } from '../../App';
import { set } from 'zod';

export default function Profile() {
  const emailAddress = useSelector<RootState, string>(state => state.emailAddress.emailAddress);
  const activities = useSelector<RootState, Activity[]>(state => state.activities.activities).length;
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [photoURI, setPhotoURI] = useState<string | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

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
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await axios.get(`${LOCALTUNNEL}/getUserInfo?userEmail=${emailAddress}`)

      try {
        const { full_name, height, weight, photo_uri } = userInfo.data
        setName(full_name);
        setHeight(height);
        setWeight(weight);
        setPhotoURI(photo_uri);
      } catch(err) {
        console.error('Error in retrieving userInfo from client side', err)
      }
    };

    getUserInfo();
  })

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.imageContainer}>User Image</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>navigation.navigate('Edit Profile')}
          >
            <Text>Edit Button</Text>
          </TouchableOpacity>
          <Text style={{fontSize:24}}>{name}</Text>
          <Text style={styles.fadedText}>{emailAddress}</Text>
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
  editButton: {
    position: 'relative',
    alignSelf: 'flex-end',
    bottom: 50,
    paddingRight: 10
  },
  imageContainer: {
    position: 'relative',
    bottom: 30,
    height: 70,
    width: 70,
    borderRadius: 25,
    borderWidth: 1
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