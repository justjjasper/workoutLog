import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile/Profile';

const Bottom = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#77C7E9',
        headerStyle: {backgroundColor: '#77C7E9'},
        headerTitleStyle: {color: 'white'}
      }}
      >
      <Bottom.Screen name='Home' component={Home} options={{ headerShown: false }}/>
      <Bottom.Screen name='Me' component={Profile}/>
    </Bottom.Navigator>
  )
};