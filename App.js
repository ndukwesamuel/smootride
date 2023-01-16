import React, {useEffect} from "react";
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
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

export default function App() {

  const requestUserPermission = async ()=>{
    const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  }

  useEffect(()=>{
    if (requestUserPermission()){
      //return fcm token for the device
      messaging().getToken().then(token => {
        console.log(token)
      })
    }
    else{
      console.log("Failed token status", authStatus)
    }

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

      //when the app is running, but in the background
      // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

return unsubscribe;

  }, [])


  let user = false;
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

          {/* <Stack.Screen
            name="RiderTrips"
            component={RiderTrips}
            options={{
              headerShown: false,
            }} 
          /> */}
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
