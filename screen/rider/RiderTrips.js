import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Text,Dimensions,StatusBar,TouchableHighlight,Alert, ImageBackground,SafeAreaView,ActivityIndicator,StyleSheet,TextInput, TouchableOpacity, ScrollView} from 'react-native';

const RiderTrips = () => {
  return (<SafeAreaView style={styles.container}>
    <View style={{borderWidth:1,borderColor:'#005091',margin:7,borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
                        <View style={{backgroundColor:'#005091',padding:7}}>
                            <View style = {{flexDirection:"row"}}>
                                <View style={{width:'50%'}}>
                                   <Text style={{color:'#fff',alignSelf:'flex-start',fontSize:12}}> Tunde trial</Text>
                                   <Text style={{color:'#fff',alignSelf:'flex-start',fontSize:12}}> Travel Time: 10:50pm</Text>
                                </View>
                                
                                <View style={{width:'50%'}}>
                                    <Text style={{alignSelf:'flex-end',color:'#fff',fontSize:12}}>NGN 1,356</Text>
                                    <View style={{width:'60%',backgroundColor:'#007cc2',alignSelf:'flex-end',borderRadius:5}}>
                                       <Text 
                                      //  onPress = {()=>this.savedetails(d)} 
                                       style={{borderRadius:2,color:'#fff',padding:2,alignSelf:'center'}}>ROUTE</Text>
                                    </View>
                                    
                                </View>
                            </View>
                        </View>
                        <View style={{borderBottomColor:'#005091',borderBottomWidth:1,marginBottom:7}}>
                            <View style = {styles.info}>  
                            <Text style={{marginTop:1,color:'#877A80'}}> <Ionicons name='md-pin' size={15} style={{color:'green',marginTop:10}}/> ketu</Text>
                            
                            </View>
                        </View>
                        <View style={{marginBottom:7}}>
                            <View style = {styles.info}>  
                            <Text style={{marginTop:1,color:'#877A80'}}> <Ionicons name='md-pin' size={15} style={{color:'red',marginTop:10}}/> ojota</Text>
                            
                            </View>
                        </View>
                    </View>  
                    </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
img:{
    width:'10%'
},
info:{
    width:'100%',
    padding:10
}, 
endarrow:{
    width:'5%'
},
body:{
  flexDirection:'row',
  padding:10,
  paddingBottom:2,
  paddingTop:5
},
header:{
  alignSelf:'center',
  width:'100%',
  padding:14
},
cardview:{
  padding:10,
  marginTop:10,
  position:"absolute",
  top:0,
  backgroundColor:'transparent',
  width:'100%'
},
cardview2:{
  padding:10,
  marginTop:10,
  position:"absolute",
  bottom:5,
  zIndex:6,
  width:'100%'
},
details:{
  padding:10,
  fontSize:14,
  borderBottomColor:'#ccc',
  borderBottomWidth:1,
  fontWeight:'900',
  fontFamily: "Roboto-Regular"
},
time:{
  color:'#877A80',
  fontSize:13
}
});


export default RiderTrips