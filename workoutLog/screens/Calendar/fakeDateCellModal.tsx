// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../App';
// import { Activity } from '../../types';

// // Heading (Title close icon on right)
// // Day of Week/Month and Day {`${monthName.slice(0, 3)} ${day}`}
// // Calendar
// // ButtonsBelow

// interface DateCellModalProps {
//   day: string | number | null;
//   month: number;
//   year: number;
//   monthName: string;
//   activities: Activity[];
//   toggleModal: () => void;
// }

// const DateCellModal: React.FC<DateCellModalProps> = ({ day, month, year, monthName, activities, toggleModal }) => {
//   const date = new Date(year, month, Number(day));
//   const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0];

//   console.log(dayOfWeek)
//   return (
//     <View style={styles.modalContainer}>

//       <View style={styles.headingContainer}>
//         <Text style={styles.modalHeading}>Activity List</Text>
//       <TouchableOpacity onPress={toggleModal}>
//         <Text style={styles.closeButtonText}>x</Text>
//       </TouchableOpacity>
//       </View>

//       <View style={styles.activityNameContainer}>
//         {activities.map((activity: Activity) => (
//           <TouchableOpacity key={activity.activityid} style={styles.activityNameButton}>
//             <Text style={styles.activityName}>{activity.activityname}</Text>
//             <Text style={styles.activityName}>&gt;</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.footerContainer}>
//         <TouchableOpacity style={styles.footerButton}>
//           <Text style={styles.footerText}>Create</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerButton}>
//           <Text style={styles.footerText}>Delete</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     backgroundColor: '#E4E5E3',
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     height: '55%'
//   },
//   headingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     borderBottomWidth: 1.5,
//     paddingBottom: 10
//   },
//   modalHeading: {
//     fontSize: 25.5,
//     fontWeight: 'bold'
//   },
//   closeButtonText: {
//     color: '#565758',
//     fontWeight: 'bold',
//     fontSize: 27
//   },
//   activityNameContainer: {
//     width: '100%',
//     height: '55%',
//     borderWidth: 2,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     alignItems: 'center'
//   },
//   activityNameButton: {
//     height: '17%',
//     width: '90%',
//     backgroundColor: '#AFDBE1',
//     borderRadius: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginTop: 20
//   },
//   activityName: {
//     fontSize: 23,
//     color: 'black'
//   },
//   closeButton: {
//     borderRadius: 8,
//   },
//   footerContainer: {
//     flexDirection:'row',
//     justifyContent: 'space-evenly',
//     width: '100%'
//   },
//   footerButton: {
//     height: 30,
//     width: 60,
//     backgroundColor: '#77C7E8',
//     borderRadius: 20,
//     justifyContent: 'center'
//   },
//   footerText: {
//     fontSize: 17,
//     textAlign: 'center'
//   }
// });

// export default DateCellModal;









// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../App';
// import { Activity } from '../../types';

// // Heading (Title close icon on right)
// // Day of Week/Month and Day {`${monthName.slice(0, 3)} ${day}`}
// // Calendar
// // ButtonsBelow

// interface DateCellModalProps {
//   day: string | number | null;
//   month: number;
//   year: number;
//   monthName: string;
//   activities: Activity[];
//   toggleModal: () => void;
// }

// const DateCellModal: React.FC<DateCellModalProps> = ({ day, month, year, monthName, activities, toggleModal }) => {
//   const date = new Date(year, month, Number(day));
//   const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0];

//   console.log(dayOfWeek);
//   const shouldUseScrollView = activities.length > 4;

//   return (
//     <View style={styles.modalContainer}>

//       <View style={styles.headingContainer}>
//         <Text style={styles.modalHeading}>Activity List</Text>
//         <TouchableOpacity onPress={toggleModal}>
//           <Text style={styles.closeButtonText}>x</Text>
//         </TouchableOpacity>
//       </View>

//       {shouldUseScrollView ? (
//         <SafeAreaView style={styles.activityNameContainer}>
//           <ScrollView >
//             {activities.map((activity: Activity) => (
//               <TouchableOpacity key={activity.activityid} style={styles.activityNameButton}>
//                 <Text style={styles.activityName}>{activity.activityname}</Text>
//                 <Text style={styles.activityName}>&gt;</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </SafeAreaView>
//       ) : (
//         <View style={styles.activityNameContainer}>
//           {activities.map((activity: Activity) => (
//             <TouchableOpacity key={activity.activityid} style={styles.activityNameButton}>
//               <Text style={styles.activityName}>{activity.activityname}</Text>
//               <Text style={styles.activityName}>&gt;</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}

//       <View style={styles.footerContainer}>
//         <TouchableOpacity style={styles.footerButton}>
//           <Text style={styles.footerText}>Create</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerButton}>
//           <Text style={styles.footerText}>Delete</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   modalContainer: {
//     backgroundColor: '#E4E5E3',
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     height: '55%'
//   },
//   headingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     borderBottomWidth: 1.5,
//     paddingBottom: 10
//   },
//   modalHeading: {
//     fontSize: 25.5,
//     fontWeight: 'bold'
//   },
//   closeButtonText: {
//     color: '#565758',
//     fontWeight: 'bold',
//     fontSize: 27
//   },
//   activityNameContainer: {
//     width: '100%',
//     height: '55%',
//     borderWidth: 2,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     alignItems: 'center'
//   },
//   activityNameButton: {
//     height: '17%',
//     width: 250,
//     backgroundColor: '#AFDBE1',
//     borderRadius: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginTop: 20
//   },
//   activityName: {
//     fontSize: 23,
//     color: 'black'
//   },
//   closeButton: {
//     borderRadius: 8,
//   },
//   footerContainer: {
//     flexDirection:'row',
//     justifyContent: 'space-evenly',
//     width: '100%'
//   },
//   footerButton: {
//     height: 30,
//     width: 60,
//     backgroundColor: '#77C7E8',
//     borderRadius: 20,
//     justifyContent: 'center'
//   },
//   footerText: {
//     fontSize: 17,
//     textAlign: 'center'
//   }
// });

// export default DateCellModal;