import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivateStartTrip,
  CurrentLocationActivated,
  MapLocationActivated,
  resetAll_Excerpt_startTripdata,
  StartTimeCurrentLocationActivated,
} from "../../../Slice/Driver/StartTripSlice";
import { HoldRiderInfoActivated } from "../../../Slice/Driver/HoldTripDataSlice";
let driverIcon = require("../../../assets/images/profile.jpg");

import * as Location from "expo-location";

const TakeAnotherStartTrip = () => {
  const dispatch = useDispatch();

  const [maplocation, setMaplocation] = useState(false);

  const { startTripdata } = useSelector((state) => state.StartTripSlice);

  const { holdriderdata } = useSelector((state) => state.HoldTripDataSlice);

  let dataforDriverRequest = {
    isrequesting: false,
    FetchingisTripValid: false,
    checkingInternet: false,
    isFetching: false,
    rider_name: "sam",
    drivertrip: {
      isReady: false,
      isStarted: false,
      isFirstTrip: false,
      isEnded: false,
      cost: 100,
    },

    rider: {
      rider_name: "",
      rider_id: 1,
      accept: false,
      company_name: "Fistbank",
    },
  };

  const getPermissions = async () => {
    setMaplocation(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant Location permissions");
      return;
    }
    // let currentLocation = await Location.getCurrentPositionAsync({});

    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      allowsBackgroundLocationUpdates: true,
      showsBackgroundLocationIndicator: true,
    });
    let startTime = await new Date().toISOString();

    console.log(startTime);
    // console.log("location gotten ",currentLocation)
    setMaplocation(false);
    dispatch(MapLocationActivated(maplocation));
    dispatch(CurrentLocationActivated(currentLocation));
    dispatch(StartTimeCurrentLocationActivated(startTime));
  };

  const [startLoading, setStartLoading] = useState(false);

  const startTrip = () => {
    console.log(
      "startTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTripstartTrip"
    );
    setStartLoading(true);

    getPermissions();

    console.log("ddfd");
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: holdriderdata.data.pushToken,

        data: {
          type: "trip-start",
        },
        title: "Trip-starting again",
        body: "we are going on another ride  ",
      }),
    });
    dispatch(ActivateStartTrip());

    // setStartLoading(true);
    // console.log();
    setTimeout(() => {
      setStartLoading(false);
    }, 10000);
  };

  const call = (data) => {
    console.log("this is f");
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${data}`;
    } else {
      phoneNumber = `telprompt:${data}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View className="items-center mt-5">
      <Card className="pt-5">
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "22%", marginStart: 10 }}>
            {dataforDriverRequest.rider.rider_image != null && (
              <Image
                source={{
                  uri: `https://smoothride.ng/taxi/images/${this.props.rider.rider_image}`,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignSelf: "center",
                  margin: 5,
                }}
              />
            )}

            {dataforDriverRequest.rider.rider_image == null && (
              <Image
                source={driverIcon}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignSelf: "center",
                  margin: 5,
                }}
              />
            )}
          </View>

          <View style={{ width: "60%", marginLeft: 5 }}>
            <Text
              style={{
                fontSize: 15,
                marginTop: 1,
                color: "#877A80",
              }}
            >
              {holdriderdata?.data.staffName}
            </Text>

            {holdriderdata?.data.company ? (
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "800",
                  color: "#007cc2",
                  // fontFamily: "Roboto-Regular",
                }}
              >
                {holdriderdata?.data.company}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "200",
                  color: "#877A80",
                  // fontFamily: "Roboto-Regular",
                }}
              >
                Unknown
              </Text>
            )}
          </View>

          <View>
            <View
              style={{
                borderColor: "#007cc2",
                borderWidth: 2,
                borderRadius: 17,
                width: 35,
                height: 35,
                marginTop: 10,
              }}
            >
              <Ionicons
                onPress={() => call(holdriderdata?.data.phone)}
                name="md-call"
                size={20}
                style={{
                  color: "#007cc2",
                  alignSelf: "center",
                  marginTop: 5,
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          {dataforDriverRequest.isFetching == false && (
            <View>
              <View
                style={{ flexDirection: "row", marginTop: 10 }}
                className="pb-7 mx-5"
              >
                <View style={{ width: "50%" }}>
                  <TouchableOpacity
                    //  onPress={this.declineTrip}

                    style={{
                      borderColor: "#005091",
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 5,
                      width: "50%",
                      marginTop: 1,
                      // opacity: this.state.opacity,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color: "#005091",
                        fontSize: 15,
                      }}
                    >
                      Option
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ width: "50%" }}>
                  <TouchableOpacity
                    onPress={startTrip}
                    style={{
                      backgroundColor: "#005091",
                      borderRadius: 5,
                      padding: 5,
                      width: "100%",
                      marginTop: 1,

                      // opacity:this.state.opacity
                    }}
                  >
                    {!startLoading && (
                      <Text
                        style={{
                          alignSelf: "center",
                          color: "#fff",
                          fontSize: 15,
                          // fontFamily: "Roboto-Regular",
                        }}
                      >
                        Start Trip
                      </Text>
                    )}

                    {startLoading && (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};

export default TakeAnotherStartTrip;

const styles = StyleSheet.create({});
