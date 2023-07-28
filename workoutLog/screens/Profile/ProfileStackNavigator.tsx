import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile  from './Profile';
import EditProfile from './EditProfile';
const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#77C7E9'},
      headerTitleStyle: {color: 'white'},
      headerTintColor: 'white'
    }}
    >
      <Stack.Screen
        name= 'Profile'
        component= {Profile}
      />
      <Stack.Screen
        name= 'Edit Profile'
        component= {EditProfile}
      />
    </Stack.Navigator>
  )
};