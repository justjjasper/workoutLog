import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BottomTabNav from './screens/BottomTabNav';
import { RootState } from './App';
import Login from './screens/Login/Login';

const Stack = createNativeStackNavigator();

export default function Root() {
  // const username = useSelector<RootState, string | null>(state => state.username.username);
  const username = false;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {username ? (
          <Stack.Screen
            name="Bottom Nav"
            children={() => <BottomTabNav />}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            children={() => <Login />}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
