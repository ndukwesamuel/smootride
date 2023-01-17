import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { UpdateDriverStatus } from "../../Slice/Driver/UpdateDriverStatusSlice";

import { SelectList } from "react-native-dropdown-select-list";

const ChangeDriveStatus = ({ data1, data2 }) => {
  const dispatch = useDispatch();

  const { drivestatus, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.UpdateDriverStatusSlice
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [user_online_offline, setUser_online_offline] = useState("");
  const [user_Status_reason, setuser_Status_reason] = useState("");
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "offline" },
    { key: "2", value: "online" },
  ];

  const SendrequestStatus = () => {
    dispatch(UpdateDriverStatus({ isAvailable: selected }));
    CancelRequest();
  };

  const CancelRequest = () => {
    setUser_online_offline("");
    setuser_Status_reason("");
    data2(false);
  };

  useEffect(() => {
    if (drivestatus) {
      CancelRequest();
    }

    return () => {};
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={data1}
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

        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
        />

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
          onChangeText={(text) => setuser_Status_reason(text)}
          placeholder="State your reason"
          value={user_Status_reason}
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
            onPress={SendrequestStatus}
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
            {!isLoading && (
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
                Submit
              </Text>
            )}
            {isLoading && <ActivityIndicator size="large" color="white" />}
          </TouchableOpacity>
          {/* 
                  {this.state.isrequesting == true && (
                    <TouchableOpacity>
                      <ActivityIndicator size="small" color="#005091" />
                    </TouchableOpacity>
                  )} */}

          <TouchableOpacity
            onPress={CancelRequest}
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
  );
};

export default ChangeDriveStatus;

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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
