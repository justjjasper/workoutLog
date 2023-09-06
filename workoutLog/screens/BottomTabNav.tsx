import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import ProfileStackNavigator from './Profile/ProfileStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons'

const Bottom = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {

          if (route.name === 'Calendar') {
            return <Icon name='calendar-sharp' size={25} color={color} />;
          } else if (route.name === 'ProfileBottomTab') {
            return <Icon name='person-sharp' size={25} color={color} />;
          }
        },
        tabBarActiveTintColor: '#9B78ED',
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#77C7E9' },
        headerTitleStyle: { color: 'white' }
      })}

      >
      <Bottom.Screen name='Calendar' component={Home} options={{ headerShown: false }}/>
      <Bottom.Screen name='ProfileBottomTab' component={ProfileStackNavigator} options={{ headerShown: false, title: 'Profile' }}/>
    </Bottom.Navigator>
  )
};