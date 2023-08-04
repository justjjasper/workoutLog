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
};

export type EditProfileParams = {
  handleSetName: (name: string) => void;
  handleSetPhotoURI: (photoURI: string) => void;
  handleSetWeight: (weight: string | null) => void;
  handleSetHeight: (feet: string | null, inches: string | null) => void;
  name: string;
  photoURI:  | string;
  weight: string | null;
  height: { feet: string | null, inches: string | null }
};

export type ProfileStackParamList = {
  ['Profile']: undefined,
  ['Edit Profile']: EditProfileParams
}