import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile  from './Profile';
import EditProfile from './EditProfile';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
const Stack = createNativeStackNavigator();

const HeaderWithGradient = () => (
  <LinearGradient
  style = {styles.header}
  colors ={['#6941C6', '#9B78ED', '#B89EF3']}
  start= {{ x: 0, y: 0}}
  end= {{ x: 0.8, y: 1 }}
  locations = {[0.3, 0.8, 1]}
>

</LinearGradient>
);

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerBackground: () => <HeaderWithGradient/>,
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

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})