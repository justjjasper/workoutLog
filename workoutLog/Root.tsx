// import { YellowBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { RootState } from './App';
import BottomTabNav from './screens/BottomTabNav';
import Signup from './screens/Login/Signup';
import Login from './screens/Login/Login';
import {LinearGradient} from 'expo-linear-gradient';

const Stack = createNativeStackNavigator();

// YellowBox.ignoreWarnings([
//   'Non-serializable values were found in the navigation state',
// ]);

const HeaderWithGradient = () => (
  <LinearGradient
    colors ={['#6941C6', '#9B78ED', '#B89EF3']}
    style= {styles.header}
    start= {{ x: 0, y: 0}}
    end= {{ x: 0.8, y: 1 }}
    locations = {[0.3, 0.8, 1]}
  >

  </LinearGradient>
)
export default function Root() {
  const authenticated = useSelector<RootState, boolean>(state => state.toggleLogin);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticated ? (
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
        <Stack.Screen
          name= 'Sign Up Page'
          children= {() => <Signup/>}
          options={{
            headerBackground: () => <HeaderWithGradient/>,
            headerTintColor: 'white',
            headerTransparent: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})