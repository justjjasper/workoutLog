import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { rootReducer } from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Root from './Root';

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default function App() {

  return (
    <Provider store={store}>
      <Root/>
    </Provider>
  );
}

