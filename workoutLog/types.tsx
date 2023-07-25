export interface Activity {
  activityName: string;
  activityInfo: string | null;
  day: number;
  month: number;
  year: number;
  activityId: number;
};

/*
Implements type for Navigation Routes
Calendar is undefined because it shows that Calendar Component does not receive props

ActivityScreen is indexed type, where key indicates that number in ActivityScreen is dynamic due to template literals
activity is the data(prop) being passed into the ActivityScreen components
*/
export type HomeStackParamList = {
  Calendar: undefined;
} & {
  [key in `ActivityScreen_${number}`]: { activity: Activity };
};

export type RootStackParamList = {
  ['Login']: undefined;
  ['Sign Up Page']: undefined
}