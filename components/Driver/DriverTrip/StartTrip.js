import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivateStartTrip,
  resetAll_Excerpt_startTripdata,
} from "../../../Slice/Driver/StartTripSlice";
import { HoldRiderInfoActivated } from "../../../Slice/Driver/HoldTripDataSlice";
let driverIcon = require("../../../assets/images/profile.jpg");

const StartTrip = () => {
  const dispatch = useDispatch();
  const { riderdata } = useSelector((state) => state.GetLastAssignTripSlice);
  const { startTripdata } = useSelector((state) => state.StartTripSlice);

  const { holdriderdata } = useSelector((state) => state.HoldTripDataSlice);

  useEffect(() => {
    dispatch(HoldRiderInfoActivated(riderdata));
    return () => {};
  }, [riderdata]);

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
      rider_image: null,
      company_name: "Fistbank",
    },
  };

  const startTrip = () => {
    dispatch(ActivateStartTrip());
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

export default StartTrip;

const styles = StyleSheet.create({});
