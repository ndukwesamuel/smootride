import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { persistStore } from "redux-persist";
import { store } from "../../store";
import LogoutComponent from "../../components/Driver/DriverTrip/LogoutComponent";
import { GetAllDriverTrips } from "../../Slice/Driver/GetAllDriverTripsSlice";
import { Logout_fuc } from "../../Slice/auth/LogoutSlice";
import { reset as resetGetAllDriverTripsSlice } from "../../Slice/Driver/GetAllDriverTripsSlice";

const DriverProfile = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { drivertrip, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.GetAllDriverTripsSlice
  );

  const { user, data } = useSelector((state) => state.LoginSlice);

  const handleLogout = async () => {
    console.log("sdsd");
    persistStore(store).purge();
  };
  const [social, setSocial] = useState(false);
  const [support, setSupport] = useState(false);
  const handleSocial = () => {
    setSocial(!social);
  };
  const handleSupport = () => {
    setSupport(!support);
  };

  useEffect(() => {
    dispatch(GetAllDriverTrips());

    return () => {
      dispatch(resetGetAllDriverTripsSlice());
    };
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          marginTop: Platform.OS == "iOS" ? 40 : 0,
          paddingTop: Platform.OS === "android" ? 45 : 20,
          backgroundColor: "#005091",
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        }}
      >
        <View style={{ width: "25%" }}>
          <Image
            source={require("../../assets/images/profile.jpg")}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        </View>
        <View style={{ width: "75%" }}>
          <Text style={{ color: "#fff", marginTop: 10 }}>
            {data?.user.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Text style={{ color: "#fff", marginTop: 4, fontSize: 13 }}>
                Role
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginTop: 4,
                  fontSize: 13,
                }}
              >
                Rider
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={{ color: "#fff", marginTop: 4, fontSize: 13 }}>
                Completed Trips
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginTop: 4,
                  fontSize: 13,
                  marginLeft: "40%",
                }}
              >
                {drivertrip?.length}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20, padding: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "10%", marginTop: 30 }}>
            <IonIcon name="md-headset" size={20} color="#000000"></IonIcon>
          </View>
          <TouchableOpacity
            onPress={handleSupport}
            style={{
              flexDirection: "row",
              width: "90%",
              marginTop: 30,
              borderBottomColor: "#C1C1C1",
              borderBottomWidth: 1,
              paddingBottom: 4,
            }}
          >
            <Text style={{ fontSize: 12, width: "90%" }}>Support Center</Text>
            {support ? (
              <SimpleLineIcons
                name="arrow-down"
                size={20}
                color="#000000"
                style={{ width: "5%" }}
              ></SimpleLineIcons>
            ) : (
              <SimpleLineIcons
                name="arrow-right"
                size={18}
                color="#000000"
                style={{ width: "5%" }}
              ></SimpleLineIcons>
            )}
          </TouchableOpacity>
        </View>
        {support && (
          <View>
            <View style={{ flexDirection: "row", marginTop: -10 }}>
              <View style={{ width: "10%", marginTop: 0 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  marginTop: 30,
                  paddingBottom: 4,
                }}
              >
                <Image
                  source={require("../../assets/images/email.png")}
                  style={{
                    width: 20,
                    aspectRatio: 1.3,
                    alignSelf: "center",
                    width: "10%",
                    margin: 5,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "#000",
                    width: "80%",
                    marginTop: 10,
                    marginStart: 10,
                  }}
                >
                  info@smoothride.ng
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: -10 }}>
              <View style={{ width: "10%", marginTop: 0 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  marginTop: 30,
                  paddingBottom: 4,
                }}
              >
                <Image
                  source={require("../../assets/images/smartphone.png")}
                  style={{
                    width: 20,
                    aspectRatio: 0.9,
                    alignSelf: "center",
                    width: "10%",
                    margin: 5,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "#000",
                    width: "80%",
                    marginTop: 10,
                    marginStart: 10,
                  }}
                >
                  08113975330
                </Text>
              </View>
            </View>
          </View>
        )}
        {/* {
                    this.state.select == 'support' &&
                    <View>
                      <View style={{flexDirection:'row',marginTop:-10}}>
                            <View style={{width:'10%',marginTop:0}}>
                              
                            </View>
                            <View style={{flexDirection:'row', width:'90%',marginTop:30,paddingBottom:4}}>
                            <Image
                                        source={require('../../asset/img/email.png')}
                                        style={{width:20,aspectRatio:1.3,alignSelf:'center',width:'10%',margin:5}}
                               />
                               <Text style={{fontFamily:'Roboto-Bold',fontSize:12,color:'#000',width:'80%',marginTop:10,marginStart:10}}>info@smoothride.ng</Text>
                            </View>
                      </View>
                      <View style={{flexDirection:'row',marginTop:-10}}>
                            <View style={{width:'10%',marginTop:0}}>
                              
                            </View>
                            <View style={{flexDirection:'row', width:'90%',marginTop:30,paddingBottom:4}}>
                            <Image
                                        source={require('../../asset/img/smartphone.png')}
                                        style={{width:20,aspectRatio:0.9,alignSelf:'center',width:'10%',margin:5}}
                               />
                               <Text style={{fontFamily:'Roboto-Bold',fontSize:12,color:'#000',width:'80%',marginTop:10,marginStart:10}}>08113975330</Text>
                            </View>
                      </View>
                  </View>
                 } */}
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={handleSocial}
        >
          <View style={{ width: "10%", marginTop: 30 }}>
            <IonIcon name="md-globe" size={20} color="#000000"></IonIcon>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              marginTop: 30,
              borderBottomColor: "#C1C1C1",
              borderBottomWidth: 1,
              paddingBottom: 4,
            }}
          >
            <Text style={{ fontSize: 12, width: "90%" }}>Socials</Text>
            {social ? (
              <SimpleLineIcons
                name="arrow-down"
                size={20}
                color="#000000"
                style={{ width: "5%" }}
              ></SimpleLineIcons>
            ) : (
              <SimpleLineIcons
                name="arrow-right"
                size={18}
                color="#000000"
                style={{ width: "5%" }}
              ></SimpleLineIcons>
            )}
          </View>
        </TouchableOpacity>
        {social && (
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "10%", marginTop: 30 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  marginTop: 30,
                  paddingBottom: 4,
                }}
              >
                <Text style={{ fontSize: 15, width: "90%" }}>Follow us on</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: -10 }}>
              <View style={{ width: "10%", marginTop: 0 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  marginTop: 30,
                  paddingBottom: 4,
                }}
              >
                {/* <IonIcon
                  name="logo-twitter"
                  size={50}
                  color="#00ACEE"
                  style={{ width: "20%" }}
                ></IonIcon> */}
                <IonIcon
                  name="logo-facebook"
                  size={50}
                  color="#3B5998"
                  style={{ width: "20%" }}
                ></IonIcon>
              </View>
            </View>
          </View>
        )}
        {/* 
        <TouchableOpacity
          style={{ flexDirection: "row", marginTop: 50 }}
          onPress={handleLogout}
        >
          <View style={{ width: "10%", marginTop: 30 }}>
            <IonIcon name="md-log-out" size={20} color="#000000"></IonIcon>
          </View>
          <View style={{ flexDirection: "row", width: "90%", marginTop: 30 }}>
            <Text style={{ fontSize: 12, width: "90%" }}>Log Out</Text>
          </View>
        </TouchableOpacity> */}

        <View>
          <LogoutComponent />
        </View>
      </View>
    </ScrollView>
  );
};

export default DriverProfile;

const styles = StyleSheet.create({});
