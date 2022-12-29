import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import PTRView from "react-native-pull-to-refresh";
// import CardView from "react-native-rn-cardview";
import { ProgressDialog } from "react-native-simple-dialogs";

const status_bar_height = Platform.OS == "ios" ? 20 : 0;

const Pending = () => {
  const [items, setItems] = useState("mynae");
  const [modalVisible, setModalVisible] = useState(false);

  const refresh = () => {
    // Fetch new data and update the items state
    setItems("we name");
  };
  return (
    // <PTRView onRefresh={refresh}>

    <View>
      <Modal visible={modalVisible}>
        <SafeAreaView
          style={{
            backgroundColor: "#fff",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            padding: 15,
            paddingTop: 5,
            marginRight: 0,
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Input your pickup and Destination Address
          </Text>
          <Text
            style={{
              color: "#000",
              fontSize: 15,
              textAlign: "center",
              marginTop: 5,
            }}
          ></Text>
          <View
            style={{
              padding: 10,
              alignSelf: "center",
              marginTop: 5,
              width: "100%",
            }}
          >
            <KeyboardAvoidingView>
              {/* 
            <CardView
                                        cardElevation={2}
                                        cardMaxElevation={2}
                                        cornerRadius={5} style={styles.cardview}>    
                                        <TextInput onFocus = {this.resetaddress} onChangeText = {(text) => this.getaddressSpecified(text)} style={{width:'100%', height:40,borderColor:'gray'}} placeholder="Enter the pickup address"/>
                                </CardView>
                                <CardView
                                        cardElevation={2}
                                        cardMaxElevation={2}
                                        cornerRadius={5} style={styles.cardview}>    
                                        <TextInput onFocus = {this.resetaddress} onChangeText = {(text) => this.getaddressSpecified(text)} style={{width:'100%', height:40,borderColor:'gray'}} placeholder="Enter the Destination address"/>
                                </CardView> */}

              {/* this was not ment to be */}
              <View>
                <TextInput
                  style={{ width: "100%", height: 40, borderColor: "gray" }}
                  placeholder="Enter the pickup address"
                />
              </View>

              {/* tiil here */}
            </KeyboardAvoidingView>

            {/* 
            {
                                    this.state.gettingInputLocation == true &&
                                    <ActivityIndicator size="large" color="#005091"/>
                                }  */}

            <View
              style={{ marginTop: 10 }}
              showsVerticalScrollIndicator={false}
            >
              {/* {this.state.locationFromGoogle.length > 0 && (
                <Text
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontWeight: "bold",
                  }}
                >
                  Select the Start Location below;
                </Text>
              )} */}
              {/* {this.state.locationFromGoogle.map((location) => (
                <TouchableOpacity
                  value={location.description}
                  key={location.description}
                  onPress={() =>
                    this.convertAddressToPoint(location.description)
                  }
                  style={{
                    height: 40,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#c1c1c1",
                    marginTop: 4,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "flex-start", marginStart: 5 }}>
                    {location.description}
                  </Text>
                </TouchableOpacity>
              ))} */}
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <ScrollView>
        <ProgressDialog
          visible={false}
          RRR
          title="Saving Data to Server"
          message="Please, wait..."
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Pending Trip Information</Text>
          </View>

          {/* 
            {this.state.isFetching == true && (
              <ActivityIndicator color="#007cc2" size="large" />
            )}
            {this.state.unsync.length == 0 && (
              <View style={{ padding: 10 }}>
                <CardView
                  cardElevation={2}
                  cardMaxElevation={2}
                  cornerRadius={5}
                  style={styles.cardview}
                >
                  <Text
                    style={{
                      color: "#877A80",
                      alignSelf: "center",
                      fontSize: 16,
                    }}
                  >
                    No Pending Information here
                  </Text>
                </CardView>
              </View>
            )}

            {this.state.unsync.map((d) => (
              <View
                style={styles.body}
                key={d.startTime.toString()}
                value={d.startTime}
              >
                <View style={styles.img}>
                  <Image
                    source={require("../../assets/images/profile.jpg")}
                    style={{
                      width: 70,
                      height: 70,
                      alignSelf: "center",
                      margin: 5,
                    }}
                  />
                </View>
                <View style={styles.info}>
                  <Text
                    style={{
                      marginTop: 1,
                      color: "#877A80",
                      fontWeight: "bold",
                    }}
                  >
                    d.rider_name
                  </Text>

                  <View>
                    <Text style={{ marginTop: 1, color: "#877A80" }}>
                      Distance Travelled
                      <Ionicons
                        name="md-pin"
                        size={15}
                        style={{ color: "#a31225", marginTop: 10 }}
                      />
                      d.distance_covered Meters
                    </Text>
                    <Text style={{ marginTop: 1, color: "#877A80" }}>
                      NGN d.cost
                    </Text>
                  </View>
             {this.state.isSaving == false && (
                    <Text
                      onPress={() => this.saveData(d)}
                      style={{
                        marginTop: 5,
                        borderTopRightRadius: 3,
                        borderTopLeftRadius: 3,
                        borderBottomRightRadius: 3,
                        borderBottomLeftRadius: 3,
                        color: "#fff",
                        alignSelf: "flex-end",
                        padding: 3,
                        backgroundColor: "#a31225",
                      }}
                    >
                      {" "}
                      Save{" "}
                    </Text>
                  )} 
                </View>
              </View>
            ))}
          */}
        </View>
      </ScrollView>
    </View>
    // </PTRView>
  );
};

export default Pending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardview: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  img: {
    width: "22%",
  },
  info: {
    width: "75%",
    marginLeft: 5,
  },
  body: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
  },
  header: {
    backgroundColor: "#005091",
    alignSelf: "center",
    width: "100%",
    padding: 14,
  },
  headerText: {
    fontSize: 20,
    alignSelf: "center",
    color: "#fff",
    marginTop: status_bar_height,
  },
});
