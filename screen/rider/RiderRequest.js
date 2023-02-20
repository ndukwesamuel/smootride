import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import clientimg from "../../assets/images/profile.jpg";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Dimensions,
  Button,
  TouchableHighlight,
  Alert,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Linking,
  RefreshControl,
  Share
} from "react-native";
import smoothridelogo from "../../assets/images/smoothride.png";
// import CardView from "react-native-cardview";
import { GOOGLE_MAPS_APIKEYS } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Modal from "react-native-modal";
import requestfile from "../../assets/images/requestfile.png";
import { useDispatch, useSelector } from "react-redux";
import { GetAddress, GetRider } from "../../Slice/auth/Getrider";
import {
  AssignedDriver,
  CancelRequest,
  CloseReject,
  KnowTrip,
  LastAssignedDriver,
  RequestRide,
  TripStatus,
} from "../../Slice/auth/Requestride";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import RideRequestSuccess from "../../components/rider/RideRequestSuccess";
import CancelModalTrip from "../../components/rider/CancelModalTrip";
import PTRView from "react-native-pull-to-refresh";
import RejectRequest from "../../components/rider/RejectRequest";

const { width, height } = Dimensions.get("window");
const RiderRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const dispatch = useDispatch();
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [maplocation, setMaplocation] = useState(false);
  const [userLocation, setUerLocation] = useState(null);
  const [closedTrip, setClosedTrip] = useState(false);
  const [reboot, setReboot] = useState(false);
  const [loader, setLoader] = useState(false);
  const [driverStat, setDriverstatus] = useState(null)
  const [rejTrip, setRejTrip] = useState(false)

  const user_id = useSelector((state) => state.LoginSlice?.data?.user?.id);

  const { user, data, isError, isSuccess, isLoading } = useSelector(
    (state) => state.LoginSlice
  );

  // console.log({data});

  useEffect(() => {
    const getPermissions = async () => {
      setMaplocation(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant Location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      // console.log("location gotten ",currentLocation)
      const latitude= currentLocation?.coords.latitude;
      const longitude= currentLocation?.coords.longitude;
      await dispatch(GetAddress({latitude, longitude}))
      setMaplocation(false);
    };
    getPermissions();
  }, []);

  // useEffect(()=>{
  //   const init =async ()=>{
  //     const userdet = {
  //       "user_id": user_id
  //     }
  //   await dispatch(AssignedDriver(userdet))
  // }
  // init()
  // }, [])

  // console.log("username shown ", username)
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.006339428281933124;
  const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
  const INITIAL_POSITION = {
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
    // latitude: 6.549405360528134,
    // longitude: 3.366228245355276,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const requeststat = useSelector((state) => state.RequestRideSlice?.isRequest);

  const handleAccept = () => {
    setAccepted(false);
  };

  const cancelRequest = async () => {
    await dispatch(CancelRequest());
    await dispatch(GetRider());
    setClosedTrip(!closedTrip);
  };

  const handleCloseModeTrip = () => {
    setClosedTrip(!closedTrip);
  };

  const closeRejectTrip = () => {
    setRejTrip(false);
    dispatch(CloseReject())
  };

  const ListDriver = useSelector(
    (state) => state.GetRiderSlice
  );

  const handlePurpose = async () => {
    if (purpose == 0) {
      Alert.alert("Please fill the field");
    } else {
      const userdata = {
        purpose: purpose,
      };

      const userdet = {
        user_id: user_id,
      };

      setIsModalVisible(false);
      setLoading(true);
      await dispatch(RequestRide(userdata));
      if (ListDriver?.data != null) {
        setAccepted(true);
        console.log("accepted value ", accepted)
        await dispatch(AssignedDriver(userdet));
      }
      setLoading(false);
      setPurpose("");
    }
  };

  useEffect(() => {
    const init = async () => {
      const userdet = {
        user_id: user_id,
      };
      if (requeststat == true) {
        await dispatch(AssignedDriver(userdet));
      }
    };
    init();
  }, [requeststat]);

  const onCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${assignedDet?.driverdetails?.phone}`;
    } else {
      phoneNumber = `telprompt:${assignedDet?.driverdetails?.phone}`;
    }
    Linking.openURL(phoneNumber);
  };

  const onLogCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${onLoaddata?.driverdetails?.phone}`;
    } else {
      phoneNumber = `telprompt:${onLoaddata?.driverdetails?.phone}`;
    }
    Linking.openURL(phoneNumber);
  };
  const handleModal = () => {
    setIsModalVisible(!isModalVisible)
  };

  useEffect(() => {
    const initial = async () => {
      const userdet = {
        user_id: user_id,
      };
      const latitude= location?.coords.latitude;
      const longitude= location?.coords.longitude;
      // console.log(latitude, longitude);
      setReboot(true);
      await dispatch(AssignedDriver(userdet));
      await dispatch(GetRider());
      await dispatch(LastAssignedDriver(userdet));
      // await dispatch(GetAddress({latitude, longitude}))
      setReboot(false);
    };

    initial();
  }, []);

  // setTimeout(async ()=>{
  //   const userdet = {
  //     user_id: user_id,
  //   };
  //   await dispatch(AssignedDriver(userdet));
  // }, 10000)
  const MINUTE_MS = 10000;



  const onRefresh = async () => {
    const userdet = {
      user_id: user_id,
    };
    setLoader(true);
    await dispatch(LastAssignedDriver(userdet));
    setLoader(false);
  };

  const knowdata = useSelector((state) => state.GetRiderSlice?.data?.drivers);
  const assignedDet = useSelector(
    (state) => state.RequestRideSlice?.assignedDriver
  );
  const onLoaddata = useSelector(
    (state) => state.RequestRideSlice?.Lastassigned
  );

  const {tripStatus, rejectedTrip} = useSelector(
    (state) => state.RequestRideSlice
  );

  const Address = useSelector(
    (state) => state.GetRiderSlice?.address
  );


  // this must never be remove
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    
    // if(data?.message == "Trip deleted"){
    //   () => clearTimeout(interval);
    // }
        if(rejectedTrip == true){
          setRejTrip(true)
        }

    const interval = setTimeout(async() => {
      setCounter(counter + 1);
      const userdet = {
            user_id: user_id,
          };
          
          if(!assignedDet?.driverdetails?.driverId){
          await dispatch(AssignedDriver(userdet));
          }
          if(onLoaddata?.driverdetails?.driverId){
            console.log("showing here ", tripStatus)
            if(tripStatus?.status == "assign"){
            await dispatch(KnowTrip(onLoaddata?.data?.id));
            }
              await dispatch(TripStatus(onLoaddata?.driverdetails?.driverId))
          }else if(assignedDet?.driverdetails?.driverId){
            console.log("showing here too", tripStatus)
            if(tripStatus?.status == "assign"){
              await dispatch(KnowTrip(assignedDet?.data?.id));
              }
            await dispatch(TripStatus(assignedDet?.driverdetails?.driverId))
        }
          
  
    }, 15000);
  
    return () => clearTimeout(interval);
  }, [counter])

 
  const textToShare = `
          Hi, ${onLoaddata?.data?.name} shared their trip on Smoothride with you.
          Driver name: ${onLoaddata?.driverdetails?.staffName},
          Driver Phone number: ${onLoaddata?.driverdetails?.phone},
          Driver Pickup location: ${Address}
  `

  const newtextToShare = `
          Hi, ${assignedDet?.data?.name} shared their trip on Smoothride with you.
          Driver name: ${assignedDet?.driverdetails?.staffName},
          Driver Phone number: ${assignedDet?.driverdetails?.phone},
          Driver Pickup location: ${Address}
  `
  const handleShare = async (text) => {
  try {
    const result = await Share.share({
      message: text,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared with activity type of result.activityType
      } else {
        // Shared
      }
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};


  const username = useSelector((state) => state.LoginSlice?.data?.user?.name);
  const number = knowdata?.length;

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        {maplocation ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Please wait, getting current location</Text>
            <ActivityIndicator animating={true} color="black" />
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            // showsUserLocation
            initialRegion={INITIAL_POSITION}
          >
            <Marker coordinate={INITIAL_POSITION} />
          </MapView>
        )}
      </View>

      {/* <PTRView style={{flex: 1, minHeight: 100, backgroundColor:"white",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 20,}} onRefresh={onRefresh} > */}
      {reboot ? (
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 20,
          }}
        >
          <View style={styles.viewcard}>
            <ActivityIndicator animating={true} color="black" />
          </View>
        </View>
      ) : (
        <View>
          {onLoaddata?.data != null && (
            <View
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 20,
              }}
            >
              <View style={styles.viewcard}>
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
                      Hi, {username}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderBottomColor: "#EDEDED",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "22%", marginStart: 10 }}>
                        {/* {
                                  this.props.driver.driver_image != null && 
                                  <Image
                                  source={{uri: `https://smoothride.ng/taxi/images/${this.props.driver.driver_image}`}}
                                  style={{width:50,height:50, alignSelf:'center',margin:5,borderRadius:25}}
                                  />
                              } 
                              {
                                  this.props.driver.driver_image == null && 
                                  <Image
                                  source={require('../../asset/img/profile.jpg')}
                                  style={{width:50,height:50, alignSelf:'center',margin:5,borderRadius:25}}
                                  />
                              }    */}
                        <Image
                          source={clientimg}
                          style={{
                            width: 50,
                            height: 50,
                            alignSelf: "center",
                            margin: 5,
                            borderRadius: 25,
                          }}
                        />
                      </View>
                      <View style={{ width: "60%", marginLeft: 5 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 1,
                            color: "#877A80",
                            fontWeight: "500",
                          }}
                        >
                          {onLoaddata?.driverdetails?.driverName}{" "}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "200",
                            color: "#877A80",
                            fontWeight: "500",
                          }}
                        >
                          {" "}
                          Unknown{" "}
                        </Text>
                        {/* {
                                      this.props.driver.company_name == null &&
                                      <Text style={{fontSize:16,fontWeight:'200',color:'#877A80',fontFamily: "Roboto-Regular"}}> Unknown </Text>
                                  }
                                  {
                                      this.props.driver.company_name != null &&
                                      <Text style={{fontSize:16,fontWeight:'800',color:'#007cc2',fontFamily: "Roboto-Regular"}}> company name</Text>
                                  } */}
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
                            onPress={onLogCall}
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
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{ width: "60%", justifyContent: "center" }}
                    ></View>
                    {tripStatus?.status == "ontrip"? <View style={{ width: "40%" }}>
                    <TouchableOpacity
                        // onPress={this.oncompleted}
                        onPress={()=>handleShare(textToShare)}
                        style={{
                          marginTop: 7,
                          backgroundColor: "#005091",
                          padding: 10,
                          width: "100%",
                          borderRadius: 10,
                          alignSelf: "center",
                          marginBottom: 15,
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            color: "#fff",
                            fontSize: 13,
                          }}
                        >
                          SHARE DETAILS
                        </Text>
                      </TouchableOpacity>
                    </View> 
                    :
                    <View style={{ width: "40%" }}>
                      <TouchableOpacity
                        // onPress={this.oncompleted}
                        onPress={handleCloseModeTrip}
                        style={{
                          marginTop: 7,
                          backgroundColor: "#005091",
                          padding: 10,
                          width: "100%",
                          borderRadius: 10,
                          alignSelf: "center",
                          marginBottom: 15,
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            color: "#fff",
                            fontSize: 13,
                          }}
                        >
                          CANCEL REQUEST
                        </Text>
                      </TouchableOpacity>
                    </View>}
                  </View>
                </View>
              </View>
            </View>
          )}

          {onLoaddata?.data == null && requeststat == true && (
            <View
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 20,
              }}
            >
              <View style={styles.viewcard}>
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
                      Hi, {username}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderBottomColor: "#EDEDED",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "22%", marginStart: 10 }}>
                        {/* {
                                        this.props.driver.driver_image != null && 
                                        <Image
                                        source={{uri: `https://smoothride.ng/taxi/images/${this.props.driver.driver_image}`}}
                                        style={{width:50,height:50, alignSelf:'center',margin:5,borderRadius:25}}
                                        />
                                    } 
                                    {
                                        this.props.driver.driver_image == null && 
                                        <Image
                                        source={require('../../asset/img/profile.jpg')}
                                        style={{width:50,height:50, alignSelf:'center',margin:5,borderRadius:25}}
                                        />
                                    }    */}
                        <Image
                          source={clientimg}
                          style={{
                            width: 50,
                            height: 50,
                            alignSelf: "center",
                            margin: 5,
                            borderRadius: 25,
                          }}
                        />
                      </View>
                      <View style={{ width: "60%", marginLeft: 5 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 1,
                            color: "#877A80",
                            fontWeight: "500",
                          }}
                        >
                          {assignedDet?.driverdetails?.driverName}{" "}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "200",
                            color: "#877A80",
                            fontWeight: "500",
                          }}
                        >
                          {" "}
                          Unknown{" "}
                        </Text>
                        {/* {
                                            this.props.driver.company_name == null &&
                                            <Text style={{fontSize:16,fontWeight:'200',color:'#877A80',fontFamily: "Roboto-Regular"}}> Unknown </Text>
                                        }
                                        {
                                            this.props.driver.company_name != null &&
                                            <Text style={{fontSize:16,fontWeight:'800',color:'#007cc2',fontFamily: "Roboto-Regular"}}> company name</Text>
                                        } */}
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
                            onPress={onCall}
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
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{ width: "60%", justifyContent: "center" }}
                    ></View>
                    {tripStatus?.status == "ontrip"? <View style={{ width: "40%" }}>
                    <TouchableOpacity
                        // onPress={this.oncompleted}
                        onPress={()=>handleShare(newtextToShare)}
                        style={{
                          marginTop: 7,
                          backgroundColor: "#005091",
                          padding: 10,
                          width: "100%",
                          borderRadius: 10,
                          alignSelf: "center",
                          marginBottom: 15,
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            color: "#fff",
                            fontSize: 13,
                          }}
                        >
                          SHARE DETAILS
                        </Text>
                      </TouchableOpacity>
                    </View> 
                     : 
                     <View style={{ width: "40%" }}>
                      <TouchableOpacity
                        // onPress={this.oncompleted}
                        onPress={handleCloseModeTrip}
                        style={{
                          marginTop: 7,
                          backgroundColor: "#005091",
                          padding: 10,
                          width: "100%",
                          borderRadius: 10,
                          alignSelf: "center",
                          marginBottom: 15,
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            color: "#fff",
                            fontSize: 13,
                          }}
                        >
                          CANCEL REQUEST
                        </Text>
                      </TouchableOpacity>
                    </View>}
                  </View>
                </View>
              </View>
            </View>
          )}

          {onLoaddata?.data == null && requeststat == false && tripStatus == null && (
            <View>
              {number == 0 ? (
                <View
                  style={{
                    backgroundColor: "white",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#007CC2",
                      textAlign: "center",
                      fontSize: 20,
                      marginTop: 25,
                    }}
                  >
                    Hi, {username}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#EDEDED",
                      padding: 1,
                      width: "90%",
                      marginLeft: "5%",
                      borderRadius: 7,
                      marginTop: 20,
                    }}
                  >
                    {/* {
                                             this.state.isrequestingdrivers == true &&
                                             <Text style={styles.driverbtn}>Getting available drivers....</Text>
                                         } */}
                    {/* {
                                             this.state.isrequestingdrivers == false && */}
                    <Text
                      style={{
                        marginStart: 5,
                        color: "#000",
                        fontSize: 20,
                        alignSelf: "center",
                        // fontFamily:'Roboto-Regular',1
                        color: "#C1C1C1",
                      }}
                    >
                      {" "}
                      {number} driver(s) available
                    </Text>
                    {/* } */}
                  </TouchableOpacity>
                  <View
                    // key = {driver.id}
                    // value = {driver.id}
                    style={{
                      marginTop: 20,
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      shadowColor: "gray",
                      elevation: 3,
                      backgroundColor: "white",
                      borderRadius: 10,
                      width: "90%",
                      marginLeft: "5%",
                    }}
                  >
                    <Text>No driver available</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 7,
                      backgroundColor: "#005091",
                      padding: 10,
                      width: "90%",
                      borderRadius: 10,
                      alignSelf: "center",
                      marginBottom: 20,
                      marginLeft: "5%",
                    }}
                    onPress={handleModal}
                  >
                    {loading ? (
                      <ActivityIndicator animating={true} color="white" />
                    ) : (
                      <Text
                        style={{
                          alignSelf: "center",
                          color: "#fff",
                          fontSize: 25,
                        }}
                        onPress={handleModal}
                      >
                        REQUEST A RIDE
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <FlatList
                  data={knowdata}
                  refreshControl={
                    <RefreshControl refreshing={loader} onRefresh={onRefresh} />
                  }
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      
                        <View
                          // key = {driver.id}
                          // value = {driver.id}
                          style={{
                            marginTop: 20,
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            shadowColor: "gray",
                            elevation: 3,
                            backgroundColor: "white",
                            borderRadius: 10,
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "white",
                              borderTopLeftRadius: 15,
                              borderTopRightRadius: 20,
                            }}
                          >
                            <Text
                              style={{
                                color: "#007CC2",
                                textAlign: "center",
                                fontSize: 20,
                                marginTop: 25,
                              }}
                            >
                              Hi, {username}
                            </Text>
                            <TouchableOpacity
                              style={{
                                backgroundColor: "#EDEDED",
                                padding: 1,
                                width: "90%",
                                marginLeft: "5%",
                                borderRadius: 7,
                                marginTop: 20,
                              }}
                            >
                              {/* {
                                                   this.state.isrequestingdrivers == true &&
                                                   <Text style={styles.driverbtn}>Getting available drivers....</Text>
                                               } */}
                              {/* {
                                                   this.state.isrequestingdrivers == false && */}
                              <Text
                                style={{
                                  marginStart: 5,
                                  color: "#000",
                                  fontSize: 20,
                                  alignSelf: "center",
                                  // fontFamily:'Roboto-Regular',1
                                  color: "#C1C1C1",
                                }}
                              >
                                {" "}
                                {number} driver(s) available
                              </Text>
                              {/* } */}
                            </TouchableOpacity>
                            <View
                              // key = {driver.id}
                              // value = {driver.id}
                              style={{
                                marginTop: 20,
                                shadowOffset: {
                                  width: 0,
                                  height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                                shadowColor: "gray",
                                elevation: 3,
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: "90%",
                                marginLeft: "5%",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  borderBottomWidth: 1,
                                  borderBottomColor: "#EDEDED",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <View style={{ width: "15%", marginStart: 10 }}>
                                  <Image
                                    source={clientimg}
                                    style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: 20,
                                      alignSelf: "center",
                                      margin: 5,
                                    }}
                                  />
                                </View>
                                <View style={{ width: "60%", marginLeft: 5 }}>
                                  <Text
                                    style={{
                                      fontSize: 17,
                                      marginTop: 10,
                                      color: "#877A80",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {" "}
                                    {item?.name}{" "}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <TouchableOpacity
                              style={{
                                marginTop: 7,
                                backgroundColor: "#005091",
                                padding: 10,
                                width: "90%",
                                borderRadius: 10,
                                alignSelf: "center",
                                marginBottom: 20,
                                marginLeft: "5%",
                              }}
                              onPress={handleModal}
                            >
                              {loading ? (
                                <ActivityIndicator
                                  animating={true}
                                  color="white"
                                />
                              ) : (
                                <Text
                                  style={{
                                    alignSelf: "center",
                                    color: "#fff",
                                    fontSize: 25,
                                  }}
                                  onPress={handleModal}
                                >
                                  REQUEST A RIDE
                                </Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                        
                    );
                  }}
                />

                
              )}
            </View>
          )}
        </View>
      )}
      {/* </PTRView> */}
      <Modal isVisible={isModalVisible}>
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
            source={requestfile}
            style={{
              width: 40,
              height: 40,
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 15,
            }}
          />
          <Text style={{ color: "#000", fontSize: 15, textAlign: "center" }}>
            Trip Request
          </Text>
          <TextInput
            style={{
              height: 50,
              color: "#000",
              borderColor: "#C1C1C1",
              marginTop: 10,
              paddingStart: 8,
              borderWidth: 1,
              borderRadius: 5,
              width: "94%",
              alignSelf: "center",
            }}
            value={purpose}
            onChangeText={setPurpose}
            placeholder="State your reason"
          />
          <View
            style={{
              padding: 10,
              alignSelf: "center",
              marginTop: 5,
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#005091",
                backgroundColor: "#005091",
                marginTop: 2,
                borderRadius: 5,
              }}
              onPress={handlePurpose}
            >
              <Text
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  fontSize: 13,
                  padding: 12,
                  marginRight: 5,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleModal}
              style={{
                width: "100%",
                backgroundColor: "#A31225",
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
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <RideRequestSuccess accepted={accepted} handleAccept={handleAccept} />
      <RejectRequest accepted={rejTrip} handleAccept={closeRejectTrip} />
      <CancelModalTrip
        closedTrip={closedTrip}
        handleCloseModeTrip={handleCloseModeTrip}
        cancelRequest={cancelRequest}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2,
  },
});
export default RiderRequest;
