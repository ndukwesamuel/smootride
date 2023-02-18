import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableHighlight,
  Alert,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GetTrips } from "../../Slice/auth/Getrider";
import PTRView from "react-native-pull-to-refresh";
// import moment from "moment";

const RiderTrips = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const trial = async () => {
      setLoading(true);
      await dispatch(GetTrips());
      setLoading(false);
    };
    trial();
  }, []);

  const onRefresh = async () => {
    setLoader(true);
    await dispatch(GetTrips());
    setLoader(false);
  };

  const trips = useSelector((state) => state?.GetRiderSlice?.trips);
  const tripslength = trips?.length;
  // console.log("trips length tips ", trips[0])

  return (
    // <PTRView onRefresh={onRefresh} style={{paddingTop: Platform.OS === 'ios'? 30: 0}}>
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating={true} color="black" />
        </View>
      ) : (
        <>
          {tripslength === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 20 }}>No trips available</Text>
            </View>
          ) : (
            // <PTRView onRefresh={onRefresh}>
            <FlatList
              data={trips}
              refreshControl={
                <RefreshControl refreshing={loader} onRefresh={onRefresh} />
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#005091",
                        margin: 7,
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        marginTop: 50,
                      }}
                    >
                      <View style={{ backgroundColor: "#005091", padding: 7 }}>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ width: "50%" }}>
                            <Text
                              style={{
                                color: "#fff",
                                alignSelf: "flex-start",
                                fontSize: 12,
                              }}
                            >
                              {" "}
                              {item?.name}
                            </Text>
                            {/* <Text
                              style={{
                                color: "#fff",
                                alignSelf: "flex-start",
                                fontSize: 12,
                              }}
                            >
                              {" "}
                              Travel Time:{" "}
                              {new Date(item?.travelTime * 1000)
                                .toISOString()
                                .slice(11, 19)}
                            </Text> */}
                            <Text
                              style={{
                                color: "#fff",
                                alignSelf: "flex-start",
                                fontSize: 12,
                              }}
                            >
                              {" "}
                              Trip Start Time:{" "}
                              {new Date(item?.trip_start_time)
                                .toLocaleTimeString()}
                            </Text>
                          </View>

                          <View style={{ width: "50%" }}>
                            <Text
                              style={{
                                alignSelf: "flex-end",
                                color: "#fff",
                                fontSize: 12,
                              }}
                            >
                              NGN {parseFloat(item?.tripAmt).toFixed(2)}
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
                                //  onPress = {()=>this.savedetails(d)}
                                onPress={() => {
                                  navigation.navigate("RiderPaths", {
                                    tripPoints: item?.tripPoints,
                                    pickupPoint: item?.pickUpAddress,
                                    destPoint: item?.destAddress,
                                  });
                                }}
                                style={{
                                  borderRadius: 2,
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
                      </View>
                      <View
                        style={{
                          borderBottomColor: "#005091",
                          borderBottomWidth: 1,
                          marginBottom: 7,
                        }}
                      >
                        <View style={styles.info}>
                          <Text style={{ marginTop: 1, color: "#877A80" }}>
                            {" "}
                            <Ionicons
                              name="md-pin"
                              size={15}
                              style={{ color: "green", marginTop: 10 }}
                            />{" "}
                            {item?.pickUpAddress}
                          </Text>
                        </View>
                      </View>
                      <View style={{ marginBottom: 7 }}>
                        <View style={styles.info}>
                          <Text style={{ marginTop: 1, color: "#877A80" }}>
                            {" "}
                            <Ionicons
                              name="md-pin"
                              size={15}
                              style={{ color: "red", marginTop: 10 }}
                            />{" "}
                            {item?.destAddress}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                );
              }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: "10%",
  },
  info: {
    width: "100%",
    padding: 10,
  },
  endarrow: {
    width: "5%",
  },
  body: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 2,
    paddingTop: 5,
  },
  header: {
    alignSelf: "center",
    width: "100%",
    padding: 14,
  },
  cardview: {
    padding: 10,
    marginTop: 10,
    position: "absolute",
    top: 0,
    backgroundColor: "transparent",
    width: "100%",
  },
  cardview2: {
    padding: 10,
    marginTop: 10,
    position: "absolute",
    bottom: 5,
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

export default RiderTrips;
