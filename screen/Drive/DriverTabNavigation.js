import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import DriverProfile from "./DriverProfile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Pending from "./Pending";
import { Ionicons } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";
import Trip from "./Trip";
import Driver from "./Driver";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationDataFunC,
  NotificationDataModalFunC,
  NotificationDatasReset,
} from "../../Slice/auth/UpdateuserexpotokenSlice";
import { GetLastAssignTrip } from "../../Slice/Driver/GetLastAssignTripSlice";
import * as Network from "expo-network";
import { useState } from "react";
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { NetworkFun } from "../../Slice/Driver/StartTripSlice";

const Tab = createBottomTabNavigator();

const DriverTabNavigation = () => {
  const dispatch = useDispatch();

  const { notificationDataModal, notificationData } = useSelector(
    (state) => state.UpdateuserexpotokenSlice
  );

  const { user, data, isError, isSuccess, isLoading } = useSelector(
    (state) => state.LoginSlice
  );

  const { Networkdata } = useSelector((state) => state.StartTripSlice);

  console.log({ Networkdata });
  console.log({ userlog: data?.user.email });
  console.log({ userlog: data?.user.id });

  console.log({ notificationData });
  console.log({ notificationData: notificationData?.notification });

  console.log(notificationDataModal);

  const notificationGetTrip = () => {
    dispatch(
      GetLastAssignTrip({
        user_id: data?.user.id,
      })
    );
    dispatch(NotificationDatasReset());
  };

  const notificationChange = () => {
    dispatch(NotificationDatasReset());
  };

  const [first, setFirst] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type:", state.type);
      console.log("Is connected?", state.isConnected);

      if (state.isConnected) {
        dispatch(NetworkFun(false));
      } else {
        dispatch(NetworkFun(true));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
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

      {notificationData && (
        <Modal
          visible={notificationDataModal}
          animationType="slide"
          transparent={true}
          // isVisible={this.state.getlocationmodal}
        >
          <View className=" justify-center flex-1 items-center">
            <View className="bg-white  items-center w-[90%] rounded-lg p-2">
              {notificationData?.notification && (
                <>
                  {notificationData && (
                    <Text className="px-3 text-[#877A80] text-[15px]">
                      {notificationData?.notification.request.content.body}
                    </Text>
                  )}

                  {notificationData?.notification.request.content.data.type !=
                    "trip-request" && (
                    <>
                      <Pressable
                        className="bg-red-400 mt-10 w-[30%] rounded "
                        onPress={notificationChange}
                      >
                        <Text className="text-white  p-2 text-center">
                          Close
                        </Text>
                      </Pressable>
                    </>
                  )}

                  {notificationData?.notification.request.content.data.type ===
                    "trip-request" && (
                    <Pressable
                      className="bg-black mt-10 w-[30%] rounded "
                      onPress={notificationGetTrip}
                    >
                      <Text className="text-white  p-2 text-center">
                        trip request
                      </Text>
                    </Pressable>
                  )}
                </>
              )}

              {notificationData?.request && (
                <>
                  {notificationData && (
                    <Text className="px-3 text-[#877A80] text-[15px]">
                      {notificationData?.request.content.body}
                    </Text>
                  )}

                  {notificationData?.request.content.data.type !=
                    "trip-request" && (
                    <Pressable
                      className="bg-red-400 mt-10 w-[30%] rounded "
                      onPress={notificationChange}
                    >
                      <Text className="text-white  p-2 text-center">CLose</Text>
                    </Pressable>
                  )}

                  {notificationData?.request.content.data.type ===
                    "trip-request" && (
                    <Pressable
                      className="bg-black mt-10 w-[30%] rounded "
                      onPress={notificationGetTrip}
                    >
                      <Text className="text-white  p-2 text-center">
                        trip request
                      </Text>
                    </Pressable>
                  )}
                </>
              )}
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default DriverTabNavigation;

const styles = StyleSheet.create({});
