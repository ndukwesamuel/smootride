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
import { Card } from "react-native-shadow-cards";
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
    <PTRView onRefresh={refresh}>
      <ScrollView>
        <ProgressDialog
          visible={false}
          RRR
          title="Saving Data to Server"
          message="Please, wait..."
        />
        <View style={styles.container}>
          <View style={styles.header} className="pt-10">
            <Text style={styles.headerText}>Pending Trip Information</Text>
          </View>

          <View style={{ padding: 10 }} className="  items-center">
            <Card
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
            </Card>
          </View>

          {/* <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
            <Text>Elevation 0</Text>
          </CardView> */}

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
    </PTRView>
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
