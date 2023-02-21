import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import Login from "./screen/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tripmap from "./screen/Tripmap";
import { Provider } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { store, persistor } from "./store";
import Forgetpassword from "./screen/Forgetpassword";
import DriverProfile from "./screen/Drive/DriverProfile";
import RiderProfile from "./screen/rider/RiderProfile";
import RiderTrips from "./screen/rider/RiderTrips";
import RiderRequest from "./screen/rider/RiderRequest";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DriverTabNavigation from "./screen/Drive/DriverTabNavigation";
import { PersistGate } from "redux-persist/integration/react";
import RiderPaths from "./screen/rider/RiderPath";
import ExitDriverScreen from "./screen/Drive/ExitDriverScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import messaging from '@react-native-firebase/messaging';
// import messaging from "@react-native-firebase/messaging";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Notifications from "expo-notifications";
import { useState } from "react";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Eventhome"
      screenOptions={{
        tabBarActiveTintColor: "rgba(72, 130, 101, 0.5)",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="RiderRequest"
        component={RiderRequest}
        options={{
          title: "Request",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="car"
                size={30}
                color={focused ? "#005091" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="RiderTrips"
        component={RiderTrips}
        options={{
          title: "Trips",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="car"
                size={30}
                color={focused ? "#005091" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="RiderProfile"
        component={RiderProfile}
        options={{
          title: "Profile",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="person"
                size={30}
                color={focused ? "#005091" : "gray"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});
export default function App() {
  const [pushToken, setPushToken] = useState();

  useEffect(() => {
    async function getNotificationPermission() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
      }
      if (status !== "granted") {
        // Handle the case where the user declines permission
        console.log("Failed to get push token for push notification!");
        return;
      }

      let token;
      token = (await Notifications.getExpoPushTokenAsync()).data;

      console.log({ first_token: token });
      // Permission granted, handle accordingly
      await AsyncStorage.setItem("PushToken", token);
      const value = await AsyncStorage.getItem("PushToken");

      console.log({ value });
      setPushToken(value);
    }

    getNotificationPermission();
    // getNotificationPermission();
  }, []);

  useEffect(() => {
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log({ response });

        Alert.alert(
          "Alert",

          `${response}`,
          [{ text: "Yes" }, { text: "No" }],
          { cancelable: false }
        );
      });

    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log({ notification });

        Alert.alert(
          "Alert",

          `${notification}`,
          [{ text: "Yes" }, { text: "No" }],
          { cancelable: false }
        );
        //}
        // let data = notification;
        // console.log({ data });
        // GetAddress_OF_Location(notification);

        return;
      });

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  console.log({ pushToken });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
            />

            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="DriverTabNavigation"
              component={DriverTabNavigation}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="RiderPaths"
              component={RiderPaths}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
            name="riderprofile"
            component={RiderProfile}
            options={{
              headerShown: false,
            }}
          /> */}

            <Stack.Screen
              name="forgetpassword"
              component={Forgetpassword}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="tripmap"
              component={Tripmap}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="exitdriver"
              component={ExitDriverScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    // <View style={styles.container}>
    // <Text>it works</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
