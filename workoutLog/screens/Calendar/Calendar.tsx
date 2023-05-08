import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateCell from './DateCell';
import SubHeading from './Subheading';
import Weekdays from './Weekdays';
import { RootState } from '../../App';
import { useSelector } from 'react-redux';

export default function Calendar() {
  const currentDate = useSelector<RootState, Date>(state => state.currentDate['currentDate']);

  const dateCells = [];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();

  // Determine the starting and ending dates of the month
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month, numDaysInMonth);

  // Determine the day of the week for the starting date of the month (Sunday = 0, Monday = 1, etc.)
  const startDayOfWeek = startDate.getDay();

  // Determine the day of the week for the ending date of the month
  const endDayOfWeek = endDate.getDay();

  // Determine the last few days of the previous month
  const lastMonthEndDate = new Date(year, month, 0);
  const numDaysInLastMonth = lastMonthEndDate.getDate();
  const lastMonthEndDayOfWeek = lastMonthEndDate.getDay();

  // Add the days of the previous month
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    dateCells.push(
      <DateCell key={`prev-month-${i}`} day={numDaysInLastMonth - i} month={month - 1} />
    );
  }

  // Add the days of the current month
  for (let dayOfMonth = 1; dayOfMonth <= numDaysInMonth; dayOfMonth++) {
    dateCells.push(<DateCell key={dayOfMonth} day={dayOfMonth} month={month} />);
  }

  // Determine the first few days of the next month
  const emptyCellsAtEnd = 6 - endDayOfWeek;
  const nextMonthStartDate = new Date(year, month + 1, 1);
  for (let i = 1; i <= emptyCellsAtEnd; i++) {
    dateCells.push(
      <DateCell key={`next-month-${i}`} day={i} month={month + 1} />
    );
  }

  // Add the empty cells at the beginning and end of the dateCells array
  const emptyCellsAtStart = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  for (let i = 0; i < emptyCellsAtStart; i++) {
    dateCells.unshift(
      <DateCell key={`prev-month-${i}`} day={numDaysInLastMonth - emptyCellsAtStart + i + 1} month={month - 1} />
    );
  }

  return (
    <View style={styles.calendar}>
      <Text style={styles.heading}>June 17</Text>
      <SubHeading />
      <Weekdays />
      <View style={styles.dateCellsContainer}>{dateCells}</View>
    </View>
  );
}

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