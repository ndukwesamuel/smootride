import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import LogoutComponent from "./LogoutComponent";
import { resetholdriderdata } from "../../../Slice/Driver/HoldTripDataSlice";

import { reset as AcceptReset } from "../../../Slice/Driver/DriverAcceptTripSlice";
import {
  CompleteDriverTripFunc,
  reset as CompleteDriverReset,
} from "../../../Slice/Driver/CompleteDriverTripSlice";

import { reset as resetGetLastAssignTripSlice } from "../../../Slice/Driver/GetLastAssignTripSlice";

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

  const onPressLearnMore = () => {
    console.log("click");
    dispatch(ExitTripFunc(holdriderdata?.data.id));

    setModalVisible(false);
  };
  console.log({ hdf: ExittripData });

  if (ExittripData?.success) {
    Alert.alert("Alert", `Congrat Trip Done and Exited`, [{ text: "OK" }], {
      cancelable: false,
    });

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
        {CompleteDriverTripData?.message ? (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                this trip will not be updated but move
              </Text>

              <Button
                onPress={onPressLearnMore}
                title="Click "
                color="#841584"
              />
              <Pressable style={[styles.button, styles.buttonClose]}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>The trip has been updated</Text>

              <Button
                onPress={onPressLearnMore}
                title="Click Me"
                color="#841584"
              />
              <Pressable style={[styles.button, styles.buttonClose]}>
                <Text style={styles.textStyle}>Hide Modal</Text>

                {IsLoading && <Text> This is loadiing </Text>}
              </Pressable>
            </View>
          </View>
        )}
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
