import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginEmailAddress } from '../../actions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types';

interface InfoDataItem {
  weight?: number;
  currentWeight?: string;
  height?: number;
  currentHeight?: string;
  workouts?: number;
  totalWorkouts?: string;
};

export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
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

  const infoData: InfoDataItem[] = [
    { weight: 69, currentWeight: 'Current\nWeight'},
    { height: 69, currentHeight: 'Current\nHeight' },
    { workouts: 69, totalWorkouts: 'Total\nWorkouts'}
  ] // eventually change to object with {infoData/ infoLabel} AND change infoData Type

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
          <Text style={{fontSize:24}}>Name</Text>
          <Text style={styles.fadedText}>Email</Text>
        </View>

        <View style={styles.infoContainer}>
          {infoData.map((info, i) =>
            <View
              style={[
                i === 0 ? styles.firstInfoContainer : undefined,
                i === 1 ? styles.secondInfoContainer : undefined,
                i === 2 ? styles.thirdInfoContainer : undefined
              ]}
              key={i}
            >
              {info.weight && <Text style={styles.infoNumbers}>{info.weight}</Text>}
              {info.currentWeight && (
                <Text style={styles.fadedText}>{info.currentWeight}</Text>
              )}
              {info.height && <Text style={styles.infoNumbers}>{info.height}</Text>}
              {info.currentHeight && (
                <Text style={styles.fadedText}>{info.currentHeight}</Text>
              )}
              {info.workouts && <Text style={styles.infoNumbers}>{info.workouts}</Text>}
              {info.totalWorkouts && (
                <Text style={styles.fadedText}>{info.totalWorkouts}</Text>
              )}
            </View>
          )}
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