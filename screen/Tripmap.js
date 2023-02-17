import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import Timeline from "react-native-timeline-flatlist";

import { useNavigation } from "@react-navigation/native";
import { GetAddress } from "../Slice/auth/Getrider";
import { useDispatch, useSelector } from "react-redux";
import Triptimeline from "../components/rider/TripTimeline";

const Tripmap = ({ route }) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [wayPoints, setPoints] = useState(null);
  let { tripPoints, pickUpAddress, destAddress } = route.params.data;

  const [position, setPosition] = useState(0);
  const dispatch = useDispatch();
  const num = JSON.parse(tripPoints);
  const trips = useSelector((state) => state?.GetRiderSlice?.address);

  const getaddress = async (tripPoints, pickUpAddress, destAddress) => {
    const jsontripPoints = JSON.parse(tripPoints);

    console.log({ tripPoints });
    console.log({ jsontripPoints });

    const Address = [];
    setLoading(true);

    Address.push({
      time: "Start",
      title: "Initial",
      description: `${pickUpAddress}`,
    });
    for (let r = 0; r < jsontripPoints.length; r++) {
      const latitude = jsontripPoints[r].latitude;
      const longitude = jsontripPoints[r].longitude;
      dispatch(GetAddress({ latitude, longitude }));
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
    Address.push({
      time: "End",
      title: "Final",
      description: `${destAddress}`,
    });
    // console.log("Address ", Address)
    setPoints(Address);
    setLoading(false);
  };

  useEffect(() => {
    getaddress(tripPoints, pickUpAddress, destAddress);

    return () => {};
  }, []);

  return (
    <View className="" style={styles.container}>
      <View style={{ backgroundColor: "#005091", padding: 15 }}>
        <View
          style={{ flexDirection: "row", padding: 10, marginBottom: 10 }}
          className="pt-10"
        >
          <IonIcon
            onPress={() => navigation.goBack()}
            name="ios-arrow-back"
            size={26}
            color="#fff"
            style={{ width: "6%" }}
          ></IonIcon>
          <Text
            style={{
              color: "#fff",
              width: "92%",
              fontSize: 20,
              textAlign: "center",
              marginLeft: "-2%",
              // fontFamily: "Roboto-Bold",
            }}
          >
            Way Points
          </Text>
        </View>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ marginTop: "45%" }}>
            <Text style={{ alignSelf: "center", fontSize: 15 }}>
              Getting address of PointRiderPaths {position} / {num?.length}
            </Text>
            <ActivityIndicator color="#007cc2" size="large" />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Triptimeline wayPoints={wayPoints} />
        </View>
      )}
    </View>
  );
};

export default Tripmap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
});
const mapStateToProps = (state) => {
  return {
    data: state.DataReducer,
    rider: state.RiderReducer,
  };
};
