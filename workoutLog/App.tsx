import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { rootReducer } from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Home from './screens/Home'

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name= 'Home'
            children= {() => <Home/>} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
