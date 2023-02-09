import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import * as Location from "expo-location";
import Geolocation from "react-native-geolocation-service";

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

  //   useEffect(() => {
  //     getPermissions();
  //   }, []);
};

// export const GetAddress_OF_Location = async (coordinate_data) => {
//   console.log({ coordinate_data });
//   // const response = await fetch(
//   //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAsjKM16fbsmVRNU4jlrhn3yinTyu3z5JU`
//   // );
//   // const data = await response.json();
//   // console.log("skdsldddddddddddddddddddddddddddddddddd");
//   // console.log({ lala: data.results[0].formatted_address });
//   // // return data.results[0].formatted_address;
// };

export const GetAddress_OF_Location = async (currentLocation, address) => {
  console.log({ address });
  const { latitude, longitude } = currentLocation.coords;
  console.log({ data });
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAsjKM16fbsmVRNU4jlrhn3yinTyu3z5JU`
  );
  const data = await response.json();
  console.log("skdsldddddddddddddddddddddddddddddddddd");
  console.log({ lala: data.results[0].formatted_address });
};
