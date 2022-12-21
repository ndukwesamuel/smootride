import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import clientimg from "../../assets/images/profile.jpg";
import {View, Text,Dimensions,StatusBar,TouchableHighlight,Alert, ImageBackground,SafeAreaView,ActivityIndicator,StyleSheet,TextInput, TouchableOpacity, ScrollView, Image} from 'react-native';
import CardView from 'react-native-cardview';

const RiderRequest = () => {
  return (
    <View style={styles.container}>
    <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
    <View style={{backgroundColor:"white", borderTopLeftRadius: 15, borderTopRightRadius: 20}}>
        <Text style={{color:'#007cc2', textAlign:"center", fontSize:20, marginTop: 25}}>
            Hi, Reginald Umah - Test
        </Text>
        <TouchableOpacity style={{backgroundColor:'#ededed',padding:1, width:"90%", marginLeft:"5%", borderRadius:7, marginTop: 20}}> 
                                   {/* {
                                       this.state.isrequestingdrivers == true &&
                                       <Text style={styles.driverbtn}>Getting available drivers....</Text>
                                   } */}
                                   {/* {
                                       this.state.isrequestingdrivers == false && */}
                                       <Text style={{marginStart:5,color:'#000',
                                       fontSize:20,alignSelf:'center',
                                        // fontFamily:'Roboto-Regular',1
                                        color:'#c1c1c1'}}>7 driver(s) available</Text>
                                   {/* } */}
                                     </TouchableOpacity>
                                    <View
                                        // key = {driver.id}
                                        // value = {driver.id}
                                        style = {{marginTop: 20,
                                            shadowOffset:{
                                                width: 0,
                                                height: 1
                                            },
                                            shadowOpacity: 0.22,
                                            shadowRadius: 2.22,
                                            shadowColor:"gray",
                                            elevation: 3,
                                            backgroundColor:"white",
                                            borderRadius: 10, width:"90%", marginLeft:"5%"}}>
                                        <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#ededed', flexDirection:"row", alignItems:"center"}}>
                                            <View style= {{width:'15%',marginStart:10}}> 
                                                <Image
                                                source={clientimg}
                                                style={{width:50,height:50,borderRadius:20,alignSelf:'center',margin:5}}
                                                />   
                                            </View>
                                            <View style = {{width:'60%',marginLeft:5}}>
                                                <Text style={{fontSize:17,marginTop:10,color:'#877A80',fontWeight:'400'}}> Babatunde </Text>
                                            </View>
                                            
                                                
                                        </View>

                                        
                                    </View>
                                    <TouchableOpacity  style={{marginTop:7, backgroundColor:'#005091',padding:10,width:'90%',borderRadius:10,alignSelf:'center',marginBottom: 20, marginLeft: "5%"}}>
                                        <Text style={{alignSelf:'center',color:'#fff',fontSize:25}}>REQUEST A RIDE</Text> 
                                            </TouchableOpacity>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
map: {
    flex: 1
},
});


export default RiderRequest