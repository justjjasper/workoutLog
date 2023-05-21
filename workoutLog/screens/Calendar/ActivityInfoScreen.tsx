import { View, Text, StyleSheet } from 'react-native';
import { Activity } from '../../types';
import { useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux';


// activityid params not correct, currently have activity being passed to each child from dateCellModal

export default function ActivityInfoScreen() {
  const dispatch = useDispatch();
  const route = useRoute();
  const { activityid } = route.params;

  return (
    <View>

    <Text>
      Hello {activityid}
    </Text>
    </View>
  )
};
// going to receive activityName id as a prop
// implement algorithm that iterates through the state of activities matching id from prop
