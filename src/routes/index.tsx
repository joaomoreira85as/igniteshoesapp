import { useTheme } from "native-base";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { OSNotification, OneSignal } from "react-native-onesignal";
import { useEffect, useState } from "react";
import { Notification } from "../components/Notification";

const linking = {
  prefixes: [
    "com.techsolutions.igniteshoes://",
    "igniteshoesapp://",
    "exp+igniteshoesapp://",
  ],
  config: {
    screens: {
      details: {
        path: "details/:productId",
        parse: {
          productId: (productId: string) => productId,
        },
      },
    },
  },
};

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (event) => {
        console.log(event);

        setNotification(event.getNotification());
      }
    );
    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {notification && (
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      )}
    </NavigationContainer>
  );
}
