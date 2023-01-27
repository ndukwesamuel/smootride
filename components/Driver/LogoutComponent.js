import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import { reset as resetUpdateDriverStatusSlice } from "../../Slice/Driver/UpdateDriverStatusSlice";
import {
  resetALLStartTrip,
  resetAll_Excerpt_startTripdata,
} from "../../Slice/Driver/StartTripSlice";
import { reset as resetGetAllDriverTripsSlice } from "../../Slice/Driver/GetAllDriverTripsSlice";
import { reset as resetPassowrdReset } from "../../Slice/auth/PassowrdReset";
import { reset as resetGetrider } from "../../Slice/auth/Getrider";
import { reset as resetLoginSlice } from "../../Slice/auth/LoginSlice";
import { reset as resetExitTripSlice } from "../../Slice/Driver/ExitTripSlice";
import {
  CompleteDriverTripFunc,
  reset as resetCompleteDriverTripSlice,
} from "../../Slice/Driver/CompleteDriverTripSlice";
import { reset as resetRejectTripSlice } from "../../Slice/Driver/RejectTripSlice";
import { reset as resetGetLastAssignTripSlice } from "../../Slice/Driver/GetLastAssignTripSlice";
import { useDispatch } from "react-redux";
import {
  AcceptTripFun,
  reset as AcceptReset,
} from "../../Slice/Driver/DriverAcceptTripSlice";
import { useNavigation } from "@react-navigation/native";

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    console.log("working");
    dispatch(resetGetLastAssignTripSlice());
    dispatch(resetRejectTripSlice());
    dispatch(resetCompleteDriverTripSlice());
    dispatch(resetExitTripSlice());
    dispatch(resetLoginSlice());
    dispatch(resetGetrider());
    dispatch(resetPassowrdReset());
    dispatch(resetAll_Excerpt_startTripdata());
    dispatch(resetALLStartTrip());
    dispatch(resetUpdateDriverStatusSlice());
    dispatch(resetGetAllDriverTripsSlice());
    await AsyncStorage.removeItem("token");

    navigation.navigate("Login");
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
        <Text style={{ fontSize: 12, width: "90%" }}>Log Out</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LogoutComponent;

const styles = StyleSheet.create({});
