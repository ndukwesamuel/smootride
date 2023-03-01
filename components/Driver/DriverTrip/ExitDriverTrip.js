import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Network } from "expo";

import {
  ExitTripFunc,
  reset as ExitReset,
} from "../../../Slice/Driver/ExitTripSlice";
import LogoutComponent from "./LogoutComponent";
import { resetholdriderdata } from "../../../Slice/Driver/HoldTripDataSlice";

import { reset as AcceptReset } from "../../../Slice/Driver/DriverAcceptTripSlice";
import {
  CompleteDriverTripFunc,
  reset as CompleteDriverReset,
} from "../../../Slice/Driver/CompleteDriverTripSlice";

import { reset as resetGetLastAssignTripSlice } from "../../../Slice/Driver/GetLastAssignTripSlice";

import { reset as resetGetAllDriverTripsSlice } from "../../../Slice/Driver/GetAllDriverTripsSlice";
import { reset as resetUpdateDriverStatusSlice } from "../../../Slice/Driver/UpdateDriverStatusSlice";
import {
  resetALLStartTrip,
  resetAll_Excerpt_startTripdata,
} from "../../../Slice/Driver/StartTripSlice";

import { reset as resetGetrider } from "../../../Slice/auth/Getrider";

import { reset as resetExitTripSlice } from "../../../Slice/Driver/ExitTripSlice";

import { reset as resetRejectTripSlice } from "../../../Slice/Driver/RejectTripSlice";
import { reset as resetCompleteDriverTripSlice } from "../../../Slice/Driver/CompleteDriverTripSlice";
import StartTrip from "./StartTrip";
import TakeAnotherStartTrip from "./TakeAnotherStartTrip";
import ExitDriverModal from "./ExitDriverModal";
import { WaitingTimeFun } from "../../../Config/GoogleLocationAPi";
// import * as Network from "expo-network";

const ExitDriverTrip = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = Network.addNetworkChangeListener(() => {
  //     checkNetwork();
  //   });

  //   const checkNetwork = async () => {
  //     const networkState = await Network.getNetworkStateAsync();

  //     console.log({ networkState });
  //     // setIsConnected(networkState.isConnected);
  //     // setIsModalVisible(!networkState.isConnected);
  //   };

  //   checkNetwork();

  //   return () => {
  //     unsubscribe.remove();
  //   };
  // }, []);

  const [isConnected, setIsConnected] = useState(false);

  const [cancle_Ride_Finally, setCancle_Ride_Finally] = useState(false);

  const { holdriderdata } = useSelector((state) => state.HoldTripDataSlice);
  const { ExittripData, IsError, IsSucess, message, IsLoading } = useSelector(
    (state) => state.ExitTripSlice
  );

  const { user, data, isError, isSuccess, isLoading } = useSelector(
    (state) => state.LoginSlice
  );
  console.log({ log: data?.user.id });

  // console.log(holdriderdata.driverdetails);
  const { CompleteDriverTripData } = useSelector(
    (state) => state.CompleteDriverTripSlice
  );

  const { First_Trip_start_time, First_Trip_Location } = useSelector(
    (state) => state.FristTripSlice
  );

  const {
    startTripdata,
    maplocationdata,
    currentLocationData,
    startTimecurrentLocationData,
    LastDestinationLocationData,
    EndTimeLastDestinationLocationData,
    completedTripdata,
    pickUpAddressData,
    destAddressData,
    Google_Distance_Matrix_API,
  } = useSelector((state) => state.StartTripSlice);

  console.log({ googlemetix: completedTripdata.googlemetix });
  const { getuserDATA } = useSelector((state) => state.GetUserConfigSlice);

  let basefare = getuserDATA?.config.basefare;
  const call = () => {};

  let date_start = moment(First_Trip_start_time);
  let date_End = moment(completedTripdata.date_End);
  let The_year_start = date_start.year();
  let The_day_start = date_start.format("dddd");
  let The_time_start = date_start.format("HH:mm:ss");
  let The_year_end = date_End.year();
  let The_day_end = date_End.format("dddd");
  let The_time_end = date_End.format("HH:mm:ss");

  let startDate = `${The_year_start} / ${The_day_start} / ${The_time_start} `;
  let EndDate = `${The_year_end} / ${The_day_end} / ${The_time_end} `;

  const [ExitTripIsloading, setExitTripIsloading] = useState(false);
  let finalaTotalCost = parseFloat(basefare) + completedTripdata.tripAmt;

  console.log({ Google_Distance_Matrix_API });
  let google_final_cost = "2 m";
  // Google_Distance_Matrix_API?.rows[0].elements[0].distance.text;

  let cal_google_final_cost = parseInt(google_final_cost.replace(/[^\d]/g, ""));
  console.log(cal_google_final_cost);

  let finalaTotalCostGoogle = parseFloat(basefare) + cal_google_final_cost;

  console.log({ finalaTotalCostGoogle });

  let data22 = {
    srcLat: completedTripdata.srcLat,
    srcLong: completedTripdata.srcLong,
    destLat: completedTripdata.destLat,
    destLong: completedTripdata.destLong,
    trip_start_time: completedTripdata.trip_start_time,
    tripAmt: finalaTotalCost,
    driverId: data?.user.id,
    pickUpAddress: pickUpAddressData,
    destAddress: destAddressData,
    // tripPoints: JSON.stringify(tripdetails.waypoints),
    tripPoints: completedTripdata.tripPoints,
    tripEndTime: completedTripdata.date_End,
    travelTime: completedTripdata.travelTime,
    tripDist: completedTripdata.Distant_Covered,
  };

  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [cost_W, setCost_W] = useState(10);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setTimeSpent((new Date() - startTime) / 1000 / 60);

      setTimeSpent(Math.floor((new Date() - startTime) / 1000 / 60));
      setCost_W(timeSpent * cost_W);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log(`Time spent on : ${timeSpent} seconds`);
    };
  }, [startTime, timeSpent]);

  const onopentoexit = () => {
    setExitTripIsloading(true);
    let maindata = {
      srcLat: completedTripdata.srcLat,
      srcLong: completedTripdata.srcLong,
      destLat: completedTripdata.destLat,
      destLong: completedTripdata.destLong,
      trip_start_time: completedTripdata.trip_start_time,
      tripAmt: finalaTotalCost,
      driverId: data?.user.id,
      pickUpAddress: pickUpAddressData,
      destAddress: destAddressData,
      // tripPoints: JSON.stringify(tripdetails.waypoints),
      tripPoints: completedTripdata.tripPoints,
      tripEndTime: completedTripdata.date_End,
      travelTime: completedTripdata.travelTime,
      tripDist: completedTripdata.Distant_Covered,

      WaitedTime: "this is the time they waite",
      Cost_of_waiting: "this iw the waiting period",
    };

    dispatch(CompleteDriverTripFunc(maindata));

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
          type: "Trip-completed",
          data: maindata,
        },
        title: "Trip-completed",
        body: "This trip has been completed..  ",
      }),
    });

    setTimeout(() => {
      setExitTripIsloading(false);
    }, 1000);

    setCancle_Ride_Finally(false);
  };

  return (
    <>
      <TakeAnotherStartTrip />

      {CompleteDriverTripData?.success == true && <ExitDriverModal />}

      {cancle_Ride_Finally && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={cancle_Ride_Finally}
          >
            <View
              className=" mt-16  rounded-2xl"
              style={{
                backgroundColor: "#fff",
                width: "88%",
                height: 300,
                padding: 15,
                paddingTop: 5,
                marginRight: 0,
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/request.png")}
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 15,
                }}
              />

              <Text
                style={{
                  color: "#000",
                  fontSize: 18,
                  // fontFamily: "Roboto-Bold",
                  textAlign: "center",
                }}
              >
                Trip Exit
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  // fontFamily: "Roboto-Regular",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Do you really want to exit trip with this rider ?
              </Text>

              <View
                style={{
                  padding: 10,
                  alignSelf: "center",
                  marginTop: 5,
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={onopentoexit}
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#005091",
                    backgroundColor: "#005091",
                    marginTop: 2,
                    borderRadius: 5,
                  }}
                >
                  {!ExitTripIsloading && (
                    <Text
                      style={{
                        color: "#fff",
                        alignSelf: "center",
                        fontSize: 13,
                        padding: 12,
                        marginRight: 5,
                        // fontFamily: "Roboto-Regular",
                      }}
                    >
                      Yes
                    </Text>
                  )}

                  {ExitTripIsloading && (
                    <ActivityIndicator color="#fff" size="small" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.setState({ showDialogforExit: false });
                  // }}

                  onPress={() => setCancle_Ride_Finally(false)}
                  style={{
                    width: "100%",
                    backgroundColor: "#a31225",
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      alignSelf: "center",
                      fontSize: 13,
                      padding: 12,
                      marginRight: 5,
                      // fontFamily: "Roboto-Regular",
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>

              {/* this is bad */}
            </View>
          </Modal>
        </View>
      )}

      <View style={{ padding: 10 }}>
        <View style={{ marginTop: 0, borderRadius: 5 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#fff", padding: 10, marginTop: 3 }}
          >
            <Text
              onPress={call}
              style={{ alignSelf: "center", color: "black", fontSize: 18 }}
            >
              Trip Summary
            </Text>
          </TouchableOpacity>

          <View style={{ backgroundColor: "#fff" }} className="items-center">
            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
              <Text style={styles.details}>
                Start Time: <Text style={styles.time}>{startDate}</Text>
              </Text>
            </Card>

            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
              <Text style={styles.details}>
                End Time: <Text style={styles.time}>{EndDate}</Text>
              </Text>
            </Card>
            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
              <Text style={styles.details}>
                Distant Covered:
                <Text style={styles.time}>
                  {/* this.props.drivertrip.distance_covered Meters */}
                  {completedTripdata.Distant_Covered}
                </Text>
              </Text>
            </Card>

            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
              <Text style={styles.details} className="text-200-red">
                Google Distance: {google_final_cost}
                <Text style={styles.time} className="pl-10 border-2"></Text>
              </Text>
            </Card>

            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
              <Text style={styles.details}>
                Cost of Trip (NGN):{" "}
                <Text style={styles.time}>
                  {parseFloat(basefare) + completedTripdata.tripAmt}
                </Text>
              </Text>
            </Card>

            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
              <Text style={styles.details} className="text-200-red">
                Google Amount: {finalaTotalCostGoogle} naria
                <Text style={styles.time} className="pl-10 border-2"></Text>
              </Text>
            </Card>

            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
              <Text style={styles.details}>
                Waited Time :
                <Text style={styles.time}>
                  {/* this.toHHMMSS(this.props.drivertrip.waitingTime) */}
                  {timeSpent}min
                </Text>
              </Text>
            </Card>
            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
              <Text style={styles.details} className="text-200-red">
                Cost of Waiting (NGN):
                <Text style={styles.time} className="pl-10 border-2">
                  {/* this.props.drivertrip.totalwaitingcost .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,") */}
                  {cost_W}
                </Text>
              </Text>
            </Card>

            <TouchableOpacity
              // onPress={onopentoexit}
              onPress={() => setCancle_Ride_Finally(true)}
              style={{
                backgroundColor: "#a31225",
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
                marginBottom: 40,
              }}
              className="w-[70%]"
            >
              {/* {this.props.data.isFetching == false && ( */}

              {!ExitTripIsloading && (
                <Text
                  style={{
                    alignSelf: "center",
                    color: "#fff",
                    fontSize: 14,
                    // fontFamily: "Roboto-Regular",
                  }}
                >
                  Exit Trip with Rider
                </Text>
              )}

              {ExitTripIsloading && (
                <ActivityIndicator color="#fff" size="small" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
    // }
  );
};

export default ExitDriverTrip;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  header: {
    backgroundColor: "#005091",
    alignSelf: "center",
    width: "100%",
    padding: 14,
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  actionbtn: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 18,
    // fontFamily: "Roboto-Regular",
  },
  viewcard: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
  },
  cardview: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "#fff",
    width: "90%",
    // fontFamily: "Roboto-Regular",
  },
  details: {
    padding: 10,
    fontSize: 14,
    // fontFamily: "Roboto-Regular",
  },
  time: {
    color: "#877A80",
    fontSize: 13,
  },
});
