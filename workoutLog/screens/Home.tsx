import { View, StyleSheet, Button } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import Calendar from './Calendar/Calendar';
import ActivityInfoScreen from './Calendar/ActivityInfoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setActivities } from '../actions';
import { LOCALTUNNEL } from '../config';
import { RootState } from '../App';
import { Activity } from '../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Home () {
  const dispatch = useDispatch();
  const activities = useSelector<RootState, Activity[]>(state => state.activities.activities);

  useEffect(() => {
    const getActivities = async () => {

      try {
        const token = await AsyncStorage.getItem('jwtToken');
        // console.log('[Home] token', token)
        /*
          Its taking the login AsyncStorage a delayed second to store the jwt, causes token from Home
          end to be null
        */
        if (token === null) {
          throw new Error('No jwt token found, from client side (Home Stack).')
        };

        const headers = {
          authorization : `Bearer ${token}`
        };

        const results = await axios.get(`${LOCALTUNNEL}/activities`, { headers })
        dispatch(setActivities(results.data));
        // console.log('wht are activities in Home:', activities)
      } catch(err) {
        console.log('[Home] there was an error in front end', err)
      }
    }

    getActivities();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#77C7E9'},
        headerTitleStyle: {color: 'white'},
        headerTintColor: 'white',
      }}
      >
        <Stack.Screen
          name= 'Calendar2'
          component= {Calendar}
          options = {{
            headerShown: false
          }}
          />
        {activities?.map((activity: Activity) => {
          // console.log('what are the mapped activities',  activity)
          return (
            <Stack.Screen
            key={activity.activityId}
            name= {`ActivityScreen_${activity.activityId}`}
            initialParams={{ activity }}
            component= {ActivityInfoScreen}
            options= {{title: activity.activityName}}
            />
            )
          }

          )}
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  stacks: {
    position: 'absolute'
  }

})




