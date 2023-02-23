import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import RiderProfile from "./RiderProfile";
import RiderRequest from "./RiderRequest";
import RiderTrips from "./RiderTrips";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();



export function RiderTabNavigation() {

    const { notificationDataModal, notificationData } = useSelector(
        (state) => state.UpdateuserexpotokenSlice
      );
    
      console.log("rider side ", {notificationData} );
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