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
  resetAll_Excerpt_startTripdata,
  StartTimeCurrentLocationActivated,
} from "../../../Slice/Driver/StartTripSlice";
import { CompleteDriverTripFunc } from "../../../Slice/Driver/CompleteDriverTripSlice";
import { useNavigation } from "@react-navigation/native";

import { reset as resetGetLastAssignTripSlice } from "../../../Slice/Driver/GetLastAssignTripSlice";

const EndTripButtton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [EndingTrip, setEndingTrip] = useState(false);

  const {
    currentLocationData,
    startTimecurrentLocationData,
    EndTimeLastDestinationLocationData,
    LastDestinationLocationData,
    startTripdata,
    completedTripdata,
    maplocationdata,
  } = useSelector((state) => state.StartTripSlice);

  const { riderdata } = useSelector((state) => state.GetLastAssignTripSlice);

  const [startlocation, setStartlocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const [isConnected, setIsConnected] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  const { CompleteDriverTripData, IsLoading } = useSelector(
    (state) => state.CompleteDriverTripSlice
  );

  console.log("dsd");
  console.log({ hhhh: completedTripdata });
  console.log({ hhhh: completedTripdata });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  const stopTrip = async () => {
    NetworkState();

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let destination = await Location.getCurrentPositionAsync({});
    let EndTime = new Date().toISOString();

    if (
      currentLocationData &&
      destination &&
      startTimecurrentLocationData &&
      EndTime
    ) {
      let start_lat = currentLocationData.coords.latitude;
      let start_log = currentLocationData.coords.longitude;

      let end_lat = destination.coords.latitude;
      let end_log = destination.coords.longitude;

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

      // console.log(totlaCost);
      // console.log(unformattedcost);

      let data = {
        srcLat: start_lat,
        srcLong: start_log,
        destLat: end_lat,
        destLong: end_log,
        trip_start_time: startTimecurrentLocationData,
        tripAmt: totlaCost,
      };
      console.log(data);
      dispatch(CompletedTripActivated(data));
      dispatch(CompleteDriverTripFunc(data));
      dispatch(ActivateStartTrip());
      dispatch(resetGetLastAssignTripSlice());
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

  if (
    CompleteDriverTripData?.message ==
    "Trip could not be updated and is flagged"
  ) {
    Alert.alert(
      "Alert",
      `${CompleteDriverTripData?.message}`,
      [{ text: "OK" }],
      {
        cancelable: false,
      }
    );

    console.log("test2");
    navigation.navigate("exitdriver");
  } else if (CompleteDriverTripData?.success == true) {
    Alert.alert("Alert", `This is Great`, [{ text: "OK" }], {
      cancelable: false,
    });

    console.log("test");
    navigation.navigate("exitdriver");
  } else {
    console.log({ rrrh: CompleteDriverTripData });
    console.log({ hhhh: completedTripdata });
  }

  return (
    <View className="">
      <Card className="p-5 w-full ">
        <TouchableOpacity
          onPress={stopTrip}
          style={{ backgroundColor: "#a31225", padding: 10 }}
        >
          {IsLoading && (
            <TouchableOpacity
              style={{ backgroundColor: "#a31225", padding: 10 }}
            >
              <ActivityIndicator color="#fff" size="small" />
            </TouchableOpacity>
          )}

          {/* CompleteDriverTripData */}

          {!IsLoading && (
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
