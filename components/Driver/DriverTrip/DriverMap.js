import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
// import MapView from "react-native-maps";
import { Card } from "react-native-shadow-cards";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_MAPS_APIKEYS } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";
import {
  CurrentLocationActivated,
  MapLocationActivated,
  StartTimeCurrentLocationActivated,
} from "../../../Slice/Driver/StartTripSlice";
import EndTripButtton from "./EndTripButtton";

const DriverMap = () => {
  const { width, height } = Dimensions.get("window");

  const { currentLocationData, startTripdata } = useSelector(
    (state) => state.StartTripSlice
  );

  const mapHeight = height * 0.89;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const dispatch = useDispatch();
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [maplocation, setMaplocation] = useState(false);
  const [userLocation, setUerLocation] = useState(null);
  const [closedTrip, setClosedTrip] = useState(false);
  // const [startTime, setStartTime] = useState(null);

  const getPermissions = async () => {
    setMaplocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant Location permissions");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    let startTime = await new Date().toISOString();

    console.log(startTime);
    setLocation(currentLocation);
    // console.log("location gotten ",currentLocation)
    setMaplocation(false);
    dispatch(MapLocationActivated(maplocation));
    dispatch(CurrentLocationActivated(currentLocation));

    dispatch(StartTimeCurrentLocationActivated(startTime));
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.006339428281933124;
  const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
  const INITIAL_POSITION = {
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
    // latitude: 6.549405360528134,
    // longitude: 3.366228245355276,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <View style={{ height: mapHeight }} className="">
      {maplocation ? (
        <View className="pt-10 ">
          <View className="  items-center">
            <Card className=" items-center py-5">
              <Text>Loaction is Loading </Text>
              <ActivityIndicator animating={true} color="black" />
            </Card>
          </View>
        </View>
      ) : (
        <>
          <MapView
            className="border-2 border-red-200"
            style={{ flex: 1 }}
            initialRegion={INITIAL_POSITION}
          >
            <Marker coordinate={INITIAL_POSITION} identifier="origin" />
          </MapView>

          <EndTripButtton />
        </>
      )}
    </View>
  );
};

export default DriverMap;

const styles = StyleSheet.create({});
