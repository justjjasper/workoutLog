import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';
import { RootState } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import { LOCALTUNNEL } from '../../config';
import DateCell from './DateCell';
import Heading from './Heading';
import Weekdays from './Weekdays';
import { Activity } from '../../types';
import { setActivities } from '../../actions';

export default function Calendar() {
  const emailAddress = useSelector<RootState, string | null>(state => state.emailAddress.emailAddress);
  const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);
  const currentMonth = useSelector<RootState, number>(state => state.currentDate.currentMonth);
  const activities = useSelector<RootState, Activity[]>(state => state.activities.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    const getActivities = async () => {
      const results = await axios.get(`${LOCALTUNNEL}/activities?emailAddressParam=${emailAddress}`)
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
        key={`prev-month-${i}`}
        day={numDaysInLastMonth - emptyCellsAtStart + i + 1}
        month={currentMonth - 1}
        isOutsideMonth={true}
        activities={filteredActivities}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <Heading />
        <Weekdays />
        <View style={styles.dateCellsContainer}>{dateCells}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    flex: 0.5,
    borderWidth: 2,
    width: '97%',
    backgroundColor: '#FEFEFE',
    justifyContent: 'space-evenly',
    alignItems: 'center'
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
    justifyContent: 'center'
  },
})