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
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Feather } from "@expo/vector-icons";

import { APP_NAME, APIBASEURL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin } from "../Slice/navSlice";
import { login, reset } from "../Slice/auth/LoginSlice";
import { StatusBar } from "expo-status-bar";
import Checkbox from "expo-checkbox";

const image = { uri: "https://reactjs.org/logo-og.png" };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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
      rememberMe,
    };

    console.log(userData);
    // setLoading(true)
    dispatch(login(userData));
    // dispatch(reset());
    // setLoading(false)
  };

  const retrieveData = async () => {
    console.log("skjdskdjskj");
    // try {

    //   console.log({ storedUsername });
    //   console.log({ storedPassword });

    //   if (storedUsername && storedPassword) {
    //     const [email, setEmail] = useState("");
    //     const [password, setPassword] = useState("");
    //     setEmail(storedUsername);
    //     setPassword(storedPassword);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const storedData = await AsyncStorage.getItem("rememberData");

      const obj = JSON.parse(storedData);

      if (obj.rememberMe) {
        setEmail(obj.email);
        setPassword(obj.password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <View>
      <StatusBar style="light" backgroundColor="#005091" visible={false} />
      <ImageBackground
        source={require("../assets/images/Smot.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View behavior="padding" style={{ flex: 1, justifyContent: "center" }}>
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

              <View className="mt-5 border border-white rounded-[30px]  flex-row items-center">
                <TextInput
                  className="w-[90%] pl-5 text-white"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Password"
                  secureTextEntry={secureTextEntry}
                  placeholderTextColor="#fff"
                  style={{
                    height: 45,
                    fontSize: 14,
                    // fontFamily: "Roboto-Regular",
                  }}
                />

                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                >
                  <Text>
                    {secureTextEntry ? (
                      <Feather name="eye" size={24} color="white" />
                    ) : (
                      <Feather name="eye-off" size={24} color="white" />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-5 ml-2">
              <View className="flex-row gap-2">
                <Checkbox
                  style={styles.checkbox}
                  value={rememberMe}
                  onValueChange={() => setRememberMe(!rememberMe)}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    fontWeight: "800",
                  }}
                >
                  Remember me
                </Text>
              </View>
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
                Forgot Password ?
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
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
