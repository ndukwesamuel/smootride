import {
  ActivityIndicator,
  Alert,
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
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../Slice/auth/LoginSlice";
import {
  PasswordReset_fuc,
  reset as reset_PasswordReset_fuc,
} from "../Slice/auth/PassowrdReset";
const Forgetpassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { ResetUser, data, isError, isSuccess, message, isLoading } =
    useSelector((state) => state.PassowrdReset);

  console.log(ResetUser);
  const RestPassword = () => {
    if (email == "") {
      Alert.alert(
        "Alert",

        "Email field is required",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    }
    let reset_password_data = { email };

    dispatch(PasswordReset_fuc(reset_password_data));
  };

  useEffect(() => {
    if (ResetUser?.success == true) {
      Alert.alert(
        "Alert",
        "Check your Email for your new Password",
        [{ text: "OK" }],
        { cancelable: false }
      );

      dispatch(reset_PasswordReset_fuc());
    }

    if (ResetUser?.success == false) {
      Alert.alert("Alert", "User does not exist", [{ text: "OK" }], {
        cancelable: false,
      });
      dispatch(reset_PasswordReset_fuc());
    }

    return () => {};
  }, [isError, ResetUser, isLoading]);

  return (
    <View>
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
                onChangeText={(text) => setEmail(text)}
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

              <TouchableOpacity onPress={RestPassword}>
                <View
                  style={{
                    marginTop: 20,
                    backgroundColor: "#a31225",
                    padding: 7,
                    borderRadius: 30,
                  }}
                >
                  {!isLoading && (
                    <Text
                      style={{
                        alignSelf: "center",
                        color: "#fff",
                        fontSize: 17,
                      }}
                    >
                      Reset Password
                    </Text>
                  )}

                  {isLoading && <ActivityIndicator color="#fff" size="large" />}
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
                  Back To Login
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
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
