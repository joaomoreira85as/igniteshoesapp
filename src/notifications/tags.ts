import { OneSignal } from "react-native-onesignal";

export function tagUserEmailCreate(userEmail: string){
    OneSignal.User.addTag('user_email',userEmail);
}