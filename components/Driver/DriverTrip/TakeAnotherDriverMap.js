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

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  CurrentLocationActivated,
  MapLocationActivated,
  resetAll_Excerpt_startTripdata,
  StartTimeCurrentLocationActivated,
} from "../../../Slice/Driver/StartTripSlice";
import EndTripButtton from "./EndTripButtton";

const TakeAnotherDriverMap = () => {
  const { width, height } = Dimensions.get("window");

  const { currentLocationData, startTripdata, maplocationdata } = useSelector(
    (state) => state.StartTripSlice
  );

  const { riderdata } = useSelector((state) => state.GetLastAssignTripSlice);
  const { holdriderdata } = useSelector((state) => state.HoldTripDataSlice);

  const mapHeight = height * 0.85;

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

  const ASPECT_RATIO = width / height;

  const LATITUDE_DELTA = 0.006339428281933124;
  const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

  const MainMAP = ({ locationdata }) => {
    return (
      <>
        <MapView
          className="border-2 border-red-200"
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: locationdata.coords.latitude,
            longitude: locationdata.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            coordinate={{
              latitude: locationdata.coords.latitude,
              longitude: locationdata.coords.longitude,
            }}
          />
        </MapView>

        <EndTripButtton />

        {/* // <>
      //   <MapView
      //     className="border-2 border-red-200"
      //     provider={PROVIDER_GOOGLE}
      //     style={{ flex: 1 }}
      //     initialRegion={{
      //       latitude: locationdata.coords.latitude,
      //       longitude: locationdata.coords.longitude,
      //       latitudeDelta: LATITUDE_DELTA,
      //       longitudeDelta: LONGITUDE_DELTA,
      //     }}
      //   >
      //     <Marker
      //       coordinate={{
      //         latitude: locationdata.coords.latitude,
      //         longitude: locationdata.coords.longitude,
      //       }}
      //     />
      //   </MapView>

      //   <EndTripButtton /> */}
      </>
    );
  };

  return (
    <View style={{ height: mapHeight }} className="">
      {maplocationdata && (
        <View className="pt-10 ">
          <View className="  items-center">
            <Card className=" items-center py-5">
              <Text>Location is Loading </Text>
              <ActivityIndicator animating={true} color="black" />
            </Card>
          </View>
        </View>
      )}

      {!maplocationdata && currentLocationData && (
        <>
          {holdriderdata?.data && (
            <MainMAP locationdata={currentLocationData} />
          )}
        </>
      )}

      {!maplocationdata && !currentLocationData && (
        <View className="pt-10 ">
          <View className="  items-center">
            <Card className=" items-center py-5">
              <Text>Cant Find Location </Text>
              <ActivityIndicator animating={true} color="black" />
            </Card>
          </View>
        </View>
      )}
    </View>
  );
};

export default TakeAnotherDriverMap;

const styles = StyleSheet.create({});
