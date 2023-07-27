import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from './App';
import BottomTabNav from './screens/BottomTabNav';
import Signup from './screens/Login/Signup';
import Login from './screens/Login/Login';

const Stack = createNativeStackNavigator();

export default function Root() {
  const emailAddress = useSelector<RootState, string>(state => state.emailAddress.emailAddress);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {emailAddress.length === 0 ? (
          <Stack.Screen
            name="Login"
            children={() => <Login />}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Bottom Nav"
            children={() => <BottomTabNav />}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Stack.Screen
          name= 'Sign Up Page'
          children= {() => <Signup/>}
          options={{
            headerStyle: {
              backgroundColor: '#77C7E8',
            },
            headerTintColor: 'white',
            headerTransparent: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
