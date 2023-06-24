import { View, StyleSheet, Button } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setActivities } from '../actions';
import { LOCALTUNNEL } from '../config';
import { RootState } from '../App';
import { Activity } from '../types';
import Calendar from './Calendar/Calendar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityInfoScreen from './Calendar/ActivityInfoScreen';

const Stack = createNativeStackNavigator();

export default function Home () {
  const dispatch = useDispatch();
  const username = useSelector<RootState, string | null>(state => state.username.username);
  const activities = useSelector<RootState, Activity[]>(state => state.activities.activities)

  useEffect(() => {
    const getActivities = async () => {

      try {
        const results = await axios.get(`${LOCALTUNNEL}/activities?usernameParam=${username}`)
        dispatch(setActivities(results.data));
      } catch(err) {
        console.log('there was an error in front end', err)
      }
    }

    getActivities();
  }, []);

  return (
    <View style={styles.container}>

      {activities.length !== 0 &&
      <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#77C7E9'},
        headerTitleStyle: {color: 'white'},
        headerTintColor: 'white',
      }}
      >
        <Stack.Screen
          name= 'Calendar'
          component= {Calendar}
        />
        {activities?.map((activity: Activity) => (
          <Stack.Screen
          key={activity.activityid}
          name= {`ActivityScreen_${activity.activityid}`}
          initialParams={{ activity }}
          component= {ActivityInfoScreen}
          options= {{title: activity.activityname}}

          />
        ))}
      </Stack.Navigator>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E5E3',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  stacks: {
    position: 'absolute'
  }

})




