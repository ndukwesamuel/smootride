import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import IonIcon from "react-native-vector-icons/Ionicons";

const DriverTripmap = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={{ backgroundColor: "#005091", padding: 15 }}>
          <View style={{ flexDirection: "row", padding: 10, marginBottom: 20 }}>
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
              }}
            >
              Way Points
            </Text>
          </View>
        </View>
        {/* 

        {
                        this.state.isFetching == true &&
                        <View style ={{marginTop:'45%'}}>
                            <Text style={{alignSelf:'center',fontFamily:'Roboto-Regular',fontSize:15}}>Getting address of Point {this.state.position} / {this.state.waypoints.length} </Text>
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
      </View>
    </ScrollView>
  );
};

export default DriverTripmap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
});
