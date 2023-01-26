import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Card } from "react-native-shadow-cards";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ExitTripFunc } from "../../../Slice/Driver/ExitTripSlice";

const ExitDriverTrip = () => {
  const dispatch = useDispatch();

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

  console.log(completedTripdata);

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

  const onopentoexit = () => {
    console.log("Working");

    let data = {
      destLat: 6.5491775,
      destLong: 3.3661442,
      srcLat: 6.5450711,
      srcLong: 3.3664705,
      tripAmt: "513.17",
      trip_start_time: "2023-01-25T15:42:51.723Z",
    };

    dispatch(ExitTripFunc(data));
  };
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

            {/* )} */}
            {/* {this.props.data.isFetching == true && ( */}

            {ExitTripIsloading && (
              <ActivityIndicator color="#fff" size="small" />
            )}
            {/* )} */}
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
