import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setActivities } from '../actions';
import { LOCALTUNNEL } from '../config';
import { RootState } from '../App';
import { Activity } from '../types';
import Calendar from './Calendar/Calendar';

export default function Home () {
  // Implement mapped Stacks of activityInfo below Calendar
    // grap all of the activities, just map it out DUH

  const dispatch = useDispatch();
  const username = useSelector<RootState, string | null>(state => state.username.username);

  useEffect(() => {
    const getActivities = async () => {
      const results = await axios.get(`${LOCALTUNNEL}/activities?usernameParam=${username}`)

      try {
        dispatch(setActivities(results.data));
      } catch(err) {
        console.log('there was an error in front end', err)
      }
    }

    getActivities();
  }, []);

  return (
    <View style={styles.container}>
      <Text> I'm a home screen :D</Text>
      <Calendar/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  }
})