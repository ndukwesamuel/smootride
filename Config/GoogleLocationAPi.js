import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import * as Location from "expo-location";
import Geolocation from "react-native-geolocation-service";
import { PickUpAddressFun } from "../Slice/Driver/StartTripSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

export const Pick_Place_Function = () => {
  const getAddress = async (latitude, longitude) => {
    console.log(latitude, longitude);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAsjKM16fbsmVRNU4jlrhn3yinTyu3z5JU`
    );
    const data = await response.json();
    console.log("skdsldddddddddddddddddddddddddddddddddd");
    console.log({ lala: data.results[0].formatted_address });
    // return data.results[0].formatted_address;
  };

  const getPermissions = async () => {
    // setMaplocation(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});

    let startTime = new Date().toISOString();

    // console.log({ currentLocation: currentLocation.coords });

    const { latitude, longitude } = currentLocation.coords;

    if (currentLocation) {
      getAddress(latitude, longitude);
    }

    // setLocation(currentLocation);
    // // console.log("location gotten ",currentLocation)
    // setMaplocation(false);

    // console.log({ maplocation });
    // dispatch(MapLocationActivated(maplocation));
    // dispatch(CurrentLocationActivated(currentLocation));
    // dispatch(First_Trip_StartTime_Activated(startTime));
  };

  getPermissions();
};

export const GetAddress_OF_Location = async (currentLocation, address) => {
  const { latitude, longitude } = currentLocation.coords;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAsjKM16fbsmVRNU4jlrhn3yinTyu3z5JU`;

  try {
    const response = await axios.post(url);
    let Address = response.data.results[0].formatted_address;

    return Address;
  } catch (error) {
    return error;
  }
};

export const Get_Location_Way_Point = async (currentLocation) => {
  const { latitude, longitude } = currentLocation.coords;
  let item = { latitude, longitude };

  let data = [];
  data.push(item);
  console.log(data);
};

export const WaitingTimeFun = async () => {
  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
};
// const getAddress = async (currentLocation, address) => {
//   const { latitude, longitude } = currentLocation.coords;

//   try {
//     const response = await axios.post(url);
//     console.log({ CompleteDriverTripService: response.data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// if (address == "pickUpAddress") {
//   console.log("this is to get start address");
//   console.log({ placeeData });
//   dispatch(PickUpAddressFun(placeeData));
// }

// PickUpAddressFun,
// DestAddressDataFun,

const NAme = () => {
  let ans = 2 + 2;
};
