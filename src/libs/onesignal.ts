import { OneSignal } from 'react-native-onesignal';
import { Platform } from 'react-native';



function onesignalInitialize() {
  const oneSignalAppId =
    Platform.OS === 'ios'
      ? ''
      : "25f9f068-96c7-4056-b289-fb933bab4a52";

  if (oneSignalAppId) {
    OneSignal.initialize(oneSignalAppId);
  }

  if (Platform.OS === 'ios') {
    OneSignal.Notifications.canRequestPermission().then((response) => {
      if (response) {
        OneSignal.Notifications.requestPermission(true);
      }
    });
  }
}

export { onesignalInitialize };