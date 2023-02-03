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
import { First_Trip_StartTime } from "../../../Slice/Driver/FristTripSlice";

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

  const { First_Trip_start_time } = useSelector(
    (state) => state.FristTripSlice
  );

  const { riderdata } = useSelector((state) => state.GetLastAssignTripSlice);
  const { holdriderdata } = useSelector((state) => state.HoldTripDataSlice);

  const [startlocation, setStartlocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const [isConnected, setIsConnected] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  const { CompleteDriverTripData, IsLoading } = useSelector(
    (state) => state.CompleteDriverTripSlice
  );

  // console.log("dsd");
  // console.log({ hhhh: holdriderdata });
  // console.log({ hhhh: completedTripdata });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  const stopTrip = async () => {
    setEndingTrip(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let destination = await Location.getCurrentPositionAsync({});
    let EndTime = new Date().toISOString();

    if (
      currentLocationData &&
      destination &&
      First_Trip_start_time &&
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

      let fare_In_Km = distance_In_KM * holdriderdata.config.basefare;
      let startSec = new Date(First_Trip_start_time).getTime();
      let date = new Date(Date.now());
      let endSec = date.getTime();

      let diff_In_sec = (endSec - startSec) / 1000;
      let SecSpent =
        (diff_In_sec / 60) * parseFloat(holdriderdata.config.permin);

      let totlaCost =
        fare_In_Km + SecSpent + parseFloat(holdriderdata.config.basefare);
      let unformattedcost =
        fare_In_Km + SecSpent + parseFloat(holdriderdata.config.basefare);
      totlaCost = totlaCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      let travelTime = diff_In_sec;

      // let totalwaitingcost = parseFloat(riderdata.config.waitingTime) / 60) * parseFloat(this.props.rider.price_config.waitpermin);

      // console.log(totlaCost);
      // console.log(unformattedcost);

      let TripSummaryData = {
        srcLat: start_lat,
        srcLong: start_log,
        destLat: end_lat,
        destLong: end_log,
        trip_start_time: First_Trip_start_time,
        tripAmt: totlaCost,
        date_End: EndTime,
        WaitedTime: "this is the time they waite",
        Cost_of_waiting: "this iw the waiting period",
        Distant_Covered: distance_In_KM,
      };

      dispatch(CompletedTripActivated(TripSummaryData));
      dispatch(ActivateStartTrip());
      dispatch(resetGetLastAssignTripSlice());
    }

    setEndingTrip(false);
  };

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

          {/* CompleteDriverTripData */}

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
