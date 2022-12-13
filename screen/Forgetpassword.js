import {
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import GlobalStyles from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

const Forgetpassword = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/images/Smot.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, justifyContent: "center" }}
        >
          <View style={styles.container}>
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 100, height: 80, alignSelf: "center" }}
                source={require("../assets/images/smoothride.png")}
              />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: "center",
                  padding: 7,
                  color: "#fff",
                  fontWeight: "800",
                }}
              >
                RESET PASSWORD
              </Text>
            </View>

            <View>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#fff"
                style={{
                  paddingStart: 20,
                  marginTop: 20,
                  borderColor: "#fff",
                  height: 45,
                  color: "#fff",
                  borderWidth: 1,
                  borderRadius: 30,
                  fontSize: 14,
                }}
              />

              <TouchableOpacity>
                <View
                  style={{
                    marginTop: 20,
                    backgroundColor: "#a31225",
                    padding: 7,
                    borderRadius: 30,
                  }}
                >
                  <Text
                    style={{ alignSelf: "center", color: "#fff", fontSize: 17 }}
                  >
                    RESET PASSWORD
                  </Text>
                </View>
              </TouchableOpacity>

              <View>
                <Text
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                  style={{
                    fontSize: 15,
                    alignSelf: "center",
                    padding: 7,
                    color: "#fff",
                    fontWeight: "800",
                    marginTop: 15,
                  }}
                >
                  GO TO LOGIN
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Forgetpassword;

const styles = StyleSheet.create({
  ImageBackground: {
    padding: 10,
  },
  container: {
    flex: 1,
    marginTop: "25%",
    marginBottom: "20%",
    marginLeft: "5%",
    marginRight: "5%",
  },
});
