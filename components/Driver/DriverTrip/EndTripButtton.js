import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "react-native-shadow-cards";

const EndTripButtton = () => {
  const stopTrip = () => {
    console.log("working ");
  };
  return (
    <View className="  ">
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
