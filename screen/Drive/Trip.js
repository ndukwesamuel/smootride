import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import PTRView from "react-native-pull-to-refresh";
import Timeline from "react-native-timeline-flatlist";

const { width, height } = Dimensions.get("window");

const status_bar_height = Platform.OS == "ios" ? 20 : 0;

// this is a fake data set
const data = [
  { time: "09:00", title: "Event 1", description: "Event 1 Description" },
  { time: "10:45", title: "Event 2", description: "Event 2 Description" },
  { time: "12:00", title: "Event 3", description: "Event 3 Description" },
];
const Trip = () => {
  return (
    <PTRView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>All Trips</Text>
          </View>

          <Modal style={{ width: width, backgroundColor: "#fff", margin: 0 }}>
            <View
              style={{
                backgroundColor: "#fff",
                width: width,
                height: height,
                marginLeft: 0,
              }}
            >
              {/* <Timeline data="test" /> */}

              <Timeline data={data} />
            </View>
          </Modal>

          {/* {
                        this.state.isFetching == true && <ActivityIndicator color="#007cc2" size='large' />
                    } */}

          {/* 
{
                        this.state.data.length == 0 && this.state.isFetching == false && <Text style={{marginTop:1,color:'#877A80',alignSelf:'center',fontSize:15}}>No previous trip information</Text>
                    } */}

          {/* { */}

          {/* // this.state.data.map((d) =>
                        // <TouchableOpacity  key = {uuid()} value={uuid()} onPress = {() => this.startTimeAgain(d)}>
                        */}

          {/*    
                        <View style={styles.body}>
                            <View style= {styles.img}>
                                    <Ionicons name='md-car' size={30} style={{color:'#007cc2',marginTop:10}}/>
                            </View>
                                <View style = {styles.info}>
                                <Text style={{marginTop:1,color:'#877A80'}}> <Ionicons name='md-pin' size={15} style={{color:'green',marginTop:10}}/> {d.pickUpAddress}</Text>
                                <Text style={{marginTop:1,color:'#877A80'}}> <Ionicons name='md-pin' size={15} style={{color:'red',marginTop:10}}/> {d.destAddress}</Text>
                                <Text style={{marginTop:1,color:'#877A80'}}> NGN {parseFloat(d.tripAmt).toFixed(2)}</Text>
                                </View>
                                
                        </View>
                        */}
          {/* 
                        // <View style={{borderWidth:1,borderColor:'#005091',margin:7,borderBottomLeftRadius:5,borderBottomRightRadius:5,borderTopLeftRadius:5,borderTopRightRadius:5}} key = {d.id} value = {d.id}>
                        // <View style={{backgroundColor:'#005091',padding:7}}>
                        //     <View style = {{flexDirection:"row"}}>
                        //         <View style={{width:'70%'}}>
                        //            <Text style={{color:'#fff'}}>{d.name}</Text>
                        //            <Text style={{color:'#fff',fontSize:12}}>Travel Time: {this.toHHMMSS(d.travelTime)}</Text>
                                   
                        //         </View>
                                
                        //         <View style={{width:'30%'}}>
                        //             <Text style={{alignSelf:'flex-end',color:'#fff',fontSize:12}}>NGN {parseFloat(d.tripAmt).toFixed(2)}</Text>
                        //             <View style={{width:'60%',backgroundColor:'#007cc2',alignSelf:'flex-end',borderRadius:5}}>
                        //                <Text onPress = {()=>this.savedetails(d)} style={{borderRadius:1,color:'#fff',padding:2,alignSelf:'center'}}>ROUTE</Text>
                        //             </View>
                                    
                        //         </View>
                        //     </View>
                        //     <View>
                        //     <Text style={{color:'#fff',fontSize:12}}>Start Time: {d.tripEndTime}</Text>
                        //     </View>
                        // </View>
                        // <View style={{borderBottomColor:'#005091',borderBottomWidth:1,marginBottom:7}}>
                        //     <View style = {{paddingTop:5,paddingBottom:5}}>  
                        //     <Text style={{marginTop:1,color:'#877A80'}}> <Ionicons name='md-pin' size={15} style={{color:'green',marginTop:10}}/> {d.pickUpAddress}</Text>
                            
                        //     </View>
                        // </View>
                        // <View style={{marginBottom:7}}>
                        //     <View style = {{paddingTop:5,paddingBottom:5}}>  
                        //     <Text style={{marginTop:1,color:'#877A80'}}> <Ionicons name='md-pin' size={15} style={{color:'red',marginTop:10}}/> {d.destAddress}</Text>
                            
                        //     </View>
                        // </View>
                    // </View> 
                        // </TouchableOpacity>
                    // )}  */}
        </View>
      </ScrollView>
    </PTRView>
  );
};

export default Trip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: "10%",
  },
  body: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 5,
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
  cardview2: {
    padding: 10,
    position: "absolute",
    bottom: 5,
    zIndex: 6,
    width: "100%",
  },
  cardview: {
    padding: 10,
    position: "absolute",
    top: 10,
    zIndex: 6,
    width: "100%",
  },
  details: {
    padding: 10,
    fontSize: 14,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    fontWeight: "900",
    // fontFamily: "Roboto-Regular"
  },
  time: {
    color: "#877A80",
    fontSize: 13,
  },
});
