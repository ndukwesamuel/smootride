import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import clientimg from "../../assets/images/profile.jpg";
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
} from "react-native";
import CardView from "react-native-cardview";
import { GOOGLE_MAPS_APIKEYS } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Modal from "react-native-modal";
import requestfile from "../../assets/images/requestfile.png";
import { useDispatch, useSelector } from "react-redux";
import { GetRider } from "../../Slice/auth/Getrider";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.006339428281933124;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
const INITIAL_POSITION = {
  latitude: 40.76711,
  longitude: -73.979704,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const RiderRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleModal = () => setIsModalVisible(!isModalVisible);
  useEffect(() => {
    dispatch(GetRider());
  }, []);
  const knowdata = useSelector((state) => state.GetRiderSlice?.data?.drivers);
  const number = 8;
  console.log("knowndata ", number);

  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        // showsUserLocation
        initialRegion={INITIAL_POSITION}
      /> */}
      <View
        style={{
          position: "absolute",
          width: "90%",
          backgroundColor: "white",
          shadowColor: "black",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          marginLeft: "5%",
          top: 60,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_MAPS_APIKEYS,
            language: "en",
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 20,
        }}
      >
        <Text
          style={{
            color: "#007cc2",
            textAlign: "center",
            fontSize: 20,
            marginTop: 25,
          }}
        >
          Hi, Reginald Umah - Test
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#ededed",
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
              color: "#c1c1c1",
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
          <FlatList
            data={knowdata}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ededed",
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
              );
            }}
          />
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
          <Text
            style={{ alignSelf: "center", color: "#fff", fontSize: 25 }}
            onPress={handleModal}
          >
            REQUEST A RIDE
          </Text>
        </TouchableOpacity>
      </View>

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
              borderColor: "#c1c1c1",
              marginTop: 10,
              paddingStart: 8,
              borderWidth: 1,
              borderRadius: 5,
              width: "94%",
              alignSelf: "center",
            }}
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
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default RiderRequest;
