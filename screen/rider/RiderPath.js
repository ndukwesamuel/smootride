import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableHighlight,
  Alert,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GetAddress, GetTrips } from "../../Slice/auth/Getrider";
import Timeline from "react-native-timeline-flatlist";
import Triptimeline from "../../components/rider/TripTimeline";
// import moment from "moment";

const RiderPaths = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [wayPoints, setPoints] = useState(null);
  const { tripPoints, pickupPoint, destPoint } = route.params;
  const [position, setPosition] = useState(0);
  // console.log("user id ", tripPoints)
  const trips = useSelector((state) => state?.GetRiderSlice?.address);
  // const tripslength = trips?.length
  // console.warn("destPoint length tips ", destPoint)
  const num = JSON.parse(tripPoints);

  const trial = async ({ tripPoints }) => {
    const arr = JSON.parse(tripPoints);
    // console.log("inside the function ",arr)

    const Address = [];
    setLoading(true);
    Address.push({
      time: "Start",
      title: "Initial",
      description: `${pickupPoint}`,
    });
    for (let r = 0; r < arr.length; r++) {
      const latitude = arr[r].latitude;
      const longitude = arr[r].longitude;
      await dispatch(GetAddress({ latitude, longitude }));
      let res = {
        time: `${r + 1}`,
        title: `Point ${r + 1}`,
        description: `${trips}`,
      };
      // this.setState({position:(r+1)});
      setPosition(r + 1);
      Address.push(res);
      //Alert.alert(this.props.rider.startAddress);
    }
    Address.push({ time: "End", title: "Final", description: `${destPoint}` });
    // console.log("Address ", Address)
    setPoints(Address);
    setLoading(false);
  };

  useEffect(() => {
    trial({ tripPoints });
  }, [route]);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#005091", paddingTop: 35 }}>
        <View style={{ flexDirection: "row", padding: 10, marginBottom: 20 }}>
          <Ionicons
            onPress={() =>
              navigation.navigate("TabNavigation", { screen: "RiderTrips" })
            }
            name="ios-arrow-back"
            size={26}
            color="#fff"
            style={{ width: "6%" }}
          ></Ionicons>
          <Text
            style={{
              color: "#fff",
              width: "92%",
              fontSize: 20,
              textAlign: "center",
              marginLeft: "-2%",
            }}
          >
            Way Points
          </Text>
        </View>
      </View>
      {/* {
                        this.state.isFetching == true &&
                        <View style ={{marginTop:'45%'}}>
                            <Text style={{alignSelf:'center',fontFamily:'Roboto-Regular',fontSize:15}}>Getting address of PointRiderPaths 4 / 8 </Text>
                           <ActivityIndicator color="#007cc2" size='large' />
                        </View>
                    }
                    {
                        this.state.isFetching == false &&
                        <Timeline
                           innerCircle={'dot'}
                           lineColor='#005091'
                           circleColor='#007cc2'
                           timeContainerStyle={{minWidth:52, marginTop: 0}}
                           descriptionStyle={{color:'gray'}}
                           data={this.state.Address}
                           titleStyle = {{color:'gray',fontSize:14}}
                           timeStyle={{textAlign: 'center', backgroundColor:'#005091', color:'white', padding:2, borderRadius:13}}
                           options={{
                            style:{marginTop:15}
                          }}
                        />
                    } */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Text style={{ alignSelf: "center", fontSize: 15 }}>
              Getting address of PointRiderPaths {position} / {num?.length}
            </Text>
            <ActivityIndicator color="#007cc2" size="large" />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* <Timeline
            innerCircle={"dot"}
            lineColor="#005091"
            circleColor="#007cc2"
            timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
            descriptionStyle={{ color: "gray" }}
            data={wayPoints}
            titleStyle={{ color: "gray", fontSize: 14 }}
            timeStyle={{
              textAlign: "center",
              backgroundColor: "#005091",
              color: "white",
              padding: 2,
              borderRadius: 13,
            }}
            options={{
              style: { marginTop: 5 },
            }}
          /> */}
          <Triptimeline wayPoints={wayPoints} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
});

export default RiderPaths;
