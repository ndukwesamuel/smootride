import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-shadow-cards";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import React, { useEffect, useState } from "react";
import { ProgressDialog } from "react-native-simple-dialogs";
import PTRView from "react-native-pull-to-refresh";
// import CardView from "react-native-cardview";
// import CardView from "react-native-cardview";
import { useDispatch, useSelector } from "react-redux";
import ChangeDriveStatus from "../../components/Driver/ChangeDriveStatus";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  GetLastAssignTrip,
  reset,
} from "../../Slice/Driver/GetLastAssignTripSlice";
import NetInfo from "@react-native-community/netinfo";

import { RejectTrip } from "../../Slice/Driver/RejectTripSlice";
import {
  AcceptTripFun,
  reset as AcceptReset,
} from "../../Slice/Driver/DriverAcceptTripSlice";

import DriverMap from "../../components/Driver/DriverTrip/DriverMap";
import StartTrip from "../../components/Driver/DriverTrip/StartTrip";
import EndTripButtton from "../../components/Driver/DriverTrip/EndTripButtton";
import ExitDriverTrip from "../../components/Driver/DriverTrip/ExitDriverTrip";
import { ExitTripFunc } from "../../Slice/Driver/ExitTripSlice";
import {
  ActivateStartTrip,
  PickUpAddressFun,
  resetALLStartTrip,
} from "../../Slice/Driver/StartTripSlice";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import TakeAnotherStartTrip from "../../components/Driver/DriverTrip/TakeAnotherStartTrip";
import TakeAnotherDriverMap from "../../components/Driver/DriverTrip/TakeAnotherDriverMap";
import {
  GetAddress_OF_Location,
  Get_Location_Way_Point,
} from "../../Config/GoogleLocationAPi";
import { NotificationDataModalFunC } from "../../Slice/auth/UpdateuserexpotokenSlice";

let driverIcon = require("../../assets/images/profile.jpg");
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.006339428281933124;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let mapheight = (height * 4) / 5;
let maplow = (height * 1) / 5;
let maphalf = height / 2;
//let mapheight = height;

const mapviewheight = parseInt(mapheight);
const status_bar_height = Platform.OS == "ios" ? 20 : 0;
let watchID;
let permissionMsg = "";
const managestate = [
  { label: "Offline", value: "Offline" },
  { label: "Online", value: "Online" },
];
const tripissues = [
  { label: "Unavailable for Trip", value: "reassign" },
  { label: "Trip Declined by Rider", value: "decline" },
];

const Driver = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [driver_mode, setDriver_mode] = useState("Online");
  const [driverrequest, setDriverrequest] = useState(false);
  const [driver_request_Status, setDriver_request_Status] = useState(false);

  const { user, data, isError, isSuccess, isLoading } = useSelector(
    (state) => state.LoginSlice
  );

  console.log({ thengame: data?.user.pushToken });
  const { First_Trip_start_time } = useSelector(
    (state) => state.FristTripSlice
  );

  const { rejectData, isLoading: rejectisLoading } = useSelector(
    (state) => state.RejectTripSlice
  );

  const { CompleteDriverTripData } = useSelector(
    (state) => state.CompleteDriverTripSlice
  );

  console.log("Driver");

  const { startTripdata, completedTripdata, totalpointData } = useSelector(
    (state) => state.StartTripSlice
  );

  const { ExittripData } = useSelector((state) => state.ExitTripSlice);

  const { riderdata } = useSelector((state) => state.GetLastAssignTripSlice);

  // console.log({ riderdata });

  const { drivestatus } = useSelector((state) => state.UpdateDriverStatusSlice);

  const { IsError, AcceptTrip, IsSucess, message, IsLoading } = useSelector(
    (state) => state.DriverAcceptTripSlice
  );

  const { maplocationdata, total_distance_covered } = useSelector(
    (state) => state.StartTripSlice
  );
  const { holdriderdata } = useSelector((state) => state.HoldTripDataSlice);

  // const holdriderdat = useSelector((state) => state);

  // console.log({ holdriderdat });

  const toggleDialog_toChange_status = () => {
    setDriver_request_Status(true);
  };

  const refresh = () => {
    dispatch(
      GetLastAssignTrip({
        user_id: 1,
      })
    );
  };

  useEffect(() => {
    dispatch(
      GetLastAssignTrip({
        user_id: 1,
      })
    );
    setReload(false);
    return () => {
      // dispatch(reset());
    };
  }, [reload]);

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

  const rejectTrip = (tripID, TripReason) => {
    let data = {
      reason: TripReason, // the two expected values are "reassign or decline"
      trip_id: tripID,
    };
    dispatch(RejectTrip(data));
    setReload(true);
  };

  const acceptTrip = (tripdata) => {
    let dataID = tripdata.id;
    dispatch(AcceptTripFun({ trip_id: dataID }));
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#005091" />
      <PTRView onRefresh={refresh}>
        <View classname="flex-1 bg-red-600 ">
          <ScrollView keyboardShouldPersistTaps="always">
            <ProgressDialog
              // visible={this.state.isSavingAvailability}
              // visible={true}
              title="Updating Driver Availability"
              message="Please, wait..."
            />

            <View style={styles.header}>
              <Text style={styles.headerText} className="">
                Trip Request <Text style={{ fontSize: 12 }}>{driver_mode}</Text>
              </Text>
              <Text
                onPress={toggleDialog_toChange_status}
                style={{
                  fontSize: 12,
                  alignSelf: "flex-end",
                  borderRadius: 5,
                  color: "#fff",
                  backgroundColor: "#a31225",
                  padding: 3,
                }}
              >
                Status
              </Text>
            </View>
            <ChangeDriveStatus
              data1={driver_request_Status}
              data2={setDriver_request_Status}
            />

            <Modal
              visible={modalVisible}
              // isVisible={this.state.getlocationmodal}
            >
              <KeyboardAvoidingView>
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: width,
                    marginRight: 0,
                    alignSelf: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 18,
                      // fontFamily: "Roboto-Bold",
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    We observed your trip Map did not load on Time
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
                    Enter the address where you started trip
                  </Text>

                  <View
                    style={{
                      padding: 10,
                      alignSelf: "center",
                      marginTop: 5,
                      width: "100%",
                    }}
                  >
                    {/* <CardView
                      cardElevation={2}
                      cardMaxElevation={2}
                      cornerRadius={5}
                      style={styles.cardview}
                    >
                      <TextInput
                        // onChangeText={(text) => this.getaddressSpecified(text)}
                        style={{ width: "100%", height: 40, borderColor: "gray" }}
                        placeholder="Enter the pickup address"
                      />
                    </CardView> */}
                    {/*
  {
                                      this.state.gettingInputLocation == true &&
                                      <ActivityIndicator size="large" color="#005091"/>
                                  }  */}

                    <View
                      style={{ marginTop: 10 }}
                      showsVerticalScrollIndicator={false}
                    >
                      {/* {this.state.locationFromGoogle.length > 0 && (
                        <Text
                          style={{
                            textAlign: "center",
                            marginBottom: 20,
                            fontWeight: "bold",
                          }}
                        >
                          Select the Start Location below;
                        </Text>
                      )}
                      {this.state.locationFromGoogle.map((location) => (
                        <TouchableOpacity
                          value={location.description}
                          key={location.description}
                          onPress={() =>
                            this.isDriverSureDestLocation(location.description)
                          }
                          style={{
                            height: 40,
                            width: "100%",
                            borderWidth: 1,
                            borderColor: "#c1c1c1",
                            marginTop: 4,
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{ alignSelf: "flex-start", marginStart: 5 }}
                          >
                            {location.description}
                          </Text>
                        </TouchableOpacity>
                      ))} */}
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>

            <Modal
              // isVisible={this.state.decline}
              visible={modalVisible}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  width: "98%",
                  height: 300,
                  padding: 15,
                  paddingTop: 5,
                  marginRight: 0,
                  alignSelf: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/request.png")}
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: "center",
                    marginTop: 10,
                    marginBottom: 15,
                  }}
                />
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    fontFamily: "Roboto-Bold",
                    textAlign: "center",
                  }}
                >
                  Trip Option
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    fontFamily: "Roboto-Bold",
                    textAlign: "center",
                  }}
                ></Text>

                {/* {
                            Platform.OS == 'ios' && this.props.drivertrip.isFirstTrip == true &&
                              <View style={{borderWidth:1,borderColor:'#c1c1c1',width:'94%',alignSelf:'center',borderRadius:5,marginBottom:5}}>
                              <RadioForm
                              radio_props={tripissues}
                              initial={-1}
                              labelStyle={{marginRight: '20%'}}
                              buttonColor={'#005091'}
                              buttonInnerColor={'#005091'}
                              buttonSize={10}
                              animation={true}
                              onPress={(value) => {this.setState({reasonfordecline:value})}}
                            />
                            </View>
                          } */}

                {/* {
                              this.props.drivertrip.isFirstTrip == true && Platform.OS == 'android' &&
                              <View style={{borderWidth:1,borderColor:'#c1c1c1',width:'94%',alignSelf:'center',borderRadius:5,marginBottom:5}}>
                              <Picker
                                  selectedValue={this.state.reasonfordecline}
                                  style={{height: 40, width: '100%',borderWidth:1,borderColor:'#005091'}}
                                  onValueChange={(itemValue, itemIndex) =>
                                      this.setState({reasonfordecline: itemValue})
                                  }>
                                  <Picker.Item label="Select Reason" value="" />
                                  <Picker.Item label="Unavailable for Trip" value="reassign" />
                                  <Picker.Item label="Client Decline Trip" value="decline" />
                              </Picker>
                              </View>
                          } */}

                <View
                  style={{
                    padding: 10,
                    alignSelf: "center",
                    marginTop: 5,
                    width: "100%",
                  }}
                >
                  {/* {
                                  this.state.isrequesting == false &&
                                  <TouchableOpacity onPress = {this.declinenow} style={{width:'100%',backgroundColor:'#fff',borderWidth:1,borderColor:'#005091',backgroundColor:'#005091',marginTop:2,borderRadius:5}}>
                                    <Text style={{color:'#fff',alignSelf:'center',fontSize:13,padding:12,marginRight:5,fontFamily:'Roboto-Regular'}}>Yes</Text>
                                  </TouchableOpacity>
                              } */}

                  {/* {
                                  this.state.isrequesting == true &&
                                  <TouchableOpacity>
                                      <ActivityIndicator size="small" color="#005091"/>
                                  </TouchableOpacity>
                              } */}

                  <TouchableOpacity
                    // onPress={this.dismissdeclinemodal}
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
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              // isVisible={this.state.showDialogforExit}

              visible={modalVisible}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  width: "98%",
                  height: 300,
                  padding: 15,
                  paddingTop: 5,
                  marginRight: 0,
                  alignSelf: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/request.png")}
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: "center",
                    marginTop: 40,
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
                    // onPress={this.exitthistrip}
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
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={() => {
                    //   this.setState({ showDialogforExit: false });
                    // }}
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
              </View>
            </Modal>

            <Modal
              visible={modalVisible}

              // isVisible={this.state.driverrequest}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  width: "98%",
                  height: 380,
                  padding: 15,
                  paddingTop: 5,
                  marginRight: 0,
                  alignSelf: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/request.png")}
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: "center",
                    marginTop: 40,
                    marginBottom: 15,
                  }}
                />
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    // fontFamily: "Roboto-Bold",
                    textAlign: "center",
                  }}
                >
                  Make Request
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
                  Request to Change State
                </Text>
                {/* {Platform.OS == "ios" && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#c1c1c1",
                      width: "94%",
                      alignSelf: "center",
                      borderRadius: 5,
                      marginBottom: 5,
                    }}
                  >
                    <RadioForm
                      radio_props={managestate}
                      initial={-1}
                      formHorizontal={true}
                      labelStyle={{ marginRight: "20%" }}
                      buttonColor={"#005091"}
                      buttonInnerColor={"#005091"}
                      buttonSize={10}
                      animation={true}
                      onPress={(value) => {
                        this.setState({ request: value });
                      }}
                    />
                  </View>
                )}

                {Platform.OS == "android" && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#c1c1c1",
                      width: "94%",
                      alignSelf: "center",
                      borderRadius: 5,
                      marginBottom: 5,
                    }}
                  >
                    <Picker
                      selectedValue={this.state.request}
                      style={{
                        height: 40,
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "#005091",
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ request: itemValue })
                      }
                    >
                      <Picker.Item label="Select State" value="" />
                      <Picker.Item label="Offline" value="Offline" />
                      <Picker.Item label="Online" value="Online" />
                    </Picker>
                  </View>
                )} */}

                <TextInput
                  style={{
                    height: 40,
                    paddingStart: 10,
                    borderColor: "#c1c1c1",
                    borderWidth: 1,
                    borderRadius: 5,
                    width: "94%",
                    alignSelf: "center",
                  }}
                  // onChangeText={(text) => this.setState({ reason: text })}
                  placeholder="State your reason"
                  // value={this.state.reason}
                />
                <View
                  style={{
                    padding: 10,
                    alignSelf: "center",
                    marginTop: 5,
                    width: "100%",
                  }}
                >
                  {/* {this.state.isrequesting == false && (
                    <TouchableOpacity
                      onPress={this.sendrequest}
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
                      <Text
                        style={{
                          color: "#fff",
                          alignSelf: "center",
                          fontSize: 13,
                          padding: 12,
                          marginRight: 5,
                          fontFamily: "Roboto-Regular",
                        }}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  )} */}
                  {/*
                  {this.state.isrequesting == true && (
                    <TouchableOpacity>
                      <ActivityIndicator size="small" color="#005091" />
                    </TouchableOpacity>
                  )} */}
                  <TouchableOpacity
                    // onPress={this.dismissmodal}
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
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* {AcceptTrip?.success == true && riderdata?.data && ( */}
            {AcceptTrip?.success == true && (
              <View>
                {!startTripdata && !completedTripdata && <StartTrip />}

                {startTripdata && !completedTripdata && <DriverMap />}

                {/* {!startTripdata && completedTripdata && <ExitDriverTrip />} */}
              </View>
            )}

            {completedTripdata && !startTripdata && (
              <View>
                <ExitDriverTrip />
              </View>
            )}

            {completedTripdata && startTripdata && (
              <View>
                <TakeAnotherDriverMap />
              </View>
            )}

            <View>
              {/* {
               (Object.keys(this.props.drivertrip.position).length > 0 || Object.keys(this.state.initialLocation).length > 0) &&
               <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{height:this.props.rider.rider_id == '' ? mapviewheight : maphalf}}
                showUserLocation
                followUserLocation
                loadingEnabled
                region={this.getMapRegion()}
                >
                <Polyline coordinates={this.props.drivertrip.routeCoordinates} strokeWidth={2} />
                <Marker.Animated
                    ref={marker => {
                    this.marker = marker;
                    }}
                    coordinate={this.state.coordinate}
                />
                </MapView>
           } */}
              {/* this component is for driver moving  */}

              {riderdata == null && !completedTripdata && (
                <Card style={{ padding: 10, margin: 10 }}>
                  <ActivityIndicator size="large" color="#005091" />
                </Card>
              )}

              {riderdata && !completedTripdata && (
                <View className="items-center">
                  {riderdata.data == null && (
                    <Card style={{ padding: 10, margin: 10 }}>
                      <View style={{ padding: 10 }}>
                        <Text
                          style={{
                            color: "#877A80",
                            alignSelf: "center",
                            fontSize: 16,
                          }}
                        >
                          No Ride Request Assigned Yet
                        </Text>
                      </View>
                    </Card>
                  )}
                </View>
              )}

              {/* {dataforDriverRequest.drivertrip.isReady == false &&
                dataforDriverRequest.drivertrip.isStarted == true && (
                  <View style={{ textAlign: "center" }}>
                    <Text style={{ color: "#877A80", alignSelf: "center" }}>
                      Please wait...
                    </Text>
                    <ActivityIndicator color="#007cc2" size="large" />
                  </View>
                )} */}

              <View>
                {/* {dataforDriverRequest.isFetching == true && (
                  <ActivityIndicator color="#007cc2" size="large" />
                )} */}

                {/* {dataforDriverRequest.drivertrip.isStarted == false &&
                  dataforDriverRequest.rider.rider_id !== "" &&
                  dataforDriverRequest.rider.accept == true && (
                    <View style={{ padding: 10, marginBottom: 50 }}>
                      <Card style={{ padding: 10, margin: 10 }}>
                        <View>
                          <View style={{ padding: 10, marginBottom: 5 }}>
                            <Text
                              style={{
                                alignSelf: "center",
                                marginTop: 5,
                                fontSize: 15,
                                color: "#007cc2",
                              }}
                            >
                              Hi, {data?.user?.name}
                            </Text>
                            <Text
                              style={{
                                alignSelf: "center",
                                marginTop: 5,
                                fontSize: 15,
                                color: "#877A80",
                              }}
                            >
                              You have a trip to Complete.
                            </Text>
                          </View>

                          <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "22%", marginStart: 10 }}>
                              {dataforDriverRequest.rider.rider_image !=
                                null && (
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

                              {dataforDriverRequest.rider.rider_image ==
                                null && (
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
                                {dataforDriverRequest.rider_name}
                              </Text>

                              {dataforDriverRequest.rider.company_name ==
                                null && (
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
                              {dataforDriverRequest.rider.company_name !=
                                null && (
                                <Text
                                  style={{
                                    fontSize: 13,
                                    fontWeight: "800",
                                    color: "#007cc2",
                                    // fontFamily: "Roboto-Regular",
                                  }}
                                >
                                  {dataforDriverRequest.rider.company_name}
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
                                  style={{
                                    flexDirection: "row",
                                    marginTop: 10,
                                  }}
                                >
                                  <View style={{ width: "50%" }}>
                                    {dataforDriverRequest.isFetching ==
                                      true && (
                                      <ActivityIndicator
                                        color="#007cc2"
                                        size="large"
                                      />
                                    )}

                                    {dataforDriverRequest.drivertrip
                                      .isStarted == false &&
                                      dataforDriverRequest.drivertrip
                                        .isFirstTrip == true && (
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
                                      )}
                                  </View>

                                  <View style={{ width: "50%" }}>
                                    {dataforDriverRequest.isFetching ==
                                      true && (
                                      <ActivityIndicator
                                        color="#007cc2"
                                        size="large"
                                      />
                                    )}

                                    {dataforDriverRequest.checkingInternet ==
                                      true && (
                                      <ActivityIndicator
                                        color="#007cc2"
                                        size="large"
                                      />
                                    )}

                                    {dataforDriverRequest.drivertrip
                                      .isStarted == false && (
                                      <TouchableOpacity
                                        //  onPress={this.startTrip}

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
                                    )}
                                  </View>
                                </View>

                                <View style={{ textAlign: "center" }}>
                                  {dataforDriverRequest.FetchingisTripValid ==
                                    true && (
                                    <View>
                                      <ActivityIndicator
                                        color="#005091"
                                        size="large"
                                      />
                                      <Text
                                        style={{
                                          color: "#005091",
                                          textAlign: "center",
                                        }}
                                      >
                                        Please Wait....
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
                            )}
                          </View>
                        </View>
                      </Card>
                    </View>
                  )} */}

                {/* surposet to be end */}
              </View>

              {/* This components only show when trip is available */}

              {riderdata?.config && AcceptTrip == null && (
                <View style={{ alignItems: "center" }}>
                  <Card style={styles.viewcard} classname="">
                    <View>
                      <View style={{ padding: 10 }}>
                        <Text
                          style={{
                            alignSelf: "center",
                            marginTop: 10,
                            fontSize: 15,
                            color: "#007cc2",
                          }}
                        >
                          Hi, {riderdata?.driverdetails?.name}
                        </Text>
                        <Text
                          style={{
                            alignSelf: "center",
                            marginTop: 10,
                            fontSize: 15,
                            color: "#877A80",
                          }}
                        >
                          You have a new Trip Request.
                        </Text>
                      </View>

                      <Card className=" w-full">
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ width: "22%" }}>
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

                          <View style={{ width: "60%" }} className="">
                            <Text
                              style={{
                                fontSize: 17,
                                marginTop: 1,
                                color: "#877A80",
                                fontWeight: "bold",
                              }}
                            >
                              {riderdata?.data.staffName}
                            </Text>
                            {riderdata?.data.company == null && (
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "200",
                                  color: "#877A80",
                                  // fontFamily: "Roboto-Regular",
                                }}
                              >
                                Unknown
                              </Text>
                            )}
                            {riderdata?.data.company != null && (
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "800",
                                  color: "#007cc2",
                                  // fontFamily: "Roboto-Regular",
                                }}
                              >
                                {riderdata?.data.company}
                              </Text>
                            )}
                          </View>

                          <View style={{ width: "18%" }}>
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
                                onPress={() => call(riderdata?.data.phone)}
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
                      </Card>
                    </View>

                    <View>
                      <View
                        style={{ flexDirection: "row" }}
                        className=" justify-between items-center"
                      >
                        <View
                          style={{ width: "30%", justifyContent: "center" }}
                        >
                          {!rejectisLoading && (
                            <TouchableOpacity
                              onPress={() =>
                                rejectTrip(riderdata.data.id, "decline")
                              }
                              style={{
                                marginTop: 7,
                                borderColor: "#a31225",
                                borderWidth: 2,
                                padding: 7,
                                width: "100%",
                                alignSelf: "center",
                                borderRadius: 5,
                              }}
                            >
                              <Text
                                style={{
                                  alignSelf: "center",
                                  color: "#a31225",
                                  fontSize: 13,
                                  // fontFamily: "Roboto-Regular",
                                }}
                              >
                                Reject
                              </Text>
                            </TouchableOpacity>
                          )}

                          {rejectisLoading && (
                            <TouchableOpacity
                              style={{
                                marginTop: 7,
                                backgroundColor: "#a31225",
                                padding: 7,
                                width: "100%",
                                alignSelf: "center",
                              }}
                            >
                              <ActivityIndicator color="#fff" size="small" />
                            </TouchableOpacity>
                          )}
                        </View>

                        <View
                          style={{ width: "30%", justifyContent: "center" }}
                        >
                          {!rejectisLoading && (
                            <TouchableOpacity
                              onPress={() =>
                                rejectTrip(riderdata.data.id, "reassign")
                              }
                              style={{
                                marginTop: 7,
                                borderColor: "green",
                                borderWidth: 2,
                                padding: 7,
                                width: "100%",
                                alignSelf: "center",
                                borderRadius: 5,
                              }}
                            >
                              <Text
                                style={{
                                  alignSelf: "center",
                                  color: "green",
                                  fontSize: 13,
                                  // fontFamily: "Roboto-Regular",
                                }}
                              >
                                Reassign
                              </Text>
                            </TouchableOpacity>
                          )}

                          {rejectisLoading && (
                            <TouchableOpacity
                              style={{
                                marginTop: 7,
                                backgroundColor: "#a31225",
                                padding: 7,
                                width: "100%",
                                alignSelf: "center",
                              }}
                            >
                              <ActivityIndicator color="#fff" size="small" />
                            </TouchableOpacity>
                          )}
                        </View>

                        <View style={{ width: "30%" }}>
                          <TouchableOpacity
                            onPress={() => acceptTrip(riderdata.data)}
                            style={{
                              marginTop: 7,
                              backgroundColor: "#005091",
                              padding: 7,
                              width: "100%",
                              alignSelf: "center",
                              borderRadius: 5,
                            }}
                          >
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "#fff",
                                fontSize: 13,
                                // fontFamily: "Roboto-Regular",
                                borderRadius: 5,
                              }}
                            >
                              Accept
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Card>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </PTRView>
    </SafeAreaView>
  );
};

export default Driver;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#005091",
    alignSelf: "center",
    width: "100%",
    padding: 14,
    flexDirection: "row",
    paddingTop: 40,
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
    marginTop: status_bar_height,
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
