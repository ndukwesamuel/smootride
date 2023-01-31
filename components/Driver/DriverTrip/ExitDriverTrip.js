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
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

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
const ExitDriverTrip = () => {
  const dispatch = useDispatch();

  const { holdriderdata } = useSelector((state) => state.HoldTripDataSlice);
  const { ExittripData, IsError, IsSucess, message, IsLoading } = useSelector(
    (state) => state.ExitTripSlice
  );

  const {
    startTripdata,
    maplocationdata,
    currentLocationData,
    startTimecurrentLocationData,
    LastDestinationLocationData,
    EndTimeLastDestinationLocationData,
    completedTripdata,
  } = useSelector((state) => state.StartTripSlice);
  const call = () => {};

  let date_start = moment(startTimecurrentLocationData);
  let date_End = moment(EndTimeLastDestinationLocationData);
  let The_year_start = date_start.year();
  let The_day_start = date_start.format("dddd");
  let The_time_start = date_start.format("HH:mm:ss");
  let The_year_end = date_End.year();
  let The_day_end = date_End.format("dddd");
  let The_time_end = date_End.format("HH:mm:ss");

  let startDate = `${The_year_start} / ${The_day_start} / ${The_time_start} `;
  let EndDate = `${The_year_end} / ${The_day_end} / ${The_time_end} `;

  const [ExitTripIsloading, setExitTripIsloading] = useState(false);

  console.log({ name: completedTripdata });
  // console.log({ name1: ExittripData.success });

  const onopentoexit = () => {
    dispatch(
      ExitTripFunc({
        rider_id: holdriderdata?.data.id,
      })
    );
  };

  if (ExittripData?.success) {
    Alert.alert("Alert", `Congrat Trip Done and Exited`, [{ text: "OK" }], {
      cancelable: false,
    });

    dispatch(resetGetLastAssignTripSlice());
    dispatch(resetRejectTripSlice());
    dispatch(resetCompleteDriverTripSlice());
    dispatch(resetExitTripSlice());
    dispatch(resetGetrider());
    dispatch(resetAll_Excerpt_startTripdata());
    dispatch(resetALLStartTrip());
    dispatch(resetUpdateDriverStatusSlice());
    dispatch(resetGetAllDriverTripsSlice());
    dispatch(AcceptReset());
    dispatch(resetholdriderdata());
    dispatch(resetholdriderdata());
    dispatch(resetUpdateDriverStatusSlice());
    dispatch(resetAll_Excerpt_startTripdata());
  }
  // else {
  //   Alert.alert("Alert", `Somthing went Wrong`, [{ text: "OK" }], {
  //     cancelable: false,
  //   });
  // }
  // useEffect(() => {
  //   console.log("table3");

  // dispatch(resetGetLastAssignTripSlice());
  // dispatch(resetRejectTripSlice());
  // dispatch(resetCompleteDriverTripSlice());
  // dispatch(resetExitTripSlice());
  // dispatch(resetGetrider());
  // dispatch(resetPassowrdReset());
  // dispatch(resetAll_Excerpt_startTripdata());
  // dispatch(resetALLStartTrip());
  // dispatch(resetUpdateDriverStatusSlice());
  // dispatch(resetGetAllDriverTripsSlice());
  // dispatch(AcceptReset());
  // dispatch(resetholdriderdata());
  //   dispatch(resetholdriderdata());
  //   dispatch(resetUpdateDriverStatusSlice());
  //   dispatch(resetAll_Excerpt_startTripdata());

  // dispatch(resetGetAllDriverTripsSlice())

  //   dispatch(CompleteDriverReset());
  //   dispatch(AcceptReset());
  //   dispatch(ExitReset());
  //   dispatch(resetholdriderdata());
  //   dispatch(resetAll_Excerpt_startTripdata());

  //   return () => {};
  // }, [ExittripData]);

  // return (
  //   <View>
  //     <Card>
  //       <Text>The Trip is Completed</Text>
  //     </Card>
  //   </View>
  // );

  return (
    // {
    //     this.props.drivertrip.isEnded == true &&
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

        <View style={{ backgroundColor: "#fff" }}>
          <Card style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}>
            <Text style={styles.details}>
              Start Time: <Text style={styles.time}>{startDate}</Text>
            </Text>
          </Card>
          <Card style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}>
            <Text style={styles.details}>
              Distant Covered:
              <Text style={styles.time}>
                this.props.drivertrip.distance_covered Meters
              </Text>
            </Text>
          </Card>
          <Card style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}>
            <Text style={styles.details}>
              End Time: <Text style={styles.time}>{EndDate}</Text>
            </Text>
          </Card>
          <Card style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}>
            <Text style={styles.details}>
              Cost of Trip (NGN):{" "}
              <Text style={styles.time}>{completedTripdata.tripAmt}</Text>
            </Text>
          </Card>
          <Card style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}>
            <Text style={styles.details}>
              Waited Time:
              <Text style={styles.time}>
                this.toHHMMSS(this.props.drivertrip.waitingTime)
              </Text>
            </Text>
          </Card>
          <Card style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}>
            <Text style={styles.details}>
              Cost of Waiting (NGN):
              <Text style={styles.time}>
                this.props.drivertrip.totalwaitingcost .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              </Text>
            </Text>
          </Card>

          <TouchableOpacity
            onPress={onopentoexit}
            style={{
              backgroundColor: "#a31225",
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            {/* {this.props.data.isFetching == false && ( */}

            {!IsLoading && (
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

            {IsLoading && <ActivityIndicator color="#fff" size="small" />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // }
  );
};

export default ExitDriverTrip;

const styles = StyleSheet.create({
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
