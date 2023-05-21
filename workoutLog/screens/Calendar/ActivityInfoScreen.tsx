import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../types';
import { RouteProp, useRoute } from '@react-navigation/native'
/*
implements Type to useRoute that uses exported RootStackParamList(entire type stack of possible Route Navigation)
 `ActivityScreen_${number}` is implemented within RouteProp to show a dynamic screen name implemented via template literal
 These 2 Typing allows a secure type-safe operation where it confirms the types for the data(props) passed to child components

Finally, implement typing within the useRoute
*/
type ActivityInfoScreenRouteProp = RouteProp<
  RootStackParamList,
  `ActivityScreen_${number}`
>;

export default function ActivityInfoScreen() {
  const route = useRoute<ActivityInfoScreenRouteProp>();
  const { activity } = route.params;

  return (
    <View>
      <Text>
        Hello
      </Text>
    </View>
  )
};
