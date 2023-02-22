import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import uuid from "uuid-random";
import { useNavigation } from "@react-navigation/native";

const status_bar_height = Platform.OS == "ios" ? 20 : 0;
const DriversTripcomponent = ({ driverTripData }) => {
  const navigation = useNavigation();
  const startTimeAgain = (d) => {
    // console.log(d);
    // if(this.props.rider.rider_id != '') return false;
    Alert.alert(
      "Alert",
      `Do you want to continue trip with this rider (${d.name}) ?`,
      [
        { text: "Yes", onPress: () => this.createTripInstance(d) },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  const savedetails = (d) => {
    // console.log(d);
    navigation.navigate("tripmap", {
      data: d,
    });
  };

  if (driverTripData.length == 0) {
    return (
      <Text
        style={{
          marginTop: 1,
          color: "#877A80",
          alignSelf: "center",
          fontSize: 15,
        }}
      >
        No previous trip information
      </Text>
    );
  }

  // Sample array of objects with trip_start_time property

  // Map and sort the array by trip_start_time in descending order
  const mappedAndSortedArray = driverTripData
    .map((obj) => ({ ...obj })) // Create a shallow copy of each object
    .sort((a, b) => new Date(b.trip_start_time) - new Date(a.trip_start_time))
    .map((obj) => {
      const date = new Date(obj.trip_start_time);
      const newtime = date.toLocaleTimeString();
      return {
        ...obj,
        trip_start_date: date.toLocaleDateString(),
        trip_start_time: newtime,
      };
    });

  // Output the resulting array
  // console.log(mappedAndSortedArray);

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={false}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          className="mt-32"
          style={{
            backgroundColor: "#fff",
            width: "98%",
            height: 480,
            padding: 15,
            paddingTop: 5,
            marginRight: 0,
            alignSelf: "center",
          }}
        ></View>
      </Modal>
      {mappedAndSortedArray.map((d) => {
        return (
          <TouchableOpacity
            key={uuid()}
            value={uuid()}
            // onPress={() => startTimeAgain(d)}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#005091",
                margin: 7,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
              key={d.id}
              value={d.id}
            >
              <View style={{ backgroundColor: "#005091", padding: 7 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "70%" }}>
                    <Text style={{ color: "#fff" }}>{d.name}</Text>
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                      Travel Time: {d.travelTime} min
                    </Text>
                  </View>

                  <View style={{ width: "30%" }}>
                    <Text
                      style={{
                        alignSelf: "flex-end",
                        color: "#fff",
                        fontSize: 12,
                      }}
                    >
                      NGN {parseFloat(d.tripAmt).toFixed(2)}
                    </Text>
                    <View
                      style={{
                        width: "60%",
                        backgroundColor: "#007cc2",
                        alignSelf: "flex-end",
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        onPress={() => savedetails(d)}
                        style={{
                          borderRadius: 1,
                          color: "#fff",
                          padding: 2,
                          alignSelf: "center",
                        }}
                      >
                        ROUTE
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{ color: "#fff", fontSize: 12 }}>
                    Start Time:{d.trip_start_time}
                  </Text>

                  <Text style={{ color: "#fff", fontSize: 12 }}>
                    Start Date: {d.trip_start_date}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderBottomColor: "#005091",
                  borderBottomWidth: 1,
                  marginBottom: 7,
                }}
              >
                <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <Text style={{ marginTop: 1, color: "#877A80" }}>
                    <Ionicons
                      name="md-pin"
                      size={15}
                      style={{ color: "green", marginTop: 10 }}
                    />
                    {d.pickUpAddress}
                  </Text>
                </View>
              </View>

              <View style={{ marginBottom: 7 }}>
                <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <Text style={{ marginTop: 1, color: "#877A80" }}>
                    <Ionicons
                      name="md-pin"
                      size={15}
                      style={{ color: "red", marginTop: 10 }}
                    />
                    {d.destAddress}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DriversTripcomponent;

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
    fontFamily: "Roboto-Regular",
  },
  time: {
    color: "#877A80",
    fontSize: 13,
  },
});
