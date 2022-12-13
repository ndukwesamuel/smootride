import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Tripmap = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>tripmap</Text>

      <Button
        onPress={() => {
          navigation.navigate("Login");
        }}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default Tripmap;

const styles = StyleSheet.create({});
