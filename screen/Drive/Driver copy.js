import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ProgressDialog } from "react-native-simple-dialogs";
import PTRView from "react-native-pull-to-refresh";
import CardView from "react-native-cardview";

const status_bar_height = Platform.OS == "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
const Driver = () => {
  const [modalVisible, setModalVisible] = useState(false);
  let data = "test";
  return (
    <PTRView style={styles.container}>
      <View>
        {/* {
                   this.props.drivertrip.IsjustSubmittedTrip == true && 
                   <View>
                    {this.ff()}
                   </View>
               }  */}

        <ScrollView keyboardShouldPersistTaps="always">
          <ProgressDialog
            // visible={this.state.isSavingAvailability}
            // visible={true}
            title="Updating Driver Availability"
            message="Please, wait..."
          />

          <Modal
            visible={false}
            // isVisible={this.state.costAvailable  }
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "98%",
                height: "auto",
                padding: 15,
                paddingTop: 5,
                marginRight: 0,
                alignSelf: "center",
                borderWidth: 3,
                borderColor: "red",
              }}
            >
              <Image
                source={require("../../assets/images/request.png")}
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 15,
                }}
              />

              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  // fontFamily: "Roboto-Bold",
                  textAlign: "center",
                }}
              >
                Trip Information
              </Text>

              <Text
                style={{
                  color: "#000",
                  alignSelf: "center",
                  fontSize: 13,
                  padding: 12,
                  marginRight: 5,
                  // fontFamily: "Roboto-Regular",
                }}
              >
                {/* {this.state.TripInfo} */}
                TripInfo
              </Text>

              <View
                style={{
                  padding: 10,
                  alignSelf: "center",
                  marginTop: 5,
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#005091",
                    backgroundColor: "#005091",
                    marginTop: 2,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      alignSelf: "center",
                      fontSize: 13,
                      padding: 12,
                      marginRight: 5,
                      // fontFamily: "Roboto-Regular",
                    }}
                  >
                    Okay
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View
            style={{ position: "absolute", top: 50, right: 20, zIndex: 90 }}
          >
            {/* <Text style={styles.headerText}>
                           Trip Request <Text style={{fontSize:12}}>{this.state.driver_mode}</Text>
                       </Text> */}
            <Text
              //  onPress={this.toggleDialog}

              style={{
                fontSize: 12,
                alignSelf: "flex-end",
                borderRadius: 5,
                color: "#fff",
                backgroundColor: "#a31225",
                padding: 3,
              }}
            >
              Status
            </Text>
          </View>

          <Modal
            visible={modalVisible}
            // isVisible={this.state.getlocationmodal}
          >
            <KeyboardAvoidingView>
              <View
                style={{
                  backgroundColor: "#fff",
                  width: width,
                  marginRight: 0,
                  alignSelf: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 18,
                    // fontFamily: "Roboto-Bold",
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  We observed your trip Map did not load on Time
                </Text>

                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    // fontFamily: "Roboto-Regular",
                    textAlign: "center",
                    marginTop: 5,
                  }}
                >
                  Enter the address where you started trip
                </Text>

                <View
                  style={{
                    padding: 10,
                    alignSelf: "center",
                    marginTop: 5,
                    width: "100%",
                  }}
                >
                  {/* <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    style={styles.cardview}
                  >
                    <TextInput
                      // onChangeText={(text) => this.getaddressSpecified(text)}
                      style={{ width: "100%", height: 40, borderColor: "gray" }}
                      placeholder="Enter the pickup address"
                    />
                  </CardView> */}
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
                    )}
                    {this.state.locationFromGoogle.map((location) => (
                      <TouchableOpacity
                        value={location.description}
                        key={location.description}
                        onPress={() =>
                          this.isDriverSureDestLocation(location.description)
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
                        <Text
                          style={{ alignSelf: "flex-start", marginStart: 5 }}
                        >
                          {location.description}
                        </Text>
                      </TouchableOpacity>
                    ))} */}
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>

          <Modal
            // isVisible={this.state.decline}

            visible={modalVisible}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "98%",
                height: 300,
                padding: 15,
                paddingTop: 5,
                marginRight: 0,
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../../assets/images/request.png")}
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  marginTop: 10,
                  marginBottom: 15,
                }}
              />
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  fontFamily: "Roboto-Bold",
                  textAlign: "center",
                }}
              >
                Trip Option
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  fontFamily: "Roboto-Bold",
                  textAlign: "center",
                }}
              ></Text>

              {/* {
                          Platform.OS == 'ios' && this.props.drivertrip.isFirstTrip == true &&
                            <View style={{borderWidth:1,borderColor:'#c1c1c1',width:'94%',alignSelf:'center',borderRadius:5,marginBottom:5}}>
                            <RadioForm
                            radio_props={tripissues}
                            initial={-1}
                            labelStyle={{marginRight: '20%'}}
                            buttonColor={'#005091'}
                            buttonInnerColor={'#005091'}
                            buttonSize={10}
                            animation={true}
                            onPress={(value) => {this.setState({reasonfordecline:value})}}
                          />
                          </View>
                        } */}

              {/* {
                            this.props.drivertrip.isFirstTrip == true && Platform.OS == 'android' &&
                            <View style={{borderWidth:1,borderColor:'#c1c1c1',width:'94%',alignSelf:'center',borderRadius:5,marginBottom:5}}>
                            <Picker
                                selectedValue={this.state.reasonfordecline}
                                style={{height: 40, width: '100%',borderWidth:1,borderColor:'#005091'}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({reasonfordecline: itemValue})
                                }>
                                <Picker.Item label="Select Reason" value="" />
                                <Picker.Item label="Unavailable for Trip" value="reassign" />
                                <Picker.Item label="Client Decline Trip" value="decline" />
                            </Picker> 
                            </View>
                        } */}

              <View
                style={{
                  padding: 10,
                  alignSelf: "center",
                  marginTop: 5,
                  width: "100%",
                }}
              >
                {/* {
                                this.state.isrequesting == false &&
                                <TouchableOpacity onPress = {this.declinenow} style={{width:'100%',backgroundColor:'#fff',borderWidth:1,borderColor:'#005091',backgroundColor:'#005091',marginTop:2,borderRadius:5}}>
                                  <Text style={{color:'#fff',alignSelf:'center',fontSize:13,padding:12,marginRight:5,fontFamily:'Roboto-Regular'}}>Yes</Text>
                                </TouchableOpacity>
                            } */}

                {/* {
                                this.state.isrequesting == true &&
                                <TouchableOpacity>
                                    <ActivityIndicator size="small" color="#005091"/>
                                </TouchableOpacity>
                            } */}

                <TouchableOpacity
                  // onPress={this.dismissdeclinemodal}
                  style={{
                    width: "100%",
                    backgroundColor: "#a31225",
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      alignSelf: "center",
                      fontSize: 13,
                      padding: 12,
                      marginRight: 5,
                      // fontFamily: "Roboto-Regular",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            // isVisible={this.state.showDialogforExit}

            visible={modalVisible}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "98%",
                height: 300,
                padding: 15,
                paddingTop: 5,
                marginRight: 0,
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../../assets/images/request.png")}
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  marginTop: 40,
                  marginBottom: 15,
                }}
              />
              <Text
                style={{
                  color: "#000",
                  fontSize: 18,
                  // fontFamily: "Roboto-Bold",
                  textAlign: "center",
                }}
              >
                Trip Exit
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  // fontFamily: "Roboto-Regular",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Do you really want to exit trip with this rider ?
              </Text>
              <View
                style={{
                  padding: 10,
                  alignSelf: "center",
                  marginTop: 5,
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  // onPress={this.exitthistrip}
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#005091",
                    backgroundColor: "#005091",
                    marginTop: 2,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      alignSelf: "center",
                      fontSize: 13,
                      padding: 12,
                      marginRight: 5,
                      // fontFamily: "Roboto-Regular",
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.setState({ showDialogforExit: false });
                  // }}
                  style={{
                    width: "100%",
                    backgroundColor: "#a31225",
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      alignSelf: "center",
                      fontSize: 13,
                      padding: 12,
                      marginRight: 5,
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={modalVisible}

            // isVisible={this.state.driverrequest}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "98%",
                height: 380,
                padding: 15,
                paddingTop: 5,
                marginRight: 0,
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../../assets/images/request.png")}
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  marginTop: 40,
                  marginBottom: 15,
                }}
              />
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  // fontFamily: "Roboto-Bold",
                  textAlign: "center",
                }}
              >
                Make Request
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  // fontFamily: "Roboto-Regular",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Request to Change State
              </Text>
              {/* {Platform.OS == "ios" && (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#c1c1c1",
                    width: "94%",
                    alignSelf: "center",
                    borderRadius: 5,
                    marginBottom: 5,
                  }}
                >
                  <RadioForm
                    radio_props={managestate}
                    initial={-1}
                    formHorizontal={true}
                    labelStyle={{ marginRight: "20%" }}
                    buttonColor={"#005091"}
                    buttonInnerColor={"#005091"}
                    buttonSize={10}
                    animation={true}
                    onPress={(value) => {
                      this.setState({ request: value });
                    }}
                  />
                </View>
              )}

              {Platform.OS == "android" && (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#c1c1c1",
                    width: "94%",
                    alignSelf: "center",
                    borderRadius: 5,
                    marginBottom: 5,
                  }}
                >
                  <Picker
                    selectedValue={this.state.request}
                    style={{
                      height: 40,
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "#005091",
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ request: itemValue })
                    }
                  >
                    <Picker.Item label="Select State" value="" />
                    <Picker.Item label="Offline" value="Offline" />
                    <Picker.Item label="Online" value="Online" />
                  </Picker>
                </View>
              )} */}

              <TextInput
                style={{
                  height: 40,
                  paddingStart: 10,
                  borderColor: "#c1c1c1",
                  borderWidth: 1,
                  borderRadius: 5,
                  width: "94%",
                  alignSelf: "center",
                }}
                // onChangeText={(text) => this.setState({ reason: text })}
                placeholder="State your reason"
                // value={this.state.reason}
              />
              <View
                style={{
                  padding: 10,
                  alignSelf: "center",
                  marginTop: 5,
                  width: "100%",
                }}
              >
                {/* {this.state.isrequesting == false && (
                  <TouchableOpacity
                    onPress={this.sendrequest}
                    style={{
                      width: "100%",
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#005091",
                      backgroundColor: "#005091",
                      marginTop: 2,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        alignSelf: "center",
                        fontSize: 13,
                        padding: 12,
                        marginRight: 5,
                        fontFamily: "Roboto-Regular",
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                )} */}
                {/* 
                {this.state.isrequesting == true && (
                  <TouchableOpacity>
                    <ActivityIndicator size="small" color="#005091" />
                  </TouchableOpacity>
                )} */}
                <TouchableOpacity
                  // onPress={this.dismissmodal}
                  style={{
                    width: "100%",
                    backgroundColor: "#a31225",
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      alignSelf: "center",
                      fontSize: 13,
                      padding: 12,
                      marginRight: 5,
                      // fontFamily: "Roboto-Regular",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* pls there is still component  */}
        </ScrollView>
      </View>
    </PTRView>
  );
};

export default Driver;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#005091",
    alignSelf: "center",
    width: "100%",
    padding: 14,
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  actionbtn: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 18,
    // fontFamily: "Roboto-Regular",
  },
  viewcard: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
  },
  cardview: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "#fff",
    width: "90%",
    // fontFamily: "Roboto-Regular",
    marginTop: status_bar_height,
  },
  details: {
    padding: 10,
    fontSize: 14,
    // fontFamily: "Roboto-Regular",
  },
  time: {
    color: "#877A80",
    fontSize: 13,
  },
});
