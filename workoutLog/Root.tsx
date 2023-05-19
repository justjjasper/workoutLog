import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BottomTabNav from './screens/BottomTabNav';
import { RootState } from './App';

const Stack = createNativeStackNavigator();

export default function Root() {
  const username = useSelector<RootState, string | null>(state => state.username.username);

  return (
   <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name= 'Bottom Nav'
          children= {() => <BottomTabNav/>}
          options={{
            headerShown: false
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

