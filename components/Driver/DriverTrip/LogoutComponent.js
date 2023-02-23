import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import { reset as resetUpdateDriverStatusSlice } from "../../../Slice/Driver/UpdateDriverStatusSlice";
import {
  resetALLStartTrip,
  resetAll_Excerpt_startTripdata,
} from "../../../Slice/Driver/StartTripSlice";
import { reset as resetGetAllDriverTripsSlice } from "../../../Slice/Driver/GetAllDriverTripsSlice";
import { reset as resetPassowrdReset } from "../../../Slice/auth/PassowrdReset";
import { reset as resetGetrider } from "../../../Slice/auth/Getrider";
import { reset as resetLoginSlice } from "../../../Slice/auth/LoginSlice";
import { reset as resetExitTripSlice } from "../../../Slice/Driver/ExitTripSlice";
import {
  CompleteDriverTripFunc,
  reset as resetCompleteDriverTripSlice,
} from "../../../Slice/Driver/CompleteDriverTripSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { reset as resetRejectTripSlice } from "../../../Slice/Driver/RejectTripSlice";
import { reset as resetGetLastAssignTripSlice } from "../../../Slice/Driver/GetLastAssignTripSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AcceptTripFun,
  reset as AcceptReset,
} from "../../../Slice/Driver/DriverAcceptTripSlice";
import { useNavigation } from "@react-navigation/native";
import { resetholdriderdata } from "../../../Slice/Driver/HoldTripDataSlice";
import { Logout_fuc } from "../../../Slice/auth/LogoutSlice";
import { UpdateuserexpotokenReset } from "../../../Slice/auth/UpdateuserexpotokenSlice";

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { AcceptTrip } = useSelector((state) => state.DriverAcceptTripSlice);
  const handleLogout = async () => {
    if (AcceptTrip) {
      console.log("Sdsdsdsd");

      Alert.alert(
        "Logout Message",
        "You can't Log out of the app since you're still on a trip.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      console.log("working");
      dispatch(Logout_fuc());
      dispatch(UpdateuserexpotokenReset());
      dispatch(resetGetLastAssignTripSlice());
      dispatch(resetGetAllDriverTripsSlice());
      dispatch(resetRejectTripSlice());
      dispatch(resetCompleteDriverTripSlice());
      dispatch(resetExitTripSlice());
      dispatch(resetLoginSlice());
      dispatch(resetGetrider());
      dispatch(resetPassowrdReset());
      dispatch(resetAll_Excerpt_startTripdata());
      dispatch(resetALLStartTrip());
      dispatch(resetUpdateDriverStatusSlice());
      dispatch(AcceptReset());
      dispatch(resetholdriderdata());
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userdata");
      navigation.navigate("Login");
    }
  };

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", marginTop: 50 }}
      onPress={handleLogout}
    >
      <View style={{ width: "10%", marginTop: 30 }}>
        <IonIcon name="md-log-out" size={20} color="#000000"></IonIcon>
      </View>
      <View style={{ flexDirection: "row", width: "90%", marginTop: 30 }}>
        <Text style={{ fontSize: 12, width: "90%" }}>Log out</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LogoutComponent;

const styles = StyleSheet.create({});
