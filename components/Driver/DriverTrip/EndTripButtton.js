import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";
const haversine = require("haversine");

import NetInfo from "@react-native-community/netinfo";
import Geolocation from "react-native-geolocation-service";
import { useDispatch, useSelector } from "react-redux";

import * as Location from "expo-location";
import {
  ActivateStartTrip,
  CompletedTripActivated,
  CurrentLocationActivated,
  EndTimeLastDestinationLocationActivated,
  LastDestinationLocationActivated,
  MapLocationActivated,
  StartTimeCurrentLocationActivated,
} from "../../../Slice/Driver/StartTripSlice";

const EndTripButtton = () => {
  const dispatch = useDispatch();

  const [EndingTrip, setEndingTrip] = useState(false);

  const {
    currentLocationData,
    startTimecurrentLocationData,
    EndTimeLastDestinationLocationData,
    LastDestinationLocationData,
    startTripdata,
  } = useSelector((state) => state.StartTripSlice);

  const { riderdata } = useSelector((state) => state.GetLastAssignTripSlice);

  const [startlocation, setStartlocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const { maplocationdata, completedTripdata } = useSelector(
    (state) => state.StartTripSlice
  );
  const [isConnected, setIsConnected] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  const stopTrip = async () => {
    setEndingTrip(true);
    NetworkState();

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let destination = await Location.getCurrentPositionAsync({});
    let EndTime = await new Date().toISOString();

    setDestination(destination);
    dispatch(LastDestinationLocationActivated(destination));
    dispatch(EndTimeLastDestinationLocationActivated(EndTime));

    if (
      currentLocationData &&
      LastDestinationLocationData &&
      startTimecurrentLocationData &&
      EndTimeLastDestinationLocationData
    ) {
      let start_lat = currentLocationData.coords.latitude;
      let start_log = currentLocationData.coords.longitude;

      let end_lat = LastDestinationLocationData.coords.latitude;
      let end_log = LastDestinationLocationData.coords.longitude;

      const startCoords = { latitude: start_lat, longitude: start_log };
      const endCoords = { latitude: end_lat, longitude: end_log };

      let Result_Of_Meters_Corverd = haversine(startCoords, endCoords, {
        unit: "meter",
      });

      let distance_In_KM = Result_Of_Meters_Corverd / 1000;

      let fare_In_Km = distance_In_KM * riderdata.config.basefare;
      let startSec = new Date(startTimecurrentLocationData).getTime();
      let date = new Date(Date.now());
      let endSec = date.getTime();

      let diff_In_sec = (endSec - startSec) / 1000;
      let SecSpent = (diff_In_sec / 60) * parseFloat(riderdata.config.permin);

      let totlaCost =
        fare_In_Km + SecSpent + parseFloat(riderdata.config.basefare);
      let unformattedcost =
        fare_In_Km + SecSpent + parseFloat(riderdata.config.basefare);
      totlaCost = totlaCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      let travelTime = diff_In_sec;

      // let totalwaitingcost = parseFloat(riderdata.config.waitingTime) / 60) * parseFloat(this.props.rider.price_config.waitpermin);

      console.log(totlaCost);
      console.log(unformattedcost);

      let data = {
        srcLat: start_lat,
        srcLong: start_log,
        destLat: end_lat,
        destLong: end_log,
        trip_start_time: startTimecurrentLocationData,
        tripAmt: totlaCost,
      };

      dispatch(CompletedTripActivated(data));
      dispatch(ActivateStartTrip());
      setEndingTrip(false);
    }
  };

  const NetworkState = () => {
    if (isConnected == false) {
      Alert.alert("Alert", "No Internet Connection", [{ text: "OK" }], {
        cancelable: false,
      });
      return false;
    }
    if (isInternetReachable == false) {
      Alert.alert(
        "Alert",
        "Internet Connection not Accessible",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    }
  };

  // const stopTrip = () => {
  //   NetworkState();
  // };

  return (
    <View className="">
      <Card className="p-5 w-full ">
        <TouchableOpacity
          onPress={stopTrip}
          style={{ backgroundColor: "#a31225", padding: 10 }}
        >
          {EndingTrip && (
            <TouchableOpacity
              style={{ backgroundColor: "#a31225", padding: 10 }}
            >
              <ActivityIndicator color="#fff" size="small" />
            </TouchableOpacity>
          )}

          {!EndingTrip && (
            <Text
              style={{
                alignSelf: "center",
                color: "#fff",
                fontSize: 15,
                //   fontFamily: "Roboto-Regular",
              }}
            >
              End Trip
            </Text>
          )}
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default EndTripButtton;

const styles = StyleSheet.create({});
