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
  DestAddressDataFun,
  EndTimeLastDestinationLocationActivated,
  Google_Distance_Matrix_API_FUN,
  LastDestinationLocationActivated,
  MapLocationActivated,
  resetAll_Excerpt_startTripdata,
  StartTimeCurrentLocationActivated,
  TotalDistanceCoveredFun,
  TotalpointActivated,
  TotalTripAmountFun,
} from "../../../Slice/Driver/StartTripSlice";
import { CompleteDriverTripFunc } from "../../../Slice/Driver/CompleteDriverTripSlice";
import { useNavigation } from "@react-navigation/native";

import { reset as resetGetLastAssignTripSlice } from "../../../Slice/Driver/GetLastAssignTripSlice";
import { First_Trip_StartTime } from "../../../Slice/Driver/FristTripSlice";
import { GetUserConfigFun } from "../../../Slice/Driver/GetUserConfig";
import { getType } from "@reduxjs/toolkit";
import {
  GetAddress_OF_Location,
  Get_Location_Way_Point,
  Pick_Place_Function,
  thisFun,
} from "../../../Config/GoogleLocationAPi";

const EndTripButtton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [EndingTrip, setEndingTrip] = useState(false);
  const [claculated, setClaculated] = useState(null);

  const {
    currentLocationData,
    startTimecurrentLocationData,
    EndTimeLastDestinationLocationData,
    LastDestinationLocationData,
    startTripdata,
    completedTripdata,
    maplocationdata,
    totalTripAmount,
    total_distance_covered,
    pickUpAddressData,
    destAddressData,
    totalpointData,
    Google_Distance_Matrix_API,
  } = useSelector((state) => state.StartTripSlice);

  const { First_Trip_start_time, First_Trip_Location } = useSelector(
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

  // data.pushToken

  const { getuserDATA } = useSelector((state) => state.GetUserConfigSlice);

  useEffect(() => {
    dispatch(GetUserConfigFun(holdriderdata));

    return () => {};
  }, []);

  const [counter, setCounter] = useState(0);
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant Location permissions");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});

    // Get_Location_Way_Point(currentLocation);
    const startCoords = {
      latitude: currentLocationData?.coords.latitude,
      longitude: currentLocationData?.coords.longitude,
    };

    const endCoords = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };

    dispatch(TotalpointActivated(endCoords));

    let Result_Of_Meters_Corverd = haversine(startCoords, endCoords);

    let distance__ =
      parseFloat(Result_Of_Meters_Corverd) + parseFloat(total_distance_covered);

    dispatch(CurrentLocationActivated(currentLocation));
    dispatch(TotalDistanceCoveredFun(distance__));
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      getPermissions();
      setCounter(counter + 1);
    }, 10000);
    return () => clearTimeout(interval);
  }, [counter]);

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
    let destination = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      accuracy: Location.Accuracy.High,
    });
    let EndTime = new Date().toISOString();
    let adddressResult = await GetAddress_OF_Location(destination);
    dispatch(DestAddressDataFun(adddressResult));

    function GoogleMetixFomular(
      currentLocationData,
      destination,
      First_Trip_start_time,
      EndTime
    ) {
      let googleorigin = [
        First_Trip_Location.coords.latitude,
        First_Trip_Location.coords.longitude,
      ];
      let googledestination = [
        destination.coords.latitude,
        destination.coords.longitude,
      ];
      let API_KEY = "AIzaSyAsjKM16fbsmVRNU4jlrhn3yinTyu3z5JU";
      const API_URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${googleorigin}&destinations=${googledestination}&key=${API_KEY}`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setClaculated(data);
          dispatch(Google_Distance_Matrix_API_FUN(data));
          // Use the data to display the distance and time on your map
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (
      currentLocationData &&
      destination &&
      First_Trip_start_time &&
      EndTime
    ) {
      GoogleMetixFomular(
        currentLocationData,
        destination,
        First_Trip_start_time,
        EndTime
      );
    }

    if (
      currentLocationData &&
      destination &&
      First_Trip_start_time &&
      EndTime &&
      Google_Distance_Matrix_API
    ) {
      let start_lat = currentLocationData.coords.latitude;
      let start_log = currentLocationData.coords.longitude;

      let end_lat = destination.coords.latitude;
      let end_log = destination.coords.longitude;

      const startCoords = { latitude: start_lat, longitude: start_log };
      const endCoords = { latitude: end_lat, longitude: end_log };

      let Result_Of_Meters_Corverd = haversine(startCoords, endCoords);

      let distance__2 =
        parseFloat(Result_Of_Meters_Corverd) +
        parseFloat(total_distance_covered);

      dispatch(TotalDistanceCoveredFun(distance__2));

      // formular = base + km + time
      let basefare = getuserDATA?.config.basefare;
      let km = total_distance_covered * getuserDATA?.config.perkm;

      const timestamp1 = First_Trip_start_time;
      const timestamp2 = EndTime;
      const date1 = new Date(timestamp1);
      const date2 = new Date(timestamp2);
      const diffInMs = date2 - date1;
      const travelTime = diffInMs / 1000 / 60;

      let travelTimeCost = travelTime * getuserDATA?.config.permin;
      let Amount_without_Base_fare = travelTimeCost + km;

      console.log({ Amount_without_Base_fare });

      let TripSummaryData = {
        srcLat: First_Trip_Location.coords.latitude,
        srcLong: First_Trip_Location.coords.longitude,
        destLat: end_lat,
        destLong: end_log,
        trip_start_time: First_Trip_start_time,
        tripAmt: Amount_without_Base_fare,
        date_End: EndTime,
        WaitedTime: "this is the time they waite",
        Cost_of_waiting: "this is the waiting period",
        Distant_Covered: total_distance_covered,
        travelTime: travelTime,
        tripPoints: JSON.stringify(totalpointData),
        googlemetix: claculated,
      };

      dispatch(CompletedTripActivated(TripSummaryData));

      // dispatch(CompletedTripActivated(TripSummaryData));
      dispatch(ActivateStartTrip());
      dispatch(resetGetLastAssignTripSlice());

      let Data_to_be_Sent_to_rider = {
        trip_start_time: First_Trip_start_time,
        Distant_Covered: total_distance_covered,
        tripAmt: parseFloat(basefare) + Amount_without_Base_fare,
        date_End: EndTime,
      };

      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: holdriderdata.data.pushToken,
          data: { extraData: Data_to_be_Sent_to_rider },
          title: "Trip Update",
          body: "This is a summary of the recently completed trip.  ",
        }),
      });
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
