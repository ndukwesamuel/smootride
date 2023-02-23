import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import LogoutComponent from "./LogoutComponent";
import { resetholdriderdata } from "../../../Slice/Driver/HoldTripDataSlice";

import { reset as AcceptReset } from "../../../Slice/Driver/DriverAcceptTripSlice";
import {
  CompleteDriverTripFunc,
  reset as CompleteDriverReset,
} from "../../../Slice/Driver/CompleteDriverTripSlice";

import {
  GetLastAssignTrip,
  reset as resetGetLastAssignTripSlice,
} from "../../../Slice/Driver/GetLastAssignTripSlice";

import { reset as resetGetAllDriverTripsSlice } from "../../../Slice/Driver/GetAllDriverTripsSlice";
import { reset as resetUpdateDriverStatusSlice } from "../../../Slice/Driver/UpdateDriverStatusSlice";
import {
  resetALLStartTrip,
  resetAll_Excerpt_startTripdata,
} from "../../../Slice/Driver/StartTripSlice";

import { reset as resetGetrider } from "../../../Slice/auth/Getrider";

import {
  ExitTripFunc,
  reset as resetExitTripSlice,
} from "../../../Slice/Driver/ExitTripSlice";

import {
  RejectTrip,
  reset as resetRejectTripSlice,
} from "../../../Slice/Driver/RejectTripSlice";
import { reset as resetCompleteDriverTripSlice } from "../../../Slice/Driver/CompleteDriverTripSlice";
import StartTrip from "./StartTrip";
import TakeAnotherStartTrip from "./TakeAnotherStartTrip";
import { Card } from "react-native-shadow-cards";
import { GetUserConfigreset } from "../../../Slice/Driver/GetUserConfig";
import { resetALLFristTripSlice } from "../../../Slice/Driver/FristTripSlice";
const ExitDriverModal = () => {
  const dispatch = useDispatch();

  const { CompleteDriverTripData } = useSelector(
    (state) => state.CompleteDriverTripSlice
  );

  const { ExittripData, IsError, IsSucess, message, IsLoading } = useSelector(
    (state) => state.ExitTripSlice
  );
  const { holdriderdata } = useSelector((state) => state.HoldTripDataSlice);

  const [modalVisible, setModalVisible] = useState(true);

  console.log({ f: CompleteDriverTripData });

  const { user, data, isError, isSuccess, isLoading } = useSelector(
    (state) => state.LoginSlice
  );
  const ActivateGetLastAssignTrip = () => {
    dispatch(
      GetLastAssignTrip({
        user_id: data?.user.id,
      })
    );
  };

  const onPressLearnMore = () => {
    console.log("click");
    dispatch(ExitTripFunc(holdriderdata?.data.id));

    setModalVisible(false);
  };
  console.log({ hdf: ExittripData });

  if (ExittripData?.success) {
    dispatch(resetALLFristTripSlice());
    dispatch(GetUserConfigreset());
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
    dispatch(CompleteDriverReset());
    setModalVisible(false);

    Alert.alert(
      "Alert",
      `Congrat Trip Done and Exited`,

      [
        {
          text: "OK",

          onPress: () => ActivateGetLastAssignTrip(),
          style: "default",
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View
            style={{
              backgroundColor: "#fff",
              width: "98%",
              height: "auto",
              padding: 15,
              paddingTop: 5,
              marginRight: 0,
              alignSelf: "center",
            }}
          >
            <Image
              source={require("../../../assets/images/request.png")}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
                marginTop: 20,
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
              Trip Information
            </Text>

            <Text
              style={{
                color: "#000",
                alignSelf: "center",
                fontSize: 13,
                padding: 12,
                marginRight: 5,
                // fontFamily: "Roboto-Regular",
              }}
            >
              {CompleteDriverTripData?.message}
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
                onPress={onPressLearnMore}
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#005091",
                  backgroundColor: "#005091",
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
                  Okay
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalText}>The trip has been updated</Text>
          </View>
        </View>

        {/* {CompleteDriverTripData?.message ? (
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: "#fff",
                width: "98%",
                height: "auto",
                padding: 15,
                paddingTop: 5,
                marginRight: 0,
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/request.png")}
                style={{
                  width: 40,  
                  height: 40,
                  alignSelf: "center",
                  marginTop: 20,
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
                Trip Information
              </Text>

              <Text
                style={{
                  color: "#000",
                  alignSelf: "center",
                  fontSize: 13,
                  padding: 12,
                  marginRight: 5,
                  // fontFamily: "Roboto-Regular",
                }}
              >
                {CompleteDriverTripData?.message}
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
                  onPress={onPressLearnMore}
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
                    Okay
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalText}>The trip has been updated</Text>
            </View>
          </View>
        ) : (
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: "#fff",
                width: "98%",
                height: "auto",
                padding: 15,
                paddingTop: 5,
                marginRight: 0,
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/request.png")}
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  marginTop: 20,
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
                Trip Information
              </Text>

              <Text
                style={{
                  color: "#000",
                  alignSelf: "center",
                  fontSize: 13,
                  padding: 12,
                  marginRight: 5,
                  // fontFamily: "Roboto-Regular",
                }}
              >
                Driver Has ended Trip
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
                  onPress={onPressLearnMore}
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
                    Okay
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalText}>The trip has been updated</Text>
            </View>
          </View>
        )} */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ExitDriverModal;
