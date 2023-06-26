// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// // import DateCell from './DateCell';
// // import SubHeading from './Subheading';
// // import Weekdays from './Weekdays';

// // /* Might have to eventually have a state for the Current Month? Current Date?
// //   In order to traverse through

// //   Might want to have a separate array for the Weekday/Day as a tuple
// //     And then loop through dateCells and input
// // */
// // export default function Calendar() {

// //   const dateCells = [];
// //   const calendarDays = [];

// //   // // Get current date
// //   const today = new Date();

// //   // Get number of days in the current month
// //   const year = today.getFullYear();
// //   const month = today.getMonth();
// //   const numDaysInMonth = new Date(year, month + 1, 0).getDate();

// //   const startDate = new Date(year, month, 1);
// //   const endDate = new Date(year, month + 1, 0);

// //   // Push Weekday/Day into an Array as a tuple
// //   for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
// //     // Get the day of the week and day of the month
// //     const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }).split(',')[0];
// //     const dayOfMonth = parseInt(date.toLocaleDateString('en-US', { day: 'numeric' }));

// //     // console.log(`${dayOfWeek}, ${dayOfMonth}`);
// //     calendarDays.push([dayOfWeek, dayOfMonth]);
// //   };

// //   // Creates date cells
// //   // Calculate the number of empty cells to add to the beginning and end of the calendar
// //   const firstDayOfMonth = new Date(year, month, 1);
// //   const firstDayOfWeek = firstDayOfMonth.getDay();

// //   // Get the last day of the week that falls within the current month
// //   const lastDayOfMonth = new Date(year, month + 1, 0);
// //   const lastDayOfWeek = lastDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.


// //   // Create an array of empty cells to insert at the beginning of the dateCells array
// //   const emptyCellsStart = Array.from({ length: firstDayOfWeek }, (_, i) => (
// //     <DateCell key={`empty-start-${i}`} day={null} month={month} />
// //   ));

// //   // Create an array of empty cells to insert at the end of the dateCells array
// //   const emptyCellsEnd = Array.from({ length: 6 - lastDayOfWeek }, (_, i) => (
// //     <DateCell key={`empty-end-${i}`} day={null} month={month}/>
// //   ));

// //   // Creates date cells
// //   for (let dayOfMonth = 1; dayOfMonth <= numDaysInMonth; dayOfMonth++) {
// //     dateCells.push(<DateCell key={dayOfMonth} day={dayOfMonth} month={month}/>);
// //   }

// //   // Insert the empty cells at the beginning and end of the dateCells array
// //   dateCells.unshift(...emptyCellsStart);
// //   dateCells.push(...emptyCellsEnd);

// //   return (
// //     <View style={styles.calendar}>
// //       <Text style={styles.heading}>June 17</Text>
// //       <SubHeading/>
// //       <Weekdays/>
// //       <View style={styles.dateCellsContainer}>{dateCells}</View>
// //     </View>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   calendar: {
// //     flex: 0.5,
// //     borderWidth: 2,
// //     width: '97%',
// //     backgroundColor: 'pink',
// //     justifyContent: 'space-evenly',
// //     alignItems: 'center'
// //   },
// //   dateCellsContainer: {
// //     flexWrap: 'wrap',
// //     flexDirection: 'row',
// //     width: '100%',
// //     justifyContent: 'center'
// //   },
// //   heading: {
// //     fontSize: 22
// //   }
// // })


// // // import React from 'react';
// // // import { View, Text, StyleSheet } from 'react-native';
// // // import DateCell from './DateCell';
// // // import SubHeading from './Subheading';
// // // import Weekdays from './Weekdays';

// // // export default function Calendar() {
// // //   const dateCells = [];
// // //   const calendarDays = [];

// // //   const today = new Date();
// // //   const year = today.getFullYear();
// // //   const month = today.getMonth();
// // //   const numDaysInMonth = new Date(year, month + 1, 0).getDate();

// // //   // Determine the starting and ending dates of the month
// // //   const startDate = new Date(year, month, 1);
// // //   const endDate = new Date(year, month, numDaysInMonth);

// // //   // Determine the day of the week for the starting date of the month (Sunday = 0, Monday = 1, etc.)
// // //   const startDayOfWeek = startDate.getDay();

// // //   // Determine the day of the week for the ending date of the month
// // //   const endDayOfWeek = endDate.getDay();

// // //   // Calculate the number of empty cells to add to the beginning and end of the calendar
// // //   const numEmptyCellsStart = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
// // //   const numEmptyCellsEnd = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;

// // //   // Add the previous month's days to the calendar
// // //   const prevMonth = month === 0 ? 11 : month - 1;
// // //   const prevYear = month === 0 ? year - 1 : year;
// // //   const numDaysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

// // //   for (let i = numDaysInPrevMonth - numEmptyCellsStart + 1; i <= numDaysInPrevMonth; i++) {
// // //     dateCells.push(<DateCell key={`empty-start-${i}`} day={i} month={prevMonth} />);
// // //   }

// // //   // Add the current month's days to the calendar
// // //   for (let dayOfMonth = 1; dayOfMonth <= numDaysInMonth; dayOfMonth++) {
// // //     const dayOfWeek = new Date(year, month, dayOfMonth).getDay();
// // //     dateCells.push(<DateCell key={dayOfMonth} day={dayOfMonth} month={month}/>);
// // //   }

// // //   // Add the next month's days to the calendar
// // //   const nextMonth = month === 11 ? 0 : month + 1;
// // //   const nextYear = month === 11 ? year + 1 : year;
// // //   const numDaysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();

// // //   for (let i = 1; i <= numEmptyCellsEnd; i++) {
// // //     dateCells.push(<DateCell key={`empty-end-${i}`} day={i} month={nextMonth} />);
// // //   }

// // //   // If the calendar doesn't have a full row for the last week of the month, add the first few days of the next month
// // //   if (dateCells.length % 7 !== 0) {
// // //     const numDaysToAdd = 7 - (dateCells.length % 7);
// // //     for (let i = 1; i <= numDaysToAdd; i++) {
// // //       dateCells.push(<DateCell key={`empty-end-${numEmptyCellsEnd + i}`} day={i} month={nextMonth} />);
// // //     }
// // //   }

// // //     return (
// // //     <View style={styles.calendar}>
// // //       <Text style={styles.heading}>June 17</Text>
// // //       <SubHeading/>
// // //       <Weekdays/>
// // //       <View style={styles.dateCellsContainer}>{dateCells}</View>
// // //     </View>
// // //   )
// // // }



// // // const styles = StyleSheet.create({
// // //   calendar: {
// // //     flex: 0.5,
// // //     borderWidth: 2,
// // //     width: '97%',
// // //     backgroundColor: 'pink',
// // //     justifyContent: 'space-evenly',
// // //     alignItems: 'center'
// // //   },
// // //   dateCellsContainer: {
// // //     flexWrap: 'wrap',
// // //     flexDirection: 'row',
// // //     width: '100%',
// // //     justifyContent: 'center'
// // //   },
// // //   heading: {
// // //     fontSize: 22
// // //   }
// // // })

// //////////////////////////////////////////
// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// // import DateCell from './DateCell';
// // import SubHeading from './Subheading';
// // import Weekdays from './Weekdays';

// // export default function Calendar() {
// //   const dateCells = [];
// //   const calendarDays = [];

// //   const today = new Date();
// //   const year = today.getFullYear();
// //   const month = today.getMonth();
// //   const numDaysInMonth = new Date(year, month + 1, 0).getDate();

// //   const startDate = new Date(year, month, 1);
// //   const endDate = new Date(year, month + 1, 0);

// //   const startDayOfWeek = startDate.getDay();
// //   const endDayOfWeek = endDate.getDay();

// //   const prevMonthEndDay = new Date(year, month, 0).getDate();
// //   const nextMonthStartDay = 1;

// //   // Push Weekday/Day into an Array as a tuple
// //   for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
// //     // Get the day of the week and day of the month
// //     const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }).split(',')[0];
// //     const dayOfMonth = parseInt(date.toLocaleDateString('en-US', { day: 'numeric' }));
// //     calendarDays.push([dayOfWeek, dayOfMonth]);
// //   };

// //   // Add the last few days of the previous month
// //   for (let i = startDayOfWeek - 1; i >= 0; i--) {
// //     calendarDays.unshift(['', prevMonthEndDay - i]);
// //   }

// //   // Add the first few days of the next month
// //   for (let i = 1; i <= 6 - endDayOfWeek; i++) {
// //     calendarDays.push(['', nextMonthStartDay + i]);
// //   }

// //   // Creates date cells
// //   for (let i = 0; i < calendarDays.length; i++) {
// //     const [dayOfWeek, dayOfMonth] = calendarDays[i];
// //     dateCells.push(<DateCell key={i} day={dayOfMonth} month={month} isCurrentMonth={dayOfWeek !== ''} />);
// //   }

// //   return (
// //     <View style={styles.calendar}>
// //       <Text style={styles.heading}>June 17</Text>
// //       <SubHeading/>
// //       <Weekdays/>
// //       <View style={styles.dateCellsContainer}>{dateCells}</View>
// //     </View>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   calendar: {
// //     flex: 0.5,
// //     borderWidth: 2,
// //     width: '97%',
// //     backgroundColor: 'pink',
// //     justifyContent: 'space-evenly',
// //     alignItems: 'center'
// //   },
// //   dateCellsContainer: {
// //     flexWrap: 'wrap',
// //     flexDirection: 'row',
// //     width: '100%',
// //     justifyContent: 'center'
// //   },
// //   heading: {
// //     fontSize: 22
// //   }
// // })


// // // 5/9/23 Calendar code
// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// // import DateCell from './DateCell';
// // import SubHeading from './Subheading';
// // import Weekdays from './Weekdays';
// // import { RootState } from '../../App';
// // import { useSelector } from 'react-redux';

// // export default function Calendar() {
// //   const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);
// //   const currentMonth = useSelector<RootState, number>(state => state.currentDate.currentMonth);

// //   const dateCells = [];

// //   const year = currentDate.getFullYear();
// //   // const month = currentDate.getMonth();
// //   const numDaysInMonth = new Date(year, currentMonth + 1, 0).getDate();

// //   // Determine the starting and ending dates of the month
// //   const startDate = new Date(year, currentMonth, 1);
// //   const endDate = new Date(year, currentMonth, numDaysInMonth);

// //   // Determine the day of the week for the starting date of the month (Sunday = 0, Monday = 1, etc.)
// //   const startDayOfWeek = startDate.getDay();

// //   // Determine the day of the week for the ending date of the month
// //   const endDayOfWeek = endDate.getDay();

// //   // Determine the last few days of the previous month
// //   const lastMonthEndDate = new Date(year, currentMonth, 0);
// //   const numDaysInLastMonth = lastMonthEndDate.getDate();
// //   const lastMonthEndDayOfWeek = lastMonthEndDate.getDay();

// //   // Add the days of the previous month
// //   for (let i = startDayOfWeek - 1; i >= 0; i--) {
// //     dateCells.push(
// //       <DateCell key={`prev-month-${i}`} day={numDaysInLastMonth - i} month={currentMonth - 1} />
// //     );
// //   }

// //   // Add the days of the current month
// //   for (let dayOfMonth = 1; dayOfMonth <= numDaysInMonth; dayOfMonth++) {
// //     dateCells.push(<DateCell key={dayOfMonth} day={dayOfMonth} month={currentMonth} />);
// //   }

// //   // Determine the first few days of the next month
// //   const emptyCellsAtEnd = 6 - endDayOfWeek;
// //   const nextMonthStartDate = new Date(year, currentMonth + 1, 1);
// //   for (let i = 1; i <= emptyCellsAtEnd; i++) {
// //     dateCells.push(
// //       <DateCell key={`next-month-${i}`} day={i} month={currentMonth + 1} />
// //     );
// //   }

// //   // Add the empty cells at the beginning and end of the dateCells array
// //   const emptyCellsAtStart = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
// //   for (let i = 0; i < emptyCellsAtStart; i++) {
// //     dateCells.unshift(
// //       <DateCell key={`prev-month-${i}`} day={numDaysInLastMonth - emptyCellsAtStart + i + 1} month={currentMonth - 1} />
// //     );
// //   }

// //   return (
// //     <View style={styles.calendar}>
// //       <Text style={styles.heading}>June 17</Text>
// //       <SubHeading />
// //       <Weekdays />
// //       <View style={styles.dateCellsContainer}>{dateCells}</View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   calendar: {
// //     flex: 0.5,
// //     borderWidth: 2,
// //     width: '97%',
// //     backgroundColor: 'pink',
// //     justifyContent: 'space-evenly',
// //     alignItems: 'center'
// //   },
// //   dateCellsContainer: {
// //     flexWrap: 'wrap',
// //     flexDirection: 'row',
// //     width: '100%',
// //     justifyContent: 'center'
// //   },
// //   heading: {
// //     fontSize: 22
// //   }
// // })



// /*
// Implementing workout titles for each DateCell

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import DateCell from './DateCell';
// import SubHeading from './Subheading';
// import Weekdays from './Weekdays';
// import { RootState } from '../../App';
// import { useSelector } from 'react-redux';

// export default function Calendar() {
//   const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);
//   const currentMonth = useSelector<RootState, number>(state => state.currentDate.currentMonth);
//   const workoutTitles = useSelector<RootState, WorkoutTitle[]>(state => state.workoutTitles);

//   const dateCells = [];

//   const year = currentDate.getFullYear();
//   // const month = currentDate.getMonth();
//   const numDaysInMonth = new Date(year, currentMonth + 1, 0).getDate();

//   // Determine the starting and ending dates of the month
//   const startDate = new Date(year, currentMonth, 1);
//   const endDate = new Date(year, currentMonth, numDaysInMonth);

//   // Determine the day of the week for the starting date of the month (Sunday = 0, Monday = 1, etc.)
//   const startDayOfWeek = startDate.getDay();

//   // Determine the day of the week for the ending date of the month
//   const endDayOfWeek = endDate.getDay();

//   // Determine the last few days of the previous month
//   const lastMonthEndDate = new Date(year, currentMonth, 0);
//   const numDaysInLastMonth = lastMonthEndDate.getDate();
//   const lastMonthEndDayOfWeek = lastMonthEndDate.getDay();

//   // Add the days of the previous month
//   for (let i = startDayOfWeek - 1; i >= 0 && dateCells.length < 35; i--) {
//     const dayOfMonth = numDaysInLastMonth - i;
//     const workoutTitle = workoutTitles.find(title => title.date === dayOfMonth && title.month === currentMonth - 1)?.title;
//     dateCells.push(
//       <DateCell key={`prev-month-${i}`} day={dayOfMonth} month={currentMonth - 1} workoutTitle={workoutTitle} />
//     );
//   }

//   // Add the days of the current month
//   for (let dayOfMonth = 1; dayOfMonth <= numDaysInMonth && dateCells.length < 35; dayOfMonth++) {
//     const workoutTitle = workoutTitles.find(title => title.date === dayOfMonth && title.month === currentMonth)?.title;
//     dateCells.push(<DateCell key={dayOfMonth} day={dayOfMonth} month={currentMonth} workoutTitle={workoutTitle} />);
//   }

//   // Determine the first few days of the next month
//   const emptyCellsAtEnd = 6 - endDayOfWeek;
//   const nextMonthStartDate = new Date(year, currentMonth + 1, 1);
//   for (let i = 1; i <= emptyCellsAtEnd && dateCells

// // */
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { View, Text, StyleSheet, ActivityIndicatorBase } from 'react-native';
// // import DateCell from './DateCell';
// // import SubHeading from './Heading';
// // import Weekdays from './Weekdays';
// // import { RootState } from '../../App';
// // import { useSelector } from 'react-redux';
// // import { LOCALTUNNEL } from '../../config';

// // interface Activity {
// //   activityid: number;
// //   activityinfo: string[];
// //   activityname: string;
// //   day: number;
// //   month: number;
// //   year: number;
// // };

// // export default function Calendar() {
// //   const username = useSelector<RootState, string | null>(state => state.username.username)
// //   const currentDate = useSelector<RootState, Date>(state => state.currentDate.currentDate);
// //   const currentMonth = useSelector<RootState, number>(state => state.currentDate.currentMonth);

// //   const [activities, setActivities] = useState<Activity[]>([]);

// //   console.log('what is the currentMonth', currentMonth)
// //   useEffect(() => {
// //     const getActivities = async () => {
// //       const results = await axios.get(`${LOCALTUNNEL}/activities?usernameParam=${username}`)

// //       try {
// //         setActivities(results.data);
// //       } catch(err) {
// //         console.log('there was an error in front end', err)
// //       }
// //     }

// //     getActivities();
// //   }, [])

// //   const year = currentDate.getFullYear();
// //   const numDaysInMonth = new Date(year, currentMonth + 1, 0).getDate();

// //   const startDate = new Date(year, currentMonth, 1);
// //   const endDate = new Date(year, currentMonth, numDaysInMonth);

// //   const startDayOfWeek = startDate.getDay();
// //   const endDayOfWeek = endDate.getDay();

// //   const lastMonthEndDate = new Date(year, currentMonth, 0);
// //   const numDaysInLastMonth = lastMonthEndDate.getDate();
// //   const lastMonthEndDayOfWeek = lastMonthEndDate.getDay();

// //   const dateCells = [];

// //   // Add the days of the previous month
// //   for (let i = startDayOfWeek - 1; i >= 0 && dateCells.length < 35; i--) {
// //     const date = new Date(year, currentMonth - 1, numDaysInLastMonth - i);
// //     const filteredActivities = activities.filter(activity =>
// //       activity.year === date.getFullYear() &&
// //       activity.month === date.getMonth() &&
// //       activity.day === date.getDate()
// //     );

// //     dateCells.push(
// //       <DateCell
// //         key={`prev-month-${i}`}
// //         day={numDaysInLastMonth - i}
// //         month={currentMonth - 1}
// //         isOutsideMonth={true}
// //         activities={filteredActivities}
// //       />
// //     );
// //   }

// //   // Add the days of the current month
// //   for (let dayOfMonth = 1; dayOfMonth <= numDaysInMonth && dateCells.length < 35; dayOfMonth++) {
// //     const date = new Date(year, currentMonth, dayOfMonth);
// //     const filteredActivities = activities.filter(activity =>
// //       activity.year === date.getFullYear() &&
// //       activity.month === date.getMonth() &&
// //       activity.day === date.getDate()
// //     );

// //     dateCells.push(
// //       <DateCell
// //         key={dayOfMonth}
// //         day={dayOfMonth}
// //         month={currentMonth}
// //         isOutsideMonth={false}
// //         activities={filteredActivities}
// //       />
// //     );
// //   }

// //   // Determine the first few days of the next month
// //   const emptyCellsAtEnd = 6 - endDayOfWeek;
// //   for (let i = 1; i <= emptyCellsAtEnd && dateCells.length < 35; i++) {
// //     const date = new Date(year, currentMonth + 1, i);
// //     const filteredActivities = activities.filter(activity =>
// //       activity.year === date.getFullYear() &&
// //       activity.month === date.getMonth() &&
// //       activity.day === date.getDate()
// //     );

// //     dateCells.push(
// //       <DateCell
// //         key={`next-month-${i}`}
// //         day={i}
// //         month={currentMonth + 1}
// //         isOutsideMonth={true}
// //         activities={filteredActivities}
// //       />
// //     );
// //   }

// //   // Add the empty cells at the beginning and end of the dateCells array
// //   const emptyCellsAtStart = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
// //   for (let i = 0; i < emptyCellsAtStart && dateCells.length < 35; i++) {
// //     const date = new Date(year, currentMonth, i);
// //     const filteredActivities = activities.filter(activity =>
// //       activity.year === date.getFullYear() &&
// //       activity.month === date.getMonth() + 1 &&
// //       activity.day === date.getDate()
// //     );

// //     dateCells.unshift(
// //       <DateCell
// //         key={`prev-month-${i}`}
// //         day={numDaysInLastMonth - emptyCellsAtStart + i + 1}
// //         month={currentMonth - 1}
// //         isOutsideMonth={true}
// //         activities={filteredActivities}
// //       />
// //     );
// //   }

// //   return (
// //     <View style={styles.calendar}>
// //       <Text style={styles.heading}>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</Text>
// //       <SubHeading />
// //       <Weekdays />
// //       <View style={styles.dateCellsContainer}>{dateCells}</View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   calendar: {
// //     flex: 0.5,
// //     borderWidth: 2,
// //     width: '97%',
// //     backgroundColor: 'pink',
// //     justifyContent: 'space-evenly',
// //     alignItems: 'center'
// //   },
// //   dateCellsContainer: {
// //     flexWrap: 'wrap',
// //     flexDirection: 'row',
// //     width: '100%',
// //     justifyContent: 'center'
// //   },
// //   heading: {
// //     fontSize: 22
// //   }
// // })


// //////////////////////////// 5/19/23 Home component
// import { Text, View, StyleSheet } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { setActivities } from '../actions';
// import { LOCALTUNNEL } from '../config';
// import { RootState } from '../App';
// import { Activity } from '../types';
// import Calendar from './Calendar/Calendar';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ActivityInfoScreen from './Calendar/ActivityInfoScreen';

// const Stack = createNativeStackNavigator();

// export default function Home () {
//   // Implement mapped Stacks of activityInfo below Calendar
//     // grap all of the activities, just map it out DUH
//   const dispatch = useDispatch();
//   const username = useSelector<RootState, string | null>(state => state.username.username);
//   const activities = useSelector<RootState, Activity[]>(state => state.activities.activities)

//   useEffect(() => {
//     const getActivities = async () => {

//       try {
//         const results = await axios.get(`${LOCALTUNNEL}/activities?usernameParam=${username}`)

//         dispatch(setActivities(results.data));
//       } catch(err) {
//         console.log('there was an error in front end', err)
//       }
//     }

//     getActivities();
//   }, []);
//   console.log('acivities at home', activities)
//   return (
//     <View style={styles.container}>
//       <Calendar />
//        {activities.length !== 0 &&
//       <View style={styles.stacks}>
//       <Stack.Navigator>
//         {activities?.map((activity: Activity) => (
//           <Stack.Screen
//           key={activity.activityid}
//           name= {`ActivityScreen_${activity.activityid}`}
//           initialParams={{ activity: activity }}
//           component= {ActivityInfoScreen}
//             />
//         ))}
//       </Stack.Navigator>
//     </View>
//       }
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E4E5E3",
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   stacks: {
//     position: 'absolute'
//   }

// })




