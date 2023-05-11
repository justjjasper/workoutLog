import React, {useEffect} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import DateCell from './DateCell';
import SubHeading from './Subheading';
import Weekdays from './Weekdays';
import { RootState } from '../../App';
import { useSelector } from 'react-redux';
import { LOCALTUNNEL } from '../../config';

export default function Calendar() {
  const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);
  const currentMonth = useSelector<RootState, number>(state => state.currentDate.currentMonth);

  const dateCells = [];

  useEffect(() => {
    const getActivities = async () => {
      const results = await axios.get(`${LOCALTUNNEL}/activities`)

      try {
        console.log('waht are results', results.data)
      }
      catch(err) {
        console.log('thee was an error in fron tend', err)
      }
    }

    getActivities();
  }, [])

  const year = currentDate.getFullYear();
  // const month = currentDate.getMonth();
  const numDaysInMonth = new Date(year, currentMonth + 1, 0).getDate();

  // Determine the starting and ending dates of the month
  const startDate = new Date(year, currentMonth, 1);
  const endDate = new Date(year, currentMonth, numDaysInMonth);

  // Determine the day of the week for the starting date of the month (Sunday = 0, Monday = 1, etc.)
  const startDayOfWeek = startDate.getDay();

  // Determine the day of the week for the ending date of the month
  const endDayOfWeek = endDate.getDay();

  // Determine the last few days of the previous month
  const lastMonthEndDate = new Date(year, currentMonth, 0);
  const numDaysInLastMonth = lastMonthEndDate.getDate();
  const lastMonthEndDayOfWeek = lastMonthEndDate.getDay();

  // Add the days of the previous month
  for (let i = startDayOfWeek - 1; i >= 0 && dateCells.length < 35; i--) {
    dateCells.push(
      <DateCell
        key={`prev-month-${i}`}
        day={numDaysInLastMonth - i}
        month={currentMonth - 1}
        isOutsideMonth={true}
      />
    );
  }

  // Add the days of the current month
  for (let dayOfMonth = 1; dayOfMonth <= numDaysInMonth && dateCells.length < 35; dayOfMonth++) {
    dateCells.push(
      <DateCell
        key={dayOfMonth}
        day={dayOfMonth}
        month={currentMonth}
        isOutsideMonth={false}
      />);
  }

  // Determine the first few days of the next month
  const emptyCellsAtEnd = 6 - endDayOfWeek;
  const nextMonthStartDate = new Date(year, currentMonth + 1, 1);
  for (let i = 1; i <= emptyCellsAtEnd && dateCells.length < 35; i++) {
    dateCells.push(
      <DateCell
        key={`next-month-${i}`}
        day={i}
        month={currentMonth + 1}
        isOutsideMonth={true}
      />
    );
  }

  // Add the empty cells at the beginning and end of the dateCells array
  const emptyCellsAtStart = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  for (let i = 0; i < emptyCellsAtStart && dateCells.length < 35; i++) {
    dateCells.unshift(
      <DateCell
        key={`prev-month-${i}`}
        day={numDaysInLastMonth - emptyCellsAtStart + i + 1}
        month={currentMonth - 1}
        isOutsideMonth={true}
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