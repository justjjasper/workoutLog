// future implementation of Linking after app is deployed
// import { Linking} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { HomeStackParamList } from './types';


// useEffect(() => {

//   const handleDeepLink = (event: { url: string }) => {
//     const token = event.url.split('?')[1].split('=')[1];

//     navigation.navigate('Calendar');
//     console.log('this is the token when you click on link', token)
//   };

//   Linking.addEventListener('url', handleDeepLink);

//   return () => {
//     Linking.removeAllListeners('url')
//   }
// });