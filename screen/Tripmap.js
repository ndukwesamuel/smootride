import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import Timeline from "react-native-timeline-flatlist";

import { useNavigation } from "@react-navigation/native";

const Tripmap = ({ route }) => {
  const navigation = useNavigation();

  const [address, setAddress] = useState(null);
  const [waypoints, setWaypoints] = useState([]);

  let propsData = route;

  console.log(waypoints);

  const getaddress = (propsData) => {
    if (route.params.data.tripPoints) {
      let waypoints = JSON.parse(route.params.data.tripPoints);

      setWaypoints(waypoints);
    }

    // console.log(propsData);
    // let waypoints = [];
    // if (data.tripPoints !== null) waypoints = JSON.parse(data.tripPoints);
    // console.log(waypoints);
    // this.setState({waypoints:waypoints});
    // Address = [];
    // Address.push({time: 'Start', title: 'Initial', description:`${data.pickUpAddress}`});
    // for(let r = 0; r < waypoints.length; r++){
    //     await this.props.dispatch(startAddress(waypoints[r].latitude,waypoints[r].longitude));
    //     let res = {time: `${r+1}`, title: `Point ${r+1}`, description:`${this.props.rider.startAddress}`};
    //     this.setState({position:(r+1)});
    //     Address.push(res);
    //     //Alert.alert(this.props.rider.startAddress);
    // }
    // Address.push({time: 'End', title: 'Final', description:`${data.destAddress}`});
    // this.setState({Address:Address});
    // this.setState({isFetching:false});
    // //console.error(Address);
  };

  useEffect(() => {
    getaddress();

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
      <Text>tripmap</Text>

      {propsData && (
        <Timeline
          innerCircle={"dot"}
          lineColor="#005091"
          circleColor="#007cc2"
          timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
          descriptionStyle={{ color: "gray" }}
          data={propsData}
          // data={this.state.Address}

          titleStyle={{ color: "gray", fontSize: 14 }}
          timeStyle={{
            textAlign: "center",
            backgroundColor: "#005091",
            color: "white",
            padding: 2,
            borderRadius: 13,
          }}
          options={{
            style: { marginTop: 15 },
          }}
        />
      )}

      <Button
        onPress={() => {
          navigation.navigate("Login");
        }}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
