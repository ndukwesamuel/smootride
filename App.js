import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screen/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tripmap from "./screen/Tripmap";
import { Provider } from "react-redux";
import { store } from "./store";
import Forgetpassword from "./screen/Forgetpassword";
import DriverProfile from "./screen/Drive/DriverProfile";
import Pending from "./screen/Drive/Pending";
import DriverTripmap from "./screen/Drive/DriverTripmap";
import Trip from "./screen/Drive/Trip";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Trip"
            component={Trip}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DriverTripmap"
            component={DriverTripmap}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Pending"
            component={Pending}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="driversprofile"
            component={DriverProfile}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Tripmap"
            component={Tripmap}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="forgetpassword"
            component={Forgetpassword}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
