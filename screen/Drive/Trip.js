import {
  ActivityIndicator,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PTRView from "react-native-pull-to-refresh";
import Timeline from "react-native-timeline-flatlist";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDriverTrips } from "../../Slice/Driver/GetAllDriverTripsSlice";
import DriversTripcomponent from "../../components/Driver/DriverAllTrip/DriversTripcomponent";

const { width, height } = Dimensions.get("window");
const status_bar_height = Platform.OS == "ios" ? 20 : 0;
// this is a fake data set

const data = [
  { time: "09:00", title: "Event 1", description: "Event 1 Description" },
  { time: "10:45", title: "Event 2", description: "Event 2 Description" },
  { time: "12:00", title: "Event 3", description: "Event 3 Description" },
];
const Trip = () => {
  const { drivertrip, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.GetAllDriverTripsSlice
  );

  const dispatch = useDispatch();

  const getdrivertrip = () => {
    dispatch(GetAllDriverTrips());
  };

  const [buttonText, setButtonText] = useState("Press me");

  useEffect(() => {
    getdrivertrip();
    return () => {};
  }, []);

  const refresh = () => {
    getdrivertrip();
  };
  return (
    <PTRView onRefresh={refresh}>
      <View style={styles.container}>
        <View style={styles.header} className="pt-10">
          <Text onPress={getdrivertrip} style={styles.headerText}>
            All Trips
          </Text>
        </View>

        <View className="flex-1">
          {drivertrip && <DriversTripcomponent driverTripData={drivertrip} />}
        </View>
        {isLoading && <ActivityIndicator color="#007cc2" size="large" />}
      </View>
    </PTRView>
  );
};

export default Trip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: "10%",
  },
  body: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 5,
  },
  header: {
    backgroundColor: "#005091",
    alignSelf: "center",
    width: "100%",
    padding: 14,
  },
  headerText: {
    fontSize: 20,
    alignSelf: "center",
    color: "#fff",
    marginTop: status_bar_height,
  },
  cardview2: {
    padding: 10,
    position: "absolute",
    bottom: 5,
    zIndex: 6,
    width: "100%",
  },
  cardview: {
    padding: 10,
    position: "absolute",
    top: 10,
    zIndex: 6,
    width: "100%",
  },
  details: {
    padding: 10,
    fontSize: 14,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    fontWeight: "900",
    // fontFamily: "Roboto-Regular"
  },
  time: {
    color: "#877A80",
    fontSize: 13,
  },
});
