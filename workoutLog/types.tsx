export interface Activity {
  activityname: string;
  activityinfo: string[];
  day: number;
  month: number;
  year: number;
  activityid: number;
};

/*
Implements type for Navigation Routes
Calendar is undefined because it shows that Calendar Component does not receive children

ActivityScreen is indexed type, where key indicates that number in ActivityScreen is dynamic due to template literals
activity is the data(prop) being passed into the ActivityScreen components
*/
export type RootStackParamList = {
  Calendar: undefined;
} & {
  [key in `ActivityScreen_${number}`]: { activity: Activity };
};