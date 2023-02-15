import React, { useState, useEffect } from "react";
import { AsyncStorage, StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");

      if (storedUsername && storedPassword) {
        setUsername(storedUsername);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRememberMe = () => {
    console.log("sldksdlklk");
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      storeData();
    } else {
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem("password");
    }
  };

  return (
    <View className="bg-blue-200 flex-1 justify-center">
      <View className="mt-20 bg-white  h-[20%]">
        <TextInput
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Email"
          placeholderTextColor="#fff"
          style={{
            paddingStart: 20,

            borderColor: "red",
            borderWidth: 1,
            height: 45,
            borderRadius: 30,
            fontSize: 14,
            // fontFamily: "Roboto-Regular",
          }}
        />
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          style={{
            paddingStart: 20,

            borderColor: "red",
            borderWidth: 1,
            height: 45,
            borderRadius: 30,
            fontSize: 14,
            // fontFamily: "Roboto-Regular",
          }}
        />
      </View>

      <Checkbox
        style={styles.checkbox}
        value={rememberMe}
        onValueChange={handleRememberMe}
      />
      <Text>Remember me</Text>
      <Text>{username}</Text>
      <Text>{password}</Text>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
