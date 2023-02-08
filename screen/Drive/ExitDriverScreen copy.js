import {
  ActivityIndicator,
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
} from "../../Slice/Driver/ExitTripSlice";
import { resetholdriderdata } from "../../Slice/Driver/HoldTripDataSlice";

import { reset as AcceptReset } from "../../Slice/Driver/DriverAcceptTripSlice";
import {
  CompleteDriverTripFunc,
  reset as CompleteDriverReset,
} from "../../Slice/Driver/CompleteDriverTripSlice";
import { resetALLStartTrip } from "../../Slice/Driver/StartTripSlice";
import { useNavigation } from "@react-navigation/native";

const ExitDriverScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const { holdriderdata } = useSelector((state) => state.HoldTripDataSlice);
  const { ExittripData, IsError, IsSucess, message, IsLoading } = useSelector(
    (state) => state.ExitTripSlice
  );

  const { CompleteDriverTripData } = useSelector(
    (state) => state.CompleteDriverTripSlice
  );

  console.log({ trip: CompleteDriverTripData });

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

  // console.log({ name: completedTripdata });
  // console.log({ name2: CompleteDriverTripData });

  const onopentoexit = () => {
    dispatch(
      ExitTripFunc({
        rider_id: holdriderdata?.data.id,
      })
    );
  };

  console.log({ trip: "CompleteDriverTripData" });

  if (ExittripData) {
    console.log("table3");
    dispatch(CompleteDriverReset());
    dispatch(AcceptReset());
    dispatch(ExitReset());
    dispatch(resetholdriderdata());
    dispatch(resetALLStartTrip());

    navigation.navigate("DriverTabNavigation", {
      screen: "Driver",
    });
  }

  return (
    <>
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
                Distant Covered:
                <Text style={styles.time}>
                  this.props.drivertrip.distance_covered Meters
                </Text>
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
                Cost of Trip (NGN):{" "}
                <Text style={styles.time}>{completedTripdata?.tripAmt}</Text>
              </Text>
            </Card>
            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
              <Text style={styles.details}>
                Waited Time:
                <Text style={styles.time}>
                  this.toHHMMSS(this.props.drivertrip.waitingTime)
                </Text>
              </Text>
            </Card>
            <Card
              style={{ marginTop: 20, padding: 7, backgroundColor: "#fff" }}
            >
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
    </>
  );
};

export default ExitDriverScreen;

const styles = StyleSheet.create({});
