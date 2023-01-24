import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";

import NetInfo from "@react-native-community/netinfo";
import Geolocation from "react-native-geolocation-service";
import { useSelector } from "react-redux";

// const NetworkState = NetInfo.addEventListener((state) => {
//   console.log("Connection type", state.type);
//   console.log("Is connected?", state.isConnected);
//   console.log("Is isInternetReachable?", state.isInternetReachable);

//   if (state.isConnected == false) {
//     Alert.alert("Alert", "No Internet Connection", [{ text: "OK" }], {
//       cancelable: false,
//     });
//     return false;
//   }

//   if (state.isInternetReachable == false) {
//     Alert.alert(
//       "Alert",
//       "Internet Connection not Accessible",
//       [{ text: "OK" }],
//       { cancelable: false }
//     );
//     return false;
//   }
// });

// NetworkState = async () => {
//     let state = await NetInfo.fetch();
//     if(state.isConnected == false)
//     {
//         Alert.alert(
//             'Alert',
//             'No Internet Connection',
//             [
//               {text: 'OK'},
//             ],
//             {cancelable: false},
//           );
//           return false;
//     }
//     if(state.isInternetReachable == false)
//     {
//         Alert.alert(
//             'Alert',
//             'Internet Connection not Accessible',
//             [
//               {text: 'OK'},
//             ],
//             {cancelable: false},
//           );
//           return false;
//     }
// }

const EndTripButtton = () => {
  const { maplocationdata } = useSelector((state) => state.StartTripSlice);
  const [isConnected, setIsConnected] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  const NetworkState = () => {
    if (isConnected == false) {
      Alert.alert("Alert", "No Internet Connection", [{ text: "OK" }], {
        cancelable: false,
      });
      return false;
    }
    if (isInternetReachable == false) {
      Alert.alert(
        "Alert",
        "Internet Connection not Accessible",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    }
  };

  const stopTrip = () => {
    NetworkState();
  };

  return (
    <View className="">
      <Card className="p-5 w-full ">
        <TouchableOpacity
          onPress={stopTrip}
          style={{ backgroundColor: "#a31225", padding: 10 }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#fff",
              fontSize: 15,
              //   fontFamily: "Roboto-Regular",
            }}
          >
            End Trip
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default EndTripButtton;

const styles = StyleSheet.create({});
