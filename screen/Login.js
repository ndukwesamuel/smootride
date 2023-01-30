import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { APP_NAME, APIBASEURL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin } from "../Slice/navSlice";
import { login, reset } from "../Slice/auth/LoginSlice";

const image = { uri: "https://reactjs.org/logo-og.png" };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { user, data, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.LoginSlice
  );

  useEffect(() => {
    if (user == true) {
      if (data?.user.userType == "staff") {
        navigation.navigate("TabNavigation", { screen: "RiderRequest" });
      } else if (data?.user.userType == "driver") {
        navigation.navigate("DriverTabNavigation", { screen: "Driver" });
      }
    }
  }, [user, data, isLoading, isError]);

  const handleLogin = () => {
    if (email == "" || password == "") {
      Alert.alert(
        "Alert",
        "Email and Password field is required",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    }
    const userData = {
      email,
      password,
    };
    // setLoading(true)
    dispatch(login(userData));

    dispatch(reset());
    // setLoading(false)
  };

  return (
    <KeyboardAvoidingView>
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
                  fontSize: 20,
                  alignSelf: "center",
                  padding: 7,
                  color: "#fff",
                  fontWeight: "800",
                }}
              >
                LOGIN
              </Text>
            </View>

            <View>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Email"
                placeholderTextColor="#fff"
                style={{
                  paddingStart: 20,
                  color: "#fff",
                  borderColor: "#fff",
                  borderWidth: 1,
                  height: 45,
                  borderRadius: 30,
                  fontSize: 14,
                  // fontFamily: "Roboto-Regular",
                }}
              />

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#fff"
                style={{
                  paddingStart: 20,
                  color: "#fff",
                  height: 45,
                  borderColor: "#fff",
                  marginTop: 20,
                  fontSize: 14,
                  borderRadius: 30,
                  borderWidth: 1,
                  // fontFamily: "Roboto-Regular",
                }}
              />
            </View>

            <TouchableOpacity onPress={handleLogin}>
              <View
                style={{
                  marginTop: 40,
                  backgroundColor: "#a31225",
                  borderRadius: 30,
                  padding: 7,
                }}
              >
                {isLoading ? (
                  <ActivityIndicator animating={true} color="white" />
                ) : (
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "#fff",
                      fontSize: 17,
                    }}
                  >
                    LOGIN
                  </Text>
                )}
                {/* <Button
                  onPress={() => {
                    navigation.navigate("Tripmap");
                  }}
                  title="Learn More"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                /> */}
              </View>
            </TouchableOpacity>

            <View>
              <Text
                onPress={() => {
                  navigation.navigate("forgetpassword");
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
                Forget PASSWORD?
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "25%",
    marginBottom: "20%",
    marginLeft: "5%",
    marginRight: "5%",
  },

  SafeAreaView: {
    width: "100%",
    height: "100%",
  },
  ImageBackground: {
    padding: 10,
  },
});
