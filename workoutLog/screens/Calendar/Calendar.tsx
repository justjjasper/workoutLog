import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import { RootState } from '../../App';
import { useSelector } from 'react-redux';
import { LOCALTUNNEL } from '../../config';
import DateCell from './DateCell';
import SubHeading from './Subheading';
import Weekdays from './Weekdays';

interface Activity {
  activityid: number;
  activityname: string;
  activityinfo: string[];
  day: number;
  month: number;
  year: number;
}

export default function Calendar() {
  const username = useSelector<RootState, string | null>(state => state.username.username);
  const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);
  const currentMonth = useSelector<RootState, number>(state => state.currentDate.currentMonth);

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      const results = await axios.get(`${LOCALTUNNEL}/activities?usernameParam=${username}`)

      try {
        setActivities(results.data.map((activity: Activity) => {
          const { activityinfo, ...rest } = activity;
          return rest;
        }));
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
    const filteredActivities: Activity[] = activities.filter(activity =>
      activity.year === date.getFullYear() &&
      activity.month === date.getMonth() &&
      activity.day === date.getDate()
    );

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
    const filteredActivities: Activity[] = activities.filter(activity =>
      activity.year === date.getFullYear() &&
      activity.month === date.getMonth() &&
      activity.day === date.getDate()
    );

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
    const filteredActivities: Activity[] = activities.filter(activity =>
      activity.year === date.getFullYear() &&
      activity.month === date.getMonth() &&
      activity.day === date.getDate()
    );

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
    const filteredActivities: Activity[] = activities.filter(activity =>
      activity.year === date.getFullYear() &&
      activity.month === date.getMonth() + 1 &&
      activity.day === date.getDate()
    );

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
    <View style={styles.calendar}>
      <Text style={styles.heading}>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</Text>
      <SubHeading />
      <Weekdays />
      <View style={styles.dateCellsContainer}>{dateCells}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    flex: 0.5,
    borderWidth: 2,
    width: '97%',
    backgroundColor: 'pink',
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
  }
})