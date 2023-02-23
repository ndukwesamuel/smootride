import {
  ActivityIndicator,
  Alert,
  AppState,
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
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
import * as Notifications from "expo-notifications";
import {
  NotificationDataFunC,
  NotificationDataModalFunC,
  Updateuserexpotoken_Fun,
} from "../Slice/auth/UpdateuserexpotokenSlice";
import { GetLastAssignTrip } from "../Slice/Driver/GetLastAssignTripSlice";

import { reset as resetGetAllDriverTripsSlice } from "../Slice/Driver/GetAllDriverTripsSlice";
import { reset as resetLoginSlice } from "../Slice/auth/LoginSlice";

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

  const GAme = useSelector((state) => state);

  console.log({ GetAllDriverTripsSlice: GAme });

  console.log({ userlog: data?.user.email });
  console.log({ userlog: data?.user.id });

  const ActivateGetLastAssignTrip = () => {
    dispatch(
      GetLastAssignTrip({
        user_id: data?.user.id,
      })
    );
  };

  function SwitchUserType() {
    if (data?.user.userType == "staff") {
      console.log({ quserlog: data?.user.userType });

      // navigation.navigate("forgetpassword");

      navigation.navigate("TabNavigation", { screen: "RiderRequest" });

      // return navigation.navigate("TabNavigation", { screen: "RiderRequest" });
    } else if (data?.user.userType == "driver") {
      console.log({ quserlog: data?.user.userType });

      navigation.navigate("DriverTabNavigation", { screen: "Driver" });
    }
  }

  // const SwitchUserType = () => {
  //   console.log("skdjsdkj");

  //   // if (data?.user.userType == "staff") {
  //   //   navigation.navigate("TabNavigation", { screen: "RiderRequest" });
  //   // } else if (data?.user.userType == "driver") {
  //   //   navigation.navigate("DriverTabNavigation", { screen: "Driver" });
  //   // }

  //   // return;
  // };

  useEffect(() => {
    const AutheticationFun = async () => {
      const value = await AsyncStorage.getItem("PushToken");
      if (data) {
        let databaseToken = data?.user.pushToken;

        if (value != databaseToken) {
          let userobj = {
            pushToken: value,
          };
          dispatch(Updateuserexpotoken_Fun(userobj));
        } else {
          SwitchUserType();
        }
      } else {
        // Alert.alert("Alert", "Try loging again ", [{ text: "OK" }], {
        //   cancelable: false,
        // });

        console.log("error");
      }
    };

    AutheticationFun();
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
    try {
      const storedData = await AsyncStorage.getItem("rememberData");

      const obj = JSON.parse(storedData);

      if (obj?.rememberMe) {
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

  // start here

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
      };
    },
  });

  const [pushToken, setPushToken] = useState();

  useEffect(() => {
    async function getNotificationPermission() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
      }
      if (status !== "granted") {
        // Handle the case where the user declines permission
        console.log("Failed to get push token for push notification!");
        return;
      }

      let token;
      token = (await Notifications.getExpoPushTokenAsync()).data;

      console.log({ first_token: token });
      // Permission granted, handle accordingly
      await AsyncStorage.setItem("PushToken", token);
      const value = await AsyncStorage.getItem("PushToken");

      console.log({ value });
      setPushToken(value);
    }

    getNotificationPermission();
    // getNotificationPermission();
  }, []);

  useEffect(() => {
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log({ response });

        const data = response.notification.request.content.data;
        dispatch(NotificationDataModalFunC(true));

        dispatch(NotificationDataFunC(response));
      });

    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log({ notification });

        dispatch(NotificationDataModalFunC(true));
        dispatch(NotificationDataFunC(notification));
      });

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  console.log({ pushToken });

  useEffect(() => {
    dispatch(resetGetAllDriverTripsSlice());
    // dispatch(resetLoginSlice());

    return () => {};
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
