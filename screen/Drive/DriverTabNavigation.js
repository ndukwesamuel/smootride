import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DriverProfile from "./DriverProfile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Pending from "./Pending";
import { Ionicons } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";
import Trip from "./Trip";
import Driver from "./Driver";

const Tab = createBottomTabNavigator();

const DriverTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Eventhome"
      screenOptions={{
        tabBarActiveTintColor: "rgba(72, 130, 101, 0.5)",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Driver"
        component={Driver}
        options={{
          title: "Driver",
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
        name="Trip"
        component={Trip}
        options={{
          title: "Trip",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="local-car-wash"
                size={30}
                color={focused ? "#005091" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Pending"
        component={Pending}
        options={{
          title: "Pending",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="pending-actions"
                size={24}
                color={focused ? "#005091" : "gray"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="DriverProfile"
        component={DriverProfile}
        options={{
          title: "DriverProfile",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="user"
                size={30}
                color={focused ? "#005091" : "gray"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default DriverTabNavigation;

const styles = StyleSheet.create({});
