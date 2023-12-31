import { useTheme } from "native-base";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { OSNotification, OneSignal } from "react-native-onesignal";
import { useEffect, useState } from "react";
import { Notification } from "../components/Notification";

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification | null>();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (event) => {
        setNotification(event.getNotification());
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      "click",
      (event) => {
        console.log("Notificação foi clicada!");
      }
    );
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
      {notification && (
        <Notification
          data={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </NavigationContainer>
  );
}
