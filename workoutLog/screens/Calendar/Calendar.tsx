import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text } from 'react-native';
import { RootState } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import { LOCALTUNNEL } from '../../config';
import { Activity } from '../../types';
import { setActivities } from '../../actions';
import { LinearGradient } from 'expo-linear-gradient';
import DateCell from './DateCell';
import Heading from './Heading';
import Weekdays from './Weekdays';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Calendar () {
  const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);
  const currentMonth = useSelector<RootState, number>(state => state.currentDate.currentMonth);
  const activities = useSelector<RootState, Activity[]>(state => state.activities.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    const getActivities = async () => {
      const token = await AsyncStorage.getItem('jwtToken');

      const headers = {
        authorization: `Bearer ${token}`
      }
      const results = await axios.get(`${LOCALTUNNEL}/activities`, { headers })
      try {
        dispatch(setActivities(results.data))
      } catch(err) {
        console.log('there was an error in front end', err)
      }
    }

    getActivities();
  }, []);

  const year = currentDate.getFullYear();
  const numDaysInMonth = new Date(year, currentMonth + 1, 0).getDate();

  const startDate = new Date(year, currentMonth, 1);
  const endDate = new Date(year, currentMonth, numDaysInMonth);

  const startDayOfWeek = startDate.getDay();
  const endDayOfWeek = endDate.getDay();

  const lastMonthEndDate = new Date(year, currentMonth, 0);
  const numDaysInLastMonth = lastMonthEndDate.getDate();
  const lastMonthEndDayOfWeek = lastMonthEndDate.getDay();

  const dateCells = [];

  // Add the days of the previous month
  for (let i = startDayOfWeek - 1; i >= 0 && dateCells.length < 35; i--) {
    const date = new Date(year, currentMonth - 1, numDaysInLastMonth - i);
    const filteredActivities: Activity[] = activities.filter(activity => {
      const activityDate = new Date(activity.year, activity.month, activity.day);

      return (
        activityDate.toDateString() === date.toDateString()
      );
    });


    dateCells.push(
      <DateCell
        position ='none'
        key={`prev-month-${i}`}
        day={numDaysInLastMonth - i}
        month={currentMonth - 1}
        isOutsideMonth={true}
        activities={filteredActivities}
      />
    );
  }

  // Add the days of the current month
  for (let dayOfMonth = 1; dayOfMonth <= numDaysInMonth && dateCells.length < 35; dayOfMonth++) {
    const date = new Date(year, currentMonth, dayOfMonth);
    const filteredActivities: Activity[] = activities.filter(activity => {
      const activityDate = new Date(activity.year, activity.month, activity.day);

      return (
        activityDate.toDateString() === date.toDateString()
      );
    });

    dateCells.push(
      <DateCell
        position ='none'
        key={dayOfMonth}
        day={dayOfMonth}
        month={currentMonth}
        isOutsideMonth={false}
        activities={filteredActivities}
      />
    );
  }

  // Determine the first few days of the next month
  const emptyCellsAtEnd = 6 - endDayOfWeek;
  for (let i = 1; i <= emptyCellsAtEnd && dateCells.length < 35; i++) {
    const date = new Date(year, currentMonth + 1, i);
    const filteredActivities: Activity[] = activities.filter(activity => {
      const activityDate = new Date(activity.year, activity.month, activity.day);

      return (
        activityDate.toDateString() === date.toDateString()
      );
    });

    dateCells.push(
      <DateCell
        position ='none'
        key={`next-month-${i}`}
        day={i}
        month={currentMonth + 1}
        isOutsideMonth={true}
        activities={filteredActivities}
      />
    );
  }

  // Add the empty cells at the beginning and end of the dateCells array
  const emptyCellsAtStart = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  for (let i = 0; i < emptyCellsAtStart && dateCells.length < 35; i++) {
    const date = new Date(year, currentMonth, i);
    const filteredActivities: Activity[] = activities.filter(activity => {
      const activityDate = new Date(activity.year, activity.month, activity.day);

      return (
        activityDate.toDateString() === date.toDateString()
      );
    });

    dateCells.unshift(
      <DateCell
        position ='none'
        key={`prev-month-${i}`}
        day={numDaysInLastMonth - emptyCellsAtStart + i + 1}
        month={currentMonth - 1}
        isOutsideMonth={true}
        activities={filteredActivities}
      />
    );
  }
  // Adds the corresponding of the corner dateCells, along with original props
  dateCells[0] = < DateCell {...dateCells[0].props} position='first' />
  dateCells[6] = < DateCell {...dateCells[6].props} position='second' />
  dateCells[28] = < DateCell {...dateCells[28].props} position='third' />
  dateCells[34] = < DateCell {...dateCells[34].props} position='fourth' />

  return (
    <LinearGradient
      colors={['#6941C6','#9B78ED','#DDCBEB']}
      locations= {[0, 0.2, 0.8]}
      start={{ x: 0.7, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.headingText}>Calendar</Text>
      <View style={styles.calendar}>
        <Heading />
        <Weekdays />
        <View style={styles.dateCellsContainer}>{dateCells}</View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  calendar: {
    flex: 0.5,
    borderRadius: 10,
    width: '97%',
    backgroundColor: '#FEFEFE',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowOffset: {width: -10, height: 10},
    shadowColor: 'black', // Shadow color,
    shadowOpacity: 0.25, // Opacity (0 to 1)
    shadowRadius: 10,
  },
  dateCellsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 22
  },
  container: {
    flex: 1,
    backgroundColor: '#E4E5E3',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headingText: {
    fontSize: 30,
    color: 'white',
    bottom: 50
  }
})